import {web as builder} from './builder';

export default () => [
  ...builder({name: 'AudioContext', globalConstructor: true}),
  ...builder({
    // swReg.backgroundFetch
    name: 'BackgroundFetchManager',
    methods: [{name: 'fetch'}, {name: 'get'}, {name: 'getIds'}],
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
    // navigator.bluetooth
    name: 'Bluetooth',
    methods: [{name: 'getAvailability'}, {name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    // navigator.clipboard
    name: 'Clipboard',
    methods: [{name: 'read'}, {name: 'readText'}, {name: 'write'}, {name: 'writeText'}],
  }),
  ...builder({
    // navigator.contacts
    name: 'ContactsManager',
    methods: [{name: 'select'}, {name: 'getProperties'}],
  }),
  ...builder({
    name: 'ContentIndex',
    methods: [{name: 'add'}, {name: 'delete'}, {name: 'getAll'}],
  }),
  ...builder({
    // self.cookieStore
    name: 'CookieStore',
    methods: [{name: 'delete'}, {name: 'get'}, {name: 'getAll'}, {name: 'set'}],
  }),
  ...builder({
    // navigator.credentials
    name: 'CredentialsContainer',
    methods: [{name: 'create'}, {name: 'get'}, {name: 'preventSilentAccess'}, {name: 'store'}],
  }),
  ...builder({
    name: 'EventSource',
    globalConstructor: true,
  }),
  ...builder({
    // self.fetch
    name: 'Fetch',
    globalMethods: [{name: 'fetch'}],
  }),
  ...builder({
    name: 'FileReader',
    globalConstructor: true,
    methods: [
      {name: 'abort'},
      {name: 'readAsArrayBuffer'},
      {name: 'readAsBinaryString'},
      {name: 'readAsDataURL'},
      {name: 'readAsText'},
    ],
  }),
  ...builder({
    name: 'FileReaderSync',
    globalConstructor: true,
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
    // navigator.geolocation
    name: 'Geolocation',
    methods: [{name: 'clearWatch'}, {name: 'getCurrentPosition'}, {name: 'watchPosition'}],
  }),
  ...builder({
    // navigator.getBattery()
    name: 'Battery',
    navigatorMethods: [{name: 'getBattery'}],
  }),
  ...builder({
    // navigator.hid
    name: 'HID',
    methods: [{name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    // window.history
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
    // window.indexedDB
    name: 'IDBFactory',
    methods: [{name: 'cmp'}, {name: 'databases'}, {name: 'deleteDatabase'}, {name: 'open'}],
  }),
  ...builder({
    name: 'ImageCapture',
    globalConstructor: true,
    methods: [
      {name: 'getPhotoCapabilities'},
      {name: 'getPhotoSettings'},
      {name: 'grabFrame'},
      {name: 'takePhoto'},
    ],
  }),
  ...builder({
    // navigator.mediaDevices
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
    // navigator.requestMIDIAccess()
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
    // swReg.periodicSync
    name: 'PeriodicSyncManager',
    methods: [{name: 'register'}, {name: 'unregister'}, {name: 'getTags'}],
  }),
  ...builder({
    // navigator.permissions
    name: 'Permissions',
    methods: [{name: 'query'}, {name: 'revoke'}],
  }),
  ...builder({
    name: 'PresentationRequest',
    globalConstructor: true,
    methods: [{name: 'start'}, {name: 'reconnect'}, {name: 'getAvailability'}],
  }),
  ...builder({
    // swReg.pushManager
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
      {name: 'RelativeOrientationSensor'},
    ],
  }),
  ...builder({
    // navigator.share()
    name: 'Share',
    navigatorMethods: [{name: 'share'}, {name: 'canShare'}],
  }),
  ...builder({
    name: 'SpeechRecognition',
    globalConstructors: [{name: 'SpeechRecognition'}, {name: 'webkitSpeechRecognition'}],
    methods: [{name: 'abort'}, {name: 'start'}, {name: 'stop'}],
  }),
  ...builder({
    // self.speechSynthesis
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
    // self.localStorage
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
    documentMethods: [{name: 'requestStorageAccess'}, {name: 'hasStorageAccess'}],
  }),
  ...builder({
    // navigator.storage
    name: 'StorageManager',
    methods: [{name: 'estimate'}, {name: 'persist'}, {name: 'persisted'}],
  }),
  ...builder({
    // self.crypto.subtle
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
    // navigator.usb
    name: 'USB',
    methods: [{name: 'getDevices'}, {name: 'requestDevice'}],
  }),
  ...builder({
    name: 'Vibration',
    navigatorMethods: [{name: 'vibrate'}],
  }),
  ...builder({
    // navigator.wakeLock
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
