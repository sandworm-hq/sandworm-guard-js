<!-- Sandworm Logo -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="logo-light.png">
  <img alt="Sandworm" src="logo-dark.png" width="478">
</picture>

Easy auditing & sandboxing for your JavaScript dependencies 🪱

---

[![NPM][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]
[![CircleCI][ci-image]][ci-url]
[![Maintainability][cc-image]][cc-url]
[![Test Coverage][coverage-image]][coverage-url]

## TL;DR
- Sandworm intercepts all sensitive Node & browser APIs, like `child_process.exec` or `fetch`.
- It also knows what modules are responsible for each call.
- You can use it to:
  - audit your dependencies and see what your code is doing under the hood;
  - secure your app against supply chain attacks by enforcing per-module permissions.
- Install it as an `npm` module in your existing Node or browser app.
- Use the Inspector CLI tool to monitor activity and permissions.
- Works in Node v15+ and [modern browsers](https://browsersl.ist/#q=defaults).
- Beta support for browsers and sourcemaps.

### Getting Started

Add the Sandworm init call as the very first line of your app:

```js
require('sandworm').init({devMode: true}); // add `permissions: [...]` when moving to prod
```

Then launch the inspector tool with `npm run sandworm` or `yarn sandworm` to monitor activity and permissions.

### Documentation

[Read the full docs here](https://docs.sandworm.dev).

### Get Involved
- Have a support question? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/q-a).
- Have a feature request? [Post it here](https://github.com/sandworm-hq/sandworm-js/discussions/categories/ideas).
- Did you find a security issue? [See SECURITY.md](SECURITY.md).
- Did you find a bug? [Post an issue](https://github.com/sandworm-hq/sandworm-js/issues/new/choose).
- Want to write some code? See [CONTRIBUTING.md](CONTRIBUTING.md).

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
