/* eslint-disable no-restricted-globals */

const isWeb = typeof window !== 'undefined' || typeof self !== 'undefined';
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

export const PLATFORMS = {
  NODE: 'NODE',
  WEB: 'WEB',
  UNKNOWN: 'UNKNOWN',
};

export default () => {
  if (isWeb) {
    return PLATFORMS.WEB;
  }
  if (isNode) {
    return PLATFORMS.NODE;
  }

  return PLATFORMS.UNKNOWN;
};
