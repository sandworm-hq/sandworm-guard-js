import {web as builder} from './builder';

export default () => [
  ...builder({name: 'AudioContext', globalConstructor: true}),
  ...builder({
    name: 'BackgroundFetchManager',
    methods: [{name: 'fetch'}, {name: 'get'}, {name: 'getIDs'}],
  }),
  ...builder({
    name: 'BackgroundTasks',
    globalMethods: [{name: 'requestIdleCallback'}, {name: 'cancelIdleCallback'}],
  }),
  ...builder({
    name: 'Beacon',
    navigatorMethods: [{name: 'sendBeacon'}],
  }),
  ...builder({
    name: 'Bluetooth',
    methods: [{name: 'getAvailability'}, {name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    name: 'Clipboard',
    methods: [{name: 'read'}, {name: 'readText'}, {name: 'write'}, {name: 'writeText'}],
  }),
  ...builder({
    name: 'ContactsManager',
    methods: [{name: 'select'}, {name: 'getProperties'}],
  }),
  ...builder({
    name: 'ContentIndex',
    methods: [{name: 'add'}, {name: 'delete'}, {name: 'getAll'}],
  }),
  ...builder({
    name: 'CookieStore',
    methods: [{name: 'delete'}, {name: 'get'}, {name: 'getAll'}, {name: 'set'}],
  }),
  ...builder({
    name: 'CredentialsContainer',
    methods: [{name: 'create'}, {name: 'get'}, {name: 'preventSilentAccess'}, {name: 'store'}],
  }),
  ...builder({
    name: 'EventSource',
    globalConstructor: true,
  }),
  ...builder({
    name: 'Fetch',
    globalMethods: [{name: 'fetch'}],
  }),
  ...builder({
    name: 'FileReader',
    methods: [
      {name: 'delete'},
      {name: 'abort'},
      {name: 'readAsArrayBuffer'},
      {name: 'readAsBinaryString'},
      {name: 'readAsDataURL'},
      {name: 'readAsText'},
    ],
  }),
  ...builder({
    name: 'FileReaderSync',
    methods: [
      {name: 'readAsArrayBuffer'},
      {name: 'readAsBinaryString'},
      {name: 'readAsDataURL'},
      {name: 'readAsText'},
    ],
  }),
  ...builder({
    name: 'FileSystem',
    globalMethods: [
      {name: 'showOpenFilePicker'},
      {name: 'showSaveFilePicker'},
      {name: 'showDirectoryPicker'},
    ],
  }),
  ...builder({
    name: 'Gamepad',
    navigatorMethods: [{name: 'getGamepads'}],
  }),
  ...builder({
    name: 'Geolocation',
    methods: [{name: 'clearWatch'}, {name: 'getCurrentPosition'}, {name: 'watchPosition'}],
  }),
  ...builder({
    name: 'Battery',
    navigatorMethods: [{name: 'getBattery'}],
  }),
  ...builder({
    name: 'HID',
    methods: [{name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    name: 'History',
    methods: [
      {name: 'back'},
      {name: 'forward'},
      {name: 'go'},
      {name: 'pushState'},
      {name: 'replaceState'},
    ],
  }),
  ...builder({
    name: 'IDBFactory',
    methods: [{name: 'cmp'}, {name: 'databases'}, {name: 'deleteDatabase'}, {name: 'open'}],
  }),
  ...builder({
    name: 'ImageCapture',
    methods: [
      {name: 'getPhotoCapabilities'},
      {name: 'getPhotoSettings'},
      {name: 'grabFrame'},
      {name: 'takePhoto'},
    ],
  }),
  ...builder({
    name: 'MediaDevices',
    methods: [
      {name: 'enumerateDevices'},
      {name: 'getDisplayMedia'},
      {name: 'getSupportedConstraints'},
      {name: 'getUserMedia'},
      {name: 'selectAudioOutput'},
    ],
  }),
  ...builder({
    name: 'MediaRecorder',
    globalConstructor: true,
  }),
  ...builder({
    name: 'MediaStream',
    globalConstructor: true,
  }),
  ...builder({
    name: 'MessageChannel',
    globalConstructor: true,
    globalMethods: [{name: 'postMessage'}],
  }),
  ...builder({
    name: 'MIDI',
    navigatorMethods: [{name: 'requestMIDIAccess'}],
  }),
  ...builder({
    name: 'Notification',
    globalConstructor: true,
    methods: [{name: 'requestPermission'}],
    swrMethods: [{name: 'showNotification'}, {name: 'getNotifications'}],
  }),
  ...builder({
    name: 'PaymentRequest',
    globalConstructor: true,
  }),
  ...builder({
    name: 'PerformanceObserver',
    globalConstructor: true,
  }),
  ...builder({
    name: 'PeriodicSyncManager',
    methods: [{name: 'register'}, {name: 'unregister'}, {name: 'getTags'}],
  }),
  ...builder({
    name: 'Permissions',
    methods: [{name: 'query'}, {name: 'revoke'}],
  }),
  ...builder({
    name: 'PresentationRequest',
    methods: [{name: 'start'}, {name: 'reconnect'}, {name: 'getAvailability'}],
  }),
  ...builder({
    name: 'PushManager',
    methods: [
      {name: 'getSubscription'},
      {name: 'hasPermission'},
      {name: 'permissionState'},
      {name: 'register'},
      {name: 'registrations'},
      {name: 'subscribe'},
      {name: 'unregister'},
    ],
  }),
  ...builder({
    name: 'ReportingObserver',
    globalConstructor: true,
  }),
  ...builder({
    name: 'Scheduler',
    methods: [{name: 'postTask'}],
  }),
  ...builder({
    name: 'Selection',
    globalMethods: [{name: 'getSelection'}],
    documentMethods: [{name: 'getSelection'}],
    methods: [
      {name: 'addRange'},
      {name: 'collapse'},
      {name: 'collapseToEnd'},
      {name: 'collapseToStart'},
      {name: 'containsNode'},
      {name: 'deleteFromDocument'},
      {name: 'extend'},
      {name: 'getRangeAt'},
      {name: 'modify'},
      {name: 'removeAllRanges'},
      {name: 'removeRange'},
      {name: 'selectAllChildren'},
      {name: 'setBaseAndExtend'},
      {name: 'toString'},
    ],
  }),
  ...builder({
    name: 'Sensor',
    globalConstructors: [
      {name: 'AbsoluteOrientationSensor'},
      {name: 'Accelerometer'},
      {name: 'AmbientLightSensor'},
      {name: 'GravitySensor'},
      {name: 'Gyroscope'},
      {name: 'LinearAccelerationSensor'},
      {name: 'Magnetometer'},
      {name: 'OrientationSensor'},
      {name: 'RelativeOrientationSensor'},
    ],
  }),
  ...builder({
    name: 'Share',
    navigatorMethods: [{name: 'share'}, {name: 'canShare'}],
  }),
  ...builder({
    name: 'SpeechRecognition',
    globalConstructors: [{name: 'SpeechRecognition'}, {name: 'webkitSpeechRecognition'}],
    methods: [{name: 'abort'}, {name: 'start'}, {name: 'stop'}],
  }),
  ...builder({
    name: 'SpeechSynthesis',
    globalPropertyMethods: [
      {name: 'cancel'},
      {name: 'getVoices'},
      {name: 'pause'},
      {name: 'resume'},
      {name: 'speak'},
    ],
    globalProperty: 'speechSynthesis',
  }),
  ...builder({
    name: 'Storage',
    methods: [
      {name: 'getItem'},
      {name: 'setItem'},
      {name: 'removeItem'},
      {name: 'clear'},
      {name: 'key'},
    ],
  }),
  ...builder({
    name: 'StorageAccess',
    globalMethods: [{name: 'requestStorageAccess'}, {name: 'hasStorageAccess'}],
  }),
  ...builder({
    name: 'StorageManager',
    methods: [{name: 'estimate'}, {name: 'persist'}, {name: 'persisted'}],
  }),
  ...builder({
    name: 'SubtleCrypto',
    methods: [
      {name: 'decrypt'},
      {name: 'deriveBits'},
      {name: 'deriveKey'},
      {name: 'digest'},
      {name: 'encrypt'},
      {name: 'exportKey'},
      {name: 'generateKey'},
      {name: 'importKey'},
      {name: 'sign'},
      {name: 'unwrapKey'},
      {name: 'verify'},
      {name: 'wrapKey'},
    ],
  }),
  ...builder({
    name: 'USB',
    methods: [{name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    name: 'Vibration',
    navigatorMethods: [{name: 'vibrate'}],
  }),
  ...builder({
    name: 'WakeLock',
    methods: [{name: 'request'}],
  }),
  ...builder({
    name: 'WebSocket',
    globalConstructor: true,
    methods: [{name: 'close'}, {name: 'send'}],
  }),
  ...builder({
    name: 'Worker',
    globalConstructor: true,
    methods: [{name: 'postMessage'}, {name: 'terminate'}],
  }),
  ...builder({
    name: 'SharedWorker',
    globalConstructor: true,
    methods: [{name: 'postMessage'}, {name: 'terminate'}],
  }),
  ...builder({
    name: 'XMLHttpRequest',
    globalConstructor: true,
    methods: [
      {name: 'abort'},
      {name: 'getAllResponseHeaders'},
      {name: 'getResponseHeader'},
      {name: 'open'},
      {name: 'overrideMimeType'},
      {name: 'send'},
      {name: 'setRequestHeader'},
    ],
  }),
];
