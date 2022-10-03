<!-- Sandworm Logo -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="logo-light.png">
  <img alt="Sandworm" src="logo-dark.png" width="478">
</picture>

<!-- A spacer -->
<p>&nbsp;</p>

Easy auditing & sandboxing for your JavaScript dependencies 🪱

---

[![NPM][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]
[![CircleCI][ci-image]][ci-url]
[![Maintainability][cc-image]][cc-url]
[![Test Coverage][coverage-image]][coverage-url]

## TL;DR
* Sandworm intercepts all potentially harmful Node & browser APIs, like arbitrary code execution (`child_process.exec`) or network calls (`fetch`). It knows what packages are responsible for each call.
* Simple obfuscation techniques can confuse static analysis tools, but Sandworm's dynamic analysis will always intercept risky calls at run time.
* You can use Sandworm to:
  * [audit your dependencies](https://docs.sandworm.dev/#getting-started), monitor activity and permissions, and see what your code is doing under the hood using the Inspector;
  * [generate a security profile](https://docs.sandworm.dev/test-framework-plugins) automatically from your test suite and do snapshot testing against it;
  * [secure your app against supply chain attacks](https://docs.sandworm.dev/#enforcing-permissions) by enforcing per-module permissions.
* Install it as an `npm` module in your existing Node or browser app.
* Works in Node v15+ and [modern browsers](https://browsersl.ist/#q=defaults). Beta support for browsers and sourcemaps.

### Getting Started

Add the Sandworm init call as the very first line of your app:

```js
require('sandworm').init({devMode: true}); // add `permissions: [...]` to enforce
```

Then launch the inspector tool with `npm run sandworm` or `yarn sandworm` to monitor activity and permissions.

### Documentation

> [Read the full docs here](https://docs.sandworm.dev).

### Get Involved

* Have a support question? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/q-a).
* Have a feature request? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/ideas).
* Did you find a security issue? [See SECURITY.md](contributing/security.md).
* Did you find a bug? [Post an issue](https://github.com/sandworm-hq/sandworm-js/issues/new/choose).
* Want to write some code? See [CONTRIBUTING.md](contributing/).

### Repos

* [The JavaScript Core](https://github.com/sandworm-hq/sandworm-js)
* [Mocha Tests Plugin](https://github.com/sandworm-hq/sandworm-mocha)
* [Jest Tests Plugin](https://github.com/sandworm-hq/sandworm-jest)

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
