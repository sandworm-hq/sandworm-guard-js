# Contributing to Sandworm.JS

## Introduction

First off, thank you for considering contributing to Sandworm.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

Sandworm is an open source project and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into Sandworm itself.

Feel free to ask for help; everyone is a beginner at first! Join our [Discord channel](https://discord.gg/UunGwfxS23) to chat with the core team and other devs (please, don't use the GitHub issue tracker for support questions).

## How to report a bug

If you find a security issue or a vulnerability in Sandworm, please do NOT open an issue. Email [security@sandworm.dev](mailto:security@sandworm.dev) instead.

When filing an issue with our GitHub issue tracker, make sure to answer these five questions:
- What version of Sandworm.JS are you using?
- What Node version or browser version are you using?
- What did you do?
- What did you expect to see?
- What did you see instead?

Please add the `bug` label to all bug-reporting issues.

## How to suggest a feature or enhancement

If you find yourself wishing for a feature that doesn't exist in Sandworm, you are probably not alone! Please open an issue on our issues list on GitHub (and add the `enhancement` label to it) which describes the feature you would like to see, why you need it, and how it should work.

## Ground Rules

Contributor responsibilities:
- Ensure cross-platform compatibility for every change you make (Node 10+ & all recent major browsers).
- Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
- Keep feature versions as small as possible, preferably one new feature per version.
- Be welcoming to newcomers and encourage diverse new contributors from all backgrounds. See the [Sandworm Community Code of Conduct](CODE-OF-CONDUCT.md).

## Contributing

To contribute on an issue:
- Create your own fork of the code.
- Run `yarn build` to build the Sandworm lib. Run `yarn dev` to watch the source files and rebuild automatically.
- Do the changes in your fork.
- See [writing tests](#writing-tests) below.
- Be sure you have followed the code style for the project:
  - We use a slightly modified version of the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for all the core code, and [react-app](https://www.npmjs.com/package/eslint-config-react-app) for the Inspector React app.
  - We use Prettier for formatting (see `.prettierrc`).
  - Everything's enforced via ESLint - run `yarn lint` to lint everything.
- Commits should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Note the [Sandworm Code of Conduct](CODE-OF-CONDUCT.md).
- Send a pull request!
  - Working on your first Pull Request? You can learn how from this free series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).
  - If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

## Project structure

| Directory / File | Description |
|---|---|
| `cli` | The Inspector CLI tool sources |
| `cli/index.js` | The Inspector server |
| `cli/frontend` | The Inspector React app |
| `dist` | Built lib lives here |
| `scripts` | Various utility scripts |
| `src` | Sandworm core code |
| `src/library` | Definitions for all supported methods |
| `tests` | Automated tests |

## Writing tests

Sandworm has several types of test automation you need to consider:

### Node capture & enforce tests

- Located under `tests/node`
- Run with [Jest](https://jestjs.io/)
- Update these if you've added or modified any supported Node functions (under `src/library/node.js`)
- Each supported function should ideally have two associated test files:
  - `function.capture.test.js`, where we test that the function is intercepted by Sandworm, is allowed, and works in dev mode
  - `function.enforce.test.js`, where, with `devMode=false` we test that:
    - a function call throws without the proper permissions
    - a function call is allowed and works with the proper permissions
- These run against the built Sandworm lib, so run `yarn build` or `yarn dev` to automatically rebuild when updating sources
- In the CI, these will execute under multiple Node versions, starting with 10.14
- Run the suites with `yarn test-node-capture`, `yarn test-node-enforce`, or both with `yarn test-node-ce`

### Web capture & enforce tests
- Located under `tests/web`
- Run with [Playwright](https://playwright.dev/)
- Update these if you've added or modified any supported web functions (under `src/library/web.js`)
- Notes above on Node tests also apply here
- Run the suites with `yarn test-web`

### Unit tests
- Located under `tests/unit`
- Run with [Jest](https://jestjs.io/)
- Update these if you've made changes to the Sandworm core (under `src`)
- When fixing a bug, please provide at least one test that would fail without the proposed fix, but passes with it applied
- When adding a feature, please provide at least one test for each significant new functionality introduced
- Run with `yarn test-node-unit`

To run all tests in a single go, use `yarn test-all`.

## Running the inspector
- `cd` to `cli/frontend`, and:
  - `yarn install`
  - `yarn watch` to rebuild the app automatically
- `cd` to `cli` and run `./index.js`
- The server script also serves the built React app. You'll need to manually refresh the browser to get updates whenever you make changes.

## Attribution

This Contributing document is adapted from [the Contributing Guides Template](https://github.com/nayafia/contributing-template/blob/master/CONTRIBUTING-template.md).
