# Changelog

## [2.0.0](https://github.com/sandworm-hq/sandworm-guard-js/compare/guard-v1.3.2...guard-v2.0.0) (2023-02-15)


### ⚠ BREAKING CHANGES

* issue affecting detected caller paths
* anonymous event data collection

### Features

* access denied callback ([45ea81a](https://github.com/sandworm-hq/sandworm-guard-js/commit/45ea81ab652fe2bc28d2905cf575e8e993505bc0))
* add lint to CI pipeline ([4c50ad5](https://github.com/sandworm-hq/sandworm-guard-js/commit/4c50ad5c40550d3305ce3656c7f00b05f5d79756))
* add telemetry notice to inspector log output ([ef24258](https://github.com/sandworm-hq/sandworm-guard-js/commit/ef24258639649aef084db179d140cc228d30ab70))
* alias root-level code by path ([fbf4405](https://github.com/sandworm-hq/sandworm-guard-js/commit/fbf4405004481a9d643fb6d1389493948d421011))
* allow calling init from test plugins ([e4b196b](https://github.com/sandworm-hq/sandworm-guard-js/commit/e4b196b1bea4a43410e1b49f46bb0f344d479422))
* allow cascading calls ([c8a91cf](https://github.com/sandworm-hq/sandworm-guard-js/commit/c8a91cfa1d640a7124a92f7f300bd08e27f4061c))
* allow init call from `sandworm-mocha` module ([a63bcd1](https://github.com/sandworm-hq/sandworm-guard-js/commit/a63bcd1f43078e51ffe76d9d4ae555d13c924237))
* allow verbose logging in prod mode ([9170b3b](https://github.com/sandworm-hq/sandworm-guard-js/commit/9170b3b843f63e05ed192fa4ebb00e7738a39999))
* anonymous event data collection ([4ad3988](https://github.com/sandworm-hq/sandworm-guard-js/commit/4ad3988e64890c87131fdb811e53838e507425d0))
* automate releases ([97a81d9](https://github.com/sandworm-hq/sandworm-guard-js/commit/97a81d9e21f5fbd5a23f3a92d8397c7d47d079b7))
* capture `bind`s, support `minArgsToTrigger` ([29cb0c6](https://github.com/sandworm-hq/sandworm-guard-js/commit/29cb0c6b106b898a012948f0d1a8c7c26595011f))
* remove args from log output ([35d6d3f](https://github.com/sandworm-hq/sandworm-guard-js/commit/35d6d3f7f95627b8b8548a3d4740ea02d638b1e3))
* remove unused library data from build ([b73e398](https://github.com/sandworm-hq/sandworm-guard-js/commit/b73e39814cb39178028c692a1a1a23c5b2548522))
* retry sending events to inspector ([584eb69](https://github.com/sandworm-hq/sandworm-guard-js/commit/584eb697bd113f40bf7433eca1ab21e79083ebe3))
* update package name ([9b5a63b](https://github.com/sandworm-hq/sandworm-guard-js/commit/9b5a63b0b5b80d8485e07cba29a3b25d485a874d))


### Bug Fixes

* allow init from `sandworm-utils` ([5df5065](https://github.com/sandworm-hq/sandworm-guard-js/commit/5df5065cc5466e36d48d57cb6b16dc83e2751197))
* always require perms for high-risk modules ([f9e9b21](https://github.com/sandworm-hq/sandworm-guard-js/commit/f9e9b213be5a92958eb26a2117c2406dfdd1f981))
* cache access performance issue ([16ffc24](https://github.com/sandworm-hq/sandworm-guard-js/commit/16ffc242f5aa860c158ea800eeb6c3cd7da3471a))
* CI config ([1844a54](https://github.com/sandworm-hq/sandworm-guard-js/commit/1844a5433f555721662f62f8f013fdcef6c7ac39))
* CI config ([1f09fc7](https://github.com/sandworm-hq/sandworm-guard-js/commit/1f09fc79c901e3fcadaa10ab72e3d55e90435417))
* ignoring browser extension traffic ([24196bd](https://github.com/sandworm-hq/sandworm-guard-js/commit/24196bd74d6a6b930f164aa2c41eae32751023bb))
* include inspector logo png in npm pack ([e17f479](https://github.com/sandworm-hq/sandworm-guard-js/commit/e17f479a0b796839ca61ed9fdd5588224d4eafee))
* include inspector tool browser app sourcemaps ([88a09ec](https://github.com/sandworm-hq/sandworm-guard-js/commit/88a09ec3fa9b3d959a4185e5d01bb9f248d6e184))
* issue affecting detected caller paths ([d8e6199](https://github.com/sandworm-hq/sandworm-guard-js/commit/d8e61997928e3cd52a6c0207eb8ea73b9e675ebe))
* mark sensitive process/child_process methods ([d15025e](https://github.com/sandworm-hq/sandworm-guard-js/commit/d15025e2b2b348f62e10ccc7b3b2e37d618e670d))
* module names now account for callbacks ([fc02b67](https://github.com/sandworm-hq/sandworm-guard-js/commit/fc02b67dadb7915869de2c9994fbd84689cf0b8e))
* Node pseudo-class support ([8df8668](https://github.com/sandworm-hq/sandworm-guard-js/commit/8df86684e890013db39467fccd4950a3680b89e2))
* stack trace limit ([7cd290e](https://github.com/sandworm-hq/sandworm-guard-js/commit/7cd290e794b7336fd575e156729b1fa800776b04))
* support nested node_modules ([4a4c0e7](https://github.com/sandworm-hq/sandworm-guard-js/commit/4a4c0e7ef6cdf24ed21464a58f7b876133e68110))
* test regression ([3f65bf9](https://github.com/sandworm-hq/sandworm-guard-js/commit/3f65bf9dbf12b1204f0df62247ed31ad48d68683))
* test regression ([dd43af9](https://github.com/sandworm-hq/sandworm-guard-js/commit/dd43af99b37b3233c3afcfe7ad6ad7e514d00b50))
* test regression ([aee7d45](https://github.com/sandworm-hq/sandworm-guard-js/commit/aee7d45ef597c0124559790dd5f2509e40117e4b))
* test regression ([00fa82f](https://github.com/sandworm-hq/sandworm-guard-js/commit/00fa82f4cb5df666d54062e7351b6eec96e33324))
* test regressions ([86782cf](https://github.com/sandworm-hq/sandworm-guard-js/commit/86782cf3afbd977dee64d66650893d9cba819621))
* tracking errors now log at debug level ([98562a3](https://github.com/sandworm-hq/sandworm-guard-js/commit/98562a35c8e0ff69df18fa1503333711fec42d00))
* tracking loop issue on Node ([e41ac24](https://github.com/sandworm-hq/sandworm-guard-js/commit/e41ac2414de643376634836c19f4ba7b4d44a96f))
* url detect performance issue ([ae6b829](https://github.com/sandworm-hq/sandworm-guard-js/commit/ae6b829842b852645e389efac3647763c59fbfd3))

## [1.3.2](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.3.1...sandworm-v1.3.2) (2022-09-29)


### Bug Fixes

* include inspector logo png in npm pack ([e17f479](https://github.com/sandworm-hq/sandworm-js/commit/e17f479a0b796839ca61ed9fdd5588224d4eafee))

## [1.3.1](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.3.0...sandworm-v1.3.1) (2022-09-29)


### Bug Fixes

* allow init from `sandworm-utils` ([5df5065](https://github.com/sandworm-hq/sandworm-js/commit/5df5065cc5466e36d48d57cb6b16dc83e2751197))

## [1.3.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.2.1...sandworm-v1.3.0) (2022-09-28)


### Features

* allow calling init from test plugins ([e4b196b](https://github.com/sandworm-hq/sandworm-js/commit/e4b196b1bea4a43410e1b49f46bb0f344d479422))

## [1.2.1](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.2.0...sandworm-v1.2.1) (2022-09-27)


### Bug Fixes

* support nested node_modules ([4a4c0e7](https://github.com/sandworm-hq/sandworm-js/commit/4a4c0e7ef6cdf24ed21464a58f7b876133e68110))

## [1.2.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.1.1...sandworm-v1.2.0) (2022-09-23)


### Features

* allow init call from `sandworm-mocha` module ([a63bcd1](https://github.com/sandworm-hq/sandworm-js/commit/a63bcd1f43078e51ffe76d9d4ae555d13c924237))
* retry sending events to inspector ([584eb69](https://github.com/sandworm-hq/sandworm-js/commit/584eb697bd113f40bf7433eca1ab21e79083ebe3))

## [1.1.1](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.1.0...sandworm-v1.1.1) (2022-09-21)


### Bug Fixes

* tracking errors now log at debug level ([98562a3](https://github.com/sandworm-hq/sandworm-js/commit/98562a35c8e0ff69df18fa1503333711fec42d00))

## [1.1.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.0.1...sandworm-v1.1.0) (2022-09-21)


### Features

* add telemetry notice to inspector log output ([ef24258](https://github.com/sandworm-hq/sandworm-js/commit/ef24258639649aef084db179d140cc228d30ab70))
* alias root-level code by path ([fbf4405](https://github.com/sandworm-hq/sandworm-js/commit/fbf4405004481a9d643fb6d1389493948d421011))

## [1.0.1](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v1.0.0...sandworm-v1.0.1) (2022-09-17)


### Bug Fixes

* include inspector tool browser app sourcemaps ([88a09ec](https://github.com/sandworm-hq/sandworm-js/commit/88a09ec3fa9b3d959a4185e5d01bb9f248d6e184))
* module names now account for callbacks ([fc02b67](https://github.com/sandworm-hq/sandworm-js/commit/fc02b67dadb7915869de2c9994fbd84689cf0b8e))

## [1.0.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v0.2.0...sandworm-v1.0.0) (2022-09-15)


### ⚠ BREAKING CHANGES

* issue affecting detected caller paths
* anonymous event data collection

### Features

* access denied callback ([45ea81a](https://github.com/sandworm-hq/sandworm-js/commit/45ea81ab652fe2bc28d2905cf575e8e993505bc0))
* anonymous event data collection ([4ad3988](https://github.com/sandworm-hq/sandworm-js/commit/4ad3988e64890c87131fdb811e53838e507425d0))


### Bug Fixes

* cache access performance issue ([16ffc24](https://github.com/sandworm-hq/sandworm-js/commit/16ffc242f5aa860c158ea800eeb6c3cd7da3471a))
* issue affecting detected caller paths ([d8e6199](https://github.com/sandworm-hq/sandworm-js/commit/d8e61997928e3cd52a6c0207eb8ea73b9e675ebe))
* url detect performance issue ([ae6b829](https://github.com/sandworm-hq/sandworm-js/commit/ae6b829842b852645e389efac3647763c59fbfd3))

## [0.2.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v0.1.0...sandworm-v0.2.0) (2022-09-07)


### Features

* allow verbose logging in prod mode ([9170b3b](https://github.com/sandworm-hq/sandworm-js/commit/9170b3b843f63e05ed192fa4ebb00e7738a39999))
* remove unused library data from build ([b73e398](https://github.com/sandworm-hq/sandworm-js/commit/b73e39814cb39178028c692a1a1a23c5b2548522))


### Bug Fixes

* always require perms for high-risk modules ([f9e9b21](https://github.com/sandworm-hq/sandworm-js/commit/f9e9b213be5a92958eb26a2117c2406dfdd1f981))
* ignoring browser extension traffic ([24196bd](https://github.com/sandworm-hq/sandworm-js/commit/24196bd74d6a6b930f164aa2c41eae32751023bb))
* mark sensitive process/child_process methods ([d15025e](https://github.com/sandworm-hq/sandworm-js/commit/d15025e2b2b348f62e10ccc7b3b2e37d618e670d))

## [0.1.0](https://github.com/sandworm-hq/sandworm-js/compare/sandworm-v0.0.1...sandworm-v0.1.0) (2022-09-02)


### Features

* add lint to CI pipeline ([4c50ad5](https://github.com/sandworm-hq/sandworm-js/commit/4c50ad5c40550d3305ce3656c7f00b05f5d79756))
* allow cascading calls ([c8a91cf](https://github.com/sandworm-hq/sandworm-js/commit/c8a91cfa1d640a7124a92f7f300bd08e27f4061c))
* automate releases ([97a81d9](https://github.com/sandworm-hq/sandworm-js/commit/97a81d9e21f5fbd5a23f3a92d8397c7d47d079b7))
* capture `bind`s, support `minArgsToTrigger` ([29cb0c6](https://github.com/sandworm-hq/sandworm-js/commit/29cb0c6b106b898a012948f0d1a8c7c26595011f))
* remove args from log output ([35d6d3f](https://github.com/sandworm-hq/sandworm-js/commit/35d6d3f7f95627b8b8548a3d4740ea02d638b1e3))


### Bug Fixes

* CI config ([1844a54](https://github.com/sandworm-hq/sandworm-js/commit/1844a5433f555721662f62f8f013fdcef6c7ac39))
* CI config ([1f09fc7](https://github.com/sandworm-hq/sandworm-js/commit/1f09fc79c901e3fcadaa10ab72e3d55e90435417))
* Node pseudo-class support ([8df8668](https://github.com/sandworm-hq/sandworm-js/commit/8df86684e890013db39467fccd4950a3680b89e2))
* stack trace limit ([7cd290e](https://github.com/sandworm-hq/sandworm-js/commit/7cd290e794b7336fd575e156729b1fa800776b04))
* test regression ([3f65bf9](https://github.com/sandworm-hq/sandworm-js/commit/3f65bf9dbf12b1204f0df62247ed31ad48d68683))
* test regression ([dd43af9](https://github.com/sandworm-hq/sandworm-js/commit/dd43af99b37b3233c3afcfe7ad6ad7e514d00b50))
* test regression ([aee7d45](https://github.com/sandworm-hq/sandworm-js/commit/aee7d45ef597c0124559790dd5f2509e40117e4b))
* test regression ([00fa82f](https://github.com/sandworm-hq/sandworm-js/commit/00fa82f4cb5df666d54062e7351b6eec96e33324))
* test regressions ([86782cf](https://github.com/sandworm-hq/sandworm-js/commit/86782cf3afbd977dee64d66650893d9cba819621))
* tracking loop issue on Node ([e41ac24](https://github.com/sandworm-hq/sandworm-js/commit/e41ac2414de643376634836c19f4ba7b4d44a96f))
