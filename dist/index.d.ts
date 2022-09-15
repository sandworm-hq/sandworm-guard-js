declare namespace _default {
  export {init};
  export {getHistory};
  export {clearHistory};
  export {SandwormError as Error};
}
export default _default;

/** Initialize Sandworm. */
declare function init({
  loadSourceMaps,
  devMode: devModeOption,
  verbose,
  skipTracking: skipTrackingOption,
  trackingIP,
  trackingPort,
  ignoreExtensions: ignoreExtensionsOption,
  trustedModules: additionalTrustedModules,
  permissions: permissionsOption,
}?: {
  /**
   * Set this to true to automatically load the sourcemap declared in the caller js file.
   * Alternatively, to load multiple sources and sourcemaps, set this to an object that has original
   * source file paths/urls as keys, and sourcemap file paths/urls as values.
   * Defaults to `true` in browsers, and `false` on Node.
   */
  loadSourceMaps?: boolean;
  /** In dev mode, all calls are captured, allowed, and tracked to the inspector.
   * When dev mode is false, user-provided permissions are enforced and calls are not tracked.
   * Defaults to `false`.
   */
  devMode?: boolean = false;
  /** The default logger level is `warn`; setting this to `true` lowers the level to `debug`. Defaults to `false`. */
  verbose?: boolean = false;
  /** Set this to true to stop event tracking to the inspector in dev mode. Defaults to `false`. */
  skipTracking?: boolean = false;
  /**  The IP address for the inspector. */
  trackingIP?: any;
  /** The port number for the inspector. */
  trackingPort?: any;
  /** Ignore activity from browser extensions. Defaults to `true`. */
  ignoreExtensions?: boolean = true;
  /** Utility or platform modules, that should be removed from a caller path. */
  trustedModules?: any[] = [];
  /** Module permissions to enforce if dev mode is false. */
  permissions?: Permission[] = [];
}): Promise<void>;
/** Specifies a set of permissions to grant a module or a class of modules. */
declare interface Permission {
  /** The string module name to grant permissions to, or a RegExp to match multiple module names. */
  module: string | RegExp;
  /** An array of string permissions to grant the specified module(s), formatted as `family.method`. */
  permissions: string[];
}
/** In dev mode, returns the current call history. In production mode, returns an empty array. */
declare function getHistory(): any[];
/** In dev mode, clears the current call history. In production mode, does nothing. */
declare function clearHistory(): void;

declare class SandwormError extends Error {
  constructor(message: any);
}
