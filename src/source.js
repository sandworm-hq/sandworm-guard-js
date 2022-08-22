import {SourceMapConsumer} from 'source-map-js';

let fs;
try {
  fs = __non_webpack_require__('fs');
  // eslint-disable-next-line no-empty
} catch (error) {}

const INLINE_SOURCEMAP_REGEX = /^data:application\/json[^,]+base64,/;
const SOURCEMAP_REGEX =
  /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/;
const logger = console;

export const getSourceFromUrl = async (url) => {
  try {
    const response = await fetch(url);

    return response.text();
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getSourceFromPath = async (path) => {
  if (!fs) {
    return null;
  }

  return new Promise((resolve) => {
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        logger.error(err);
        resolve(null);
      }

      resolve(data);
    });
  });
};

export const getSource = (location) => {
  try {
    const url = new URL(location);
    return getSourceFromUrl(url);
  } catch (error) {
    return getSourceFromPath(location);
  }
};

export const getSourceMapFromSource = async (location) => {
  try {
    logger.debug(`loading source from ${location}`);
    const source = await getSource(location);

    const sourceMapReferenceSearch = source?.match?.(SOURCEMAP_REGEX);

    if (sourceMapReferenceSearch?.[1]) {
      logger.debug('found sourcemap reference');
      const sourceMapReference = sourceMapReferenceSearch[1];
      let sourceMap;

      if (INLINE_SOURCEMAP_REGEX.test(sourceMapReference)) {
        logger.debug('loading inline sourcemap');
        const rawData = sourceMapReference.slice(sourceMapReference.indexOf(',') + 1);
        if (typeof atob === 'function') {
          sourceMap = atob(rawData);
        } else {
          sourceMap = Buffer.from(rawData, 'base64').toString();
        }
      } else {
        const sourceLocationParts = location.split('/');
        sourceLocationParts.splice(-1, 1);
        const sourceMapLocation = [...sourceLocationParts, sourceMapReference].join('/');
        logger.debug(`loading sourcemap from ${sourceMapLocation}`);
        sourceMap = await getSource(sourceMapLocation);
      }

      if (sourceMap) {
        const sourceMapConsumer = await new SourceMapConsumer(sourceMap);

        logger.debug('loaded sourcemap');
        return sourceMapConsumer;
      }
    }

    logger.debug('sourcemap not available');
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getSourceMap = async (location) => {
  try {
    logger.debug(`loading sourcemap from ${location}`);
    const sourceMap = await getSource(location);

    if (sourceMap) {
      const sourceMapConsumer = await new SourceMapConsumer(sourceMap);
      return sourceMapConsumer;
    }

    logger.debug('sourcemap not available');
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
