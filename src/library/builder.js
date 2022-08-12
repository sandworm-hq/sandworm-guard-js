// eslint-disable-next-line no-restricted-globals
const safeGlobal = typeof self !== 'undefined' ? self : {};
const safeNavigator = typeof navigator !== 'undefined' ? navigator : {};
const safeDocument = typeof document !== 'undefined' ? document : {};

export const web = ({
  name,
  globalConstructor,
  constructorDescription,
  constructorUrl,
  globalConstructors,
  methods,
  className,
  globalMethods,
  globalProperty,
  globalPropertyMethods,
  navigatorMethods,
  documentMethods,
  swrMethods,
}) =>
  [
    methods && {
      name,
      methods,
      originalRoot: () => safeGlobal[className || name].prototype,
      available: typeof safeGlobal[className || name] !== 'undefined',
    },
    globalMethods?.length && {
      name,
      methods: globalMethods,
      originalRoot: () => safeGlobal,
      available: typeof safeGlobal[globalMethods[0].name] !== 'undefined',
    },
    globalPropertyMethods?.length && {
      name,
      methods: globalPropertyMethods,
      originalRoot: () => safeGlobal[globalProperty || className || name],
      available: typeof safeGlobal[globalProperty || className || name] !== 'undefined',
    },
    navigatorMethods?.length && {
      name,
      methods: navigatorMethods,
      originalRoot: () => safeNavigator,
      available: typeof safeNavigator[navigatorMethods[0].name] !== 'undefined',
    },
    documentMethods?.length && {
      name,
      methods: documentMethods,
      originalRoot: () => safeDocument,
      available: typeof safeDocument[documentMethods[0].name] !== 'undefined',
    },
    swrMethods?.length && {
      name,
      methods: swrMethods,
      originalRoot: () => ServiceWorkerRegistration.prototype,
      available: typeof ServiceWorkerRegistration !== 'undefined',
    },
    ...(globalConstructor
      ? [{name: className || name, description: constructorDescription, url: constructorUrl}]
      : globalConstructors || []
    ).map((constructor) => ({
      name,
      methods: [
        {
          ...constructor,
          isConstructor: true,
        },
      ],
      originalRoot: () => safeGlobal,
      available: typeof safeGlobal[constructor.name] !== 'undefined',
    })),
  ].filter((a) => !!a);

export const node = ({name, methods, globalMethod}) => {
  let module;
  if (!globalMethod) {
    try {
      // eslint-disable-next-line no-undef
      module = __non_webpack_require__(name);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return {
    name,
    methods,
    originalRoot: () => (globalMethod ? global : module),
    available: globalMethod
      ? typeof global !== 'undefined' && typeof global[methods[0]] !== 'undefined'
      : typeof module !== 'undefined',
  };
};
