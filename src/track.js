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
let skipTracking = false;

export const setSkipTracking = (skipTrackingOption) => {
  skipTracking = !!skipTrackingOption;
};

// Grab the original methods before we monkey patch them
// so that tracking calls do not get tracked causing an infinite loop
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

// Remove circular references from method invoke arguments getting
// converted to JSON to be tracked
export const getCircularReplacer = () => {
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

export const sendBatch = () => {
  try {
    if (skipTracking || batch.length === 0) {
      return;
    }
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
      req.on('error', (error) => logger.debug('error tracking call to inspector:', error.message));
      req.end(JSON.stringify(batch, getCircularReplacer()));
      batch = [];
    } else if (hasXMLHTTPRequest) {
      const request = new originals.xmlhttprequest.XMLHttpRequest();
      originals.xmlhttprequest.open.call(request, 'POST', `http://${host}:${port}/ingest`, true);
      originals.xmlhttprequest.setRequestHeader.call(
        request,
        'content-type',
        'application/json;charset=UTF-8',
      );
      originals.xmlhttprequest.send.call(request, JSON.stringify(batch, getCircularReplacer()));
      batch = [];
    }
  } catch (error) {
    logger.debug('error tracking call to inspector:', error.message);
    logger.debug('attempted to track:', batch);
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

  // Add to queue and debounce sending to server
  batch.push({...event});

  if (!currentTimer) {
    currentTimer = setTimeout(sendBatch, 1000);
  }
};
