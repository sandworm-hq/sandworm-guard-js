import logger from './logger';
import platform, {PLATFORMS} from './platform';

let http;
try {
  http = __non_webpack_require__('http');
  // eslint-disable-next-line no-empty
} catch (error) {}
const hasXMLHTTPRequest = typeof XMLHttpRequest !== 'undefined';

if (!http && !hasXMLHTTPRequest) {
  logger.error('tracking disabled for this platform: no HTTP or XMLHttpRequest available');
}

const originals = {};
let batch = [];
let host = '127.0.0.1';
let port = 7071;
let currentTimer;

// Grab the original methods before we monkey patch them
if (http) {
  originals.http = {
    request: http.request,
  };
}
if (hasXMLHTTPRequest) {
  originals.xmlhttprequest = {
    XMLHttpRequest,
    open: XMLHttpRequest.prototype.open,
    send: XMLHttpRequest.prototype.send,
    setRequestHeader: XMLHttpRequest.prototype.setRequestHeader,
  };
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return undefined;
      }
      seen.add(value);
    }
    return value;
  };
};

const sendBatch = () => {
  try {
    logger.debug('sending tracking...');
    if (platform() === PLATFORMS.NODE && http) {
      const req = originals.http.request(
        {
          port,
          host,
          path: '/ingest',
          method: 'POST',
          headers: {'content-type': 'application/json'},
        },
        () => {},
      );
      req.on('error', (error) => logger.error('error tracking call to inspector:', error.message));
      if (batch.length) {
        req.end(JSON.stringify(batch, getCircularReplacer()));
      }
      batch = [];
    } else if (hasXMLHTTPRequest) {
      const request = new originals.xmlhttprequest.XMLHttpRequest();
      originals.xmlhttprequest.open.call(request, 'POST', `http://${host}:${port}/ingest`, true);
      originals.xmlhttprequest.setRequestHeader.call(
        request,
        'content-type',
        'application/json;charset=UTF-8',
      );
      if (batch.length) {
        originals.xmlhttprequest.send.call(request, JSON.stringify(batch, getCircularReplacer()));
      }
      batch = [];
    }
  } catch (error) {
    logger.error('error tracking call to inspector:', error.message);
    logger.error('attempted to track:', batch);
  } finally {
    currentTimer = null;
  }
};

export const setTrackingServer = (hostOption, portOption) => {
  if (hostOption && typeof hostOption === 'string') {
    host = hostOption;
  }
  if (portOption && typeof portOption === 'number') {
    port = portOption;
  }
};

export default (event) => {
  if (!event || typeof event !== 'object') {
    logger.warn('track: event is not an object');
    return;
  }

  batch.push({...event});

  if (!currentTimer) {
    currentTimer = setTimeout(sendBatch, 1000);
  }
};
