// eslint-disable-next-line no-restricted-globals
const isWeb = typeof window !== 'undefined' || typeof self !== 'undefined';
const isNode =
  typeof process === 'object' && typeof process.versions === 'object' && !!process.versions.node;

export const PLATFORMS = {
  NODE: 'NODE',
  WEB: 'WEB',
  UNKNOWN: 'UNKNOWN',
};

export default () => {
  try {
    if (isWeb) {
      return PLATFORMS.WEB;
    }
    if (isNode) {
      return PLATFORMS.NODE;
    }

    return PLATFORMS.UNKNOWN;
  } catch (error) {
    return PLATFORMS.UNKNOWN;
  }
};
