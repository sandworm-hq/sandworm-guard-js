const {web: builder} = require('./builder');

const library = () =>
  [
    {
      name: 'AudioContext',
      globalConstructor: true,
      constructorDescription: 'Enable execution of audio processing or decoding.',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext',
    },
    {
      // swReg.backgroundFetch
      name: 'BackgroundFetchManager',
      methods: [
        {
          name: 'fetch',
          description: 'Register URLs for background fetch',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/fetch',
        },
        {
          name: 'get',
          description: 'Get info on background fetch job',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/get',
        },
        {
          name: 'getIds',
          description: 'Return the IDs of all registered background fetches',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/getIds',
        },
      ],
    },
    {
      name: 'BackgroundTasks',
      globalMethods: [
        {
          name: 'requestIdleCallback',
          description: 'Queue task to be executed in the background',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback',
        },
        {
          name: 'cancelIdleCallback',
          description: 'Cancel a previously queued background task',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback',
        },
      ],
    },
    {
      name: 'Beacon',
      navigatorMethods: [
        {
          name: 'sendBeacon',
          description: 'Send an asynchronous request that does not expect a response',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon',
        },
      ],
    },
    {
      // navigator.bluetooth
      name: 'Bluetooth',
      methods: [
        {
          name: 'getAvailability',
          description: 'Is the browser able to use Bluetooth',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/getAvailability',
        },
        {
          name: 'getDevices',
          description: 'Get a list of available Bluetooth devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/getDevices',
        },
        {
          name: 'requestDevice',
          description: 'Request a Bluetooth device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice',
        },
      ],
    },
    {
      // navigator.clipboard
      name: 'Clipboard',
      methods: [
        {
          name: 'read',
          description: 'Request arbitrary data from the clipboard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read',
        },
        {
          name: 'readText',
          description: 'Request text from the clipboard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText',
        },
        {
          name: 'write',
          description: 'Write arbitrary data to the clipboard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write',
        },
        {
          name: 'writeText',
          description: 'Write text to the clipboard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText',
        },
      ],
    },
    {
      // navigator.contacts
      name: 'ContactsManager',
      methods: [
        {
          name: 'select',
          description: 'Retrieve contact information from user device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager/select',
        },
        {
          name: 'getProperties',
          description: 'List all available contact properties',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager/getProperties',
        },
      ],
    },
    {
      name: 'ContentIndex',
      methods: [
        {
          name: 'add',
          description: 'Register offline enabled content with the browser',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/add',
        },
        {
          name: 'delete',
          description: 'Delete an offline enabled content',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/delete',
        },
        {
          name: 'getAll',
          description: 'Get all offline enabled content',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/getAll',
        },
      ],
    },
    {
      // self.cookieStore
      name: 'CookieStore',
      methods: [
        {
          name: 'delete',
          description: 'Delete a cookie',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/delete',
        },
        {
          name: 'get',
          description: 'Get a cookie',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/get',
        },
        {
          name: 'getAll',
          description: 'Get all cookies',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/getAll',
        },
        {
          name: 'set',
          description: 'Set a cookie',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/set',
        },
      ],
    },
    {
      // navigator.credentials
      name: 'CredentialsContainer',
      methods: [
        {
          name: 'create',
          description: 'Create a new Credential instance',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create',
        },
        {
          name: 'get',
          description: 'Retrieve saved authentication credentials',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get',
        },
        {
          name: 'preventSilentAccess',
          description: 'Set if automatic log in is allowed',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/preventSilentAccess',
        },
        {
          name: 'store',
          description: 'Store user authentication credentials',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store',
        },
      ],
    },
    {
      name: 'EventSource',
      globalConstructor: true,
      constructorDescription: 'Recieve events from a server, via a persistent connection',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EventSource',
    },
    {
      // self.fetch
      name: 'Fetch',
      globalMethods: [
        {
          name: 'fetch',
          description: 'Communicate with a web server',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/fetch',
        },
      ],
    },
    {
      name: 'FileReader',
      globalConstructor: true,
      constructorDescription: 'Read the contents of a user file',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader',
      methods: [
        {
          name: 'abort',
          description: 'Abort reading file',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/abort',
        },
        {
          name: 'readAsArrayBuffer',
          description: 'Read file as ArrayBuffer',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer',
        },
        {
          name: 'readAsBinaryString',
          description: 'Read file as binary string',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString',
        },
        {
          name: 'readAsDataURL',
          description: 'Read file as data URL',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL',
        },
        {
          name: 'readAsText',
          description: 'Read file as text',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText',
        },
      ],
    },
    {
      name: 'FileReaderSync',
      globalConstructor: true,
      constructorDescription: 'Read the contents of a user file',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync',
      methods: [
        {
          name: 'readAsArrayBuffer',
          description: 'Read file as ArrayBuffer',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsArrayBuffer',
        },
        {
          name: 'readAsBinaryString',
          description: 'Read file as binary string',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsBinaryString',
        },
        {
          name: 'readAsDataURL',
          description: 'Read file as data URL',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsDataURL',
        },
        {
          name: 'readAsText',
          description: 'Read file as text',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsText',
        },
      ],
    },
    {
      name: 'FileSystem',
      globalMethods: [
        {
          name: 'showOpenFilePicker',
          description: 'Prompt user to allow reading a file from his system',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker',
        },
        {
          name: 'showSaveFilePicker',
          description: 'Prompt user to allow saving a file to his system',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker',
        },
        {
          name: 'showDirectoryPicker',
          description: 'Prompt user to allow reading a directory from his system',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/showDirectoryPicker',
        },
      ],
    },
    {
      name: 'Gamepad',
      navigatorMethods: [
        {
          name: 'getGamepads',
          description: 'Get a list of connected gamepads',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads',
        },
      ],
    },
    {
      // navigator.geolocation
      name: 'Geolocation',
      methods: [
        {
          name: 'clearWatch',
          description: 'Stop tracking user location',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch',
        },
        {
          name: 'getCurrentPosition',
          description: 'Get user location',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition',
        },
        {
          name: 'watchPosition',
          description: 'Track user location',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition',
        },
      ],
    },
    {
      // navigator.getBattery()
      name: 'Battery',
      navigatorMethods: [
        {
          name: 'getBattery',
          description: 'Get device battery information',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery',
        },
      ],
    },
    {
      // navigator.hid
      name: 'HID',
      methods: [
        {
          name: 'getDevices',
          description: 'List connected Human Interface Devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/HID/getDevices',
        },
        {
          name: 'requestDevice',
          description: 'Connect to a Human Interface Device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/HID/requestDevice',
        },
      ],
    },
    {
      // window.history
      name: 'History',
      methods: [
        {
          name: 'back',
          description: 'Go back in navigation history',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/back',
        },
        {
          name: 'forward',
          description: 'Go forward in navigation history',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/forward',
        },
        {
          name: 'go',
          description: 'Go to a specific point in the navigation history',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/go',
        },
        {
          name: 'pushState',
          description: 'Add a new entry to the history stack',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/pushState',
        },
        {
          name: 'replaceState',
          description: 'Replace the current entry in the history stack',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState',
        },
      ],
    },
    {
      // window.indexedDB
      name: 'IDBFactory',
      methods: [
        {
          name: 'cmp',
          description: 'Compare two database keys',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/cmp',
        },
        {
          name: 'databases',
          description: 'List all available databases',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/databases',
        },
        {
          name: 'deleteDatabase',
          description: 'Delete a database',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/deleteDatabase',
        },
        {
          name: 'open',
          description: 'Open a database',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open',
        },
      ],
    },
    {
      name: 'ImageCapture',
      globalConstructor: true,
      constructorDescription: 'Enable the capture of images or photos from a camera',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture',
      methods: [
        {
          name: 'getPhotoCapabilities',
          description: 'Get the capabilities of the camera',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/getPhotoCapabilities',
        },
        {
          name: 'getPhotoSettings',
          description: 'Get the settings of the camera',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/getPhotoSettings',
        },
        {
          name: 'grabFrame',
          description: 'Take a snapshot of the live video stream',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/grabFrame',
        },
        {
          name: 'takePhoto',
          description: 'Take a single exposure using the video capture device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/takePhoto',
        },
      ],
    },
    {
      // navigator.mediaDevices
      name: 'MediaDevices',
      methods: [
        {
          name: 'enumerateDevices',
          description: 'List all connected media devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices',
        },
        {
          name: 'getDisplayMedia',
          description: 'Capture the contents of a display or portion thereof',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia',
        },
        {
          name: 'getSupportedConstraints',
          description: 'Get the supported media device constraints',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getSupportedConstraints',
        },
        {
          name: 'getUserMedia',
          description: 'Request access to user media devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia',
        },
        {
          name: 'selectAudioOutput',
          description: 'Select an audio output device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/selectAudioOutput',
        },
      ],
    },
    {
      name: 'MediaRecorder',
      globalConstructor: true,
      constructorDescription: 'Record audio and video',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder',
    },
    {
      name: 'MediaStream',
      globalConstructor: true,
      constructorDescription: 'A stream of media content',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream',
    },
    {
      name: 'MessageChannel',
      globalConstructor: true,
      constructorDescription: 'A channel for passing messages between threads',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/MessageChannel',
      globalMethods: [
        {
          name: 'postMessage',
          description: 'Send cross-origin communication between windows',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage',
        },
      ],
    },
    {
      // navigator.requestMIDIAccess()
      name: 'MIDI',
      navigatorMethods: [
        {
          name: 'requestMIDIAccess',
          description: 'Request access to connected MIDI devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMIDIAccess',
        },
      ],
    },
    {
      name: 'Notification',
      globalConstructor: true,
      constructorDescription: 'Create a user notification',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification',
      methods: [
        {
          name: 'requestPermission',
          description: 'Request permission to show notifications',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission',
        },
      ],
      swrMethods: [
        {
          name: 'showNotification',
          description: 'Show a browser notification',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification',
        },
        {
          name: 'getNotifications',
          description: 'List received notifications',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications',
        },
      ],
    },
    {
      name: 'PaymentRequest',
      globalConstructor: true,
      constructorDescription: 'Create a payment request',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/PaymentRequest',
    },
    {
      name: 'PerformanceObserver',
      globalConstructor: true,
      constructorDescription: 'Monitor the performance of the page',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver',
    },
    {
      // swReg.periodicSync
      name: 'PeriodicSyncManager',
      methods: [
        {
          name: 'register',
          description: 'Registers a periodic background sync request',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/register',
        },
        {
          name: 'unregister',
          description: 'Unregisters a periodic background sync request',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/unregister',
        },
        {
          name: 'getTags',
          description: 'List registered periodic sync requests',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/getTags',
        },
      ],
    },
    {
      // navigator.permissions
      name: 'Permissions',
      methods: [
        {
          name: 'query',
          description: 'Get user permission status for a given API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query',
        },
        {
          name: 'revoke',
          description: 'Revoke a user permission for a given API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Permissions/revoke',
        },
      ],
    },
    {
      name: 'PresentationRequest',
      globalConstructor: true,
      constructorDescription: 'Create a presentation request',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/PresentationRequest',
      methods: [
        {
          name: 'start',
          description: 'Start a presentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/start',
        },
        {
          name: 'reconnect',
          description: 'Reconnect to a presentation',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/reconnect',
        },
        {
          name: 'getAvailability',
          description: 'Get availability for starting presentations',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/getAvailability',
        },
      ],
    },
    {
      // swReg.pushManager
      name: 'PushManager',
      methods: [
        {
          name: 'getSubscription',
          description: 'Get the current push subscription',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/getSubscription',
        },
        {
          name: 'hasPermission',
          description: 'Get push subscription permission state',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/hasPermission',
        },
        {
          name: 'permissionState',
          description: 'Get push subscription permission state',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/permissionState',
        },
        {
          name: 'register',
          description: 'Register a push subscription',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/register',
        },
        {
          name: 'registrations',
          description: 'List of registered push subscriptions',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/registrations',
        },
        {
          name: 'subscribe',
          description: 'Subscribe to a push subscription',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe',
        },
        {
          name: 'unregister',
          description: 'Unregister a push subscription',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/PushManager/unregister',
        },
      ],
    },
    {
      name: 'ReportingObserver',
      globalConstructor: true,
      constructorDescription: 'Collect and access reports on various issues',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/ReportingObserver/ReportingObserver',
    },
    {
      name: 'Scheduler',
      methods: [
        {
          name: 'postTask',
          description: 'Create a new scheduled task',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask',
        },
      ],
    },
    {
      name: 'Selection',
      globalMethods: [
        {
          name: 'getSelection',
          description: 'Get the current webpage selection',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection',
        },
      ],
      documentMethods: [
        {
          name: 'getSelection',
          description: 'Get the current webpage selection',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/getSelection',
        },
      ],
    },
    {
      name: 'Sensor',
      globalConstructors: [
        {
          name: 'AbsoluteOrientationSensor',
          description: 'Absolute orientation sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor',
        },
        {
          name: 'Accelerometer',
          description: 'Accelerometer sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Accelerometer',
        },
        {
          name: 'AmbientLightSensor',
          description: 'Ambient light sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor',
        },
        {
          name: 'GravitySensor',
          description: 'Gravity sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/GravitySensor',
        },
        {
          name: 'Gyroscope',
          description: 'Gyroscope sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope',
        },
        {
          name: 'LinearAccelerationSensor',
          description: 'Linear acceleration sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/LinearAccelerationSensor',
        },
        {
          name: 'Magnetometer',
          description: 'Magnetometer sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Magnetometer',
        },
        {
          name: 'RelativeOrientationSensor',
          description: 'Relative orientation sensor',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/RelativeOrientationSensor',
        },
      ],
    },
    {
      // navigator.share()
      name: 'Share',
      navigatorMethods: [
        {
          name: 'share',
          description: 'Share content to user-selected targets',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share',
        },
        {
          name: 'canShare',
          description: 'Check if sharing is supported',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare',
        },
      ],
    },
    {
      name: 'SpeechRecognition',
      globalConstructors: [
        {
          name: 'SpeechRecognition',
          description: 'Use the speech recognition API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition',
        },
        {
          name: 'webkitSpeechRecognition',
          description: 'Use the speech recognition API',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/webkitSpeechRecognition',
        },
      ],
      methods: [
        {
          name: 'abort',
          description: 'Abort a speech recognition process',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/abort',
        },
        {
          name: 'start',
          description: 'Start a speech recognition process',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start',
        },
        {
          name: 'stop',
          description: 'Stop a speech recognition process',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/stop',
        },
      ],
    },
    {
      // self.speechSynthesis
      name: 'SpeechSynthesis',
      globalPropertyMethods: [
        {
          name: 'cancel',
          description: 'Cancel speech synthesis',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel',
        },
        {
          name: 'getVoices',
          description: 'Get the list of available voices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices',
        },
        {
          name: 'pause',
          description: 'Pause speech synthesis',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause',
        },
        {
          name: 'resume',
          description: 'Resume speech synthesis',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/resume',
        },
        {
          name: 'speak',
          description: 'Speak text',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak',
        },
      ],
      globalProperty: 'speechSynthesis',
    },
    {
      // self.localStorage
      name: 'Storage',
      methods: [
        {
          name: 'getItem',
          description: 'Return an item from local storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem',
        },
        {
          name: 'setItem',
          description: 'Save an item to local storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem',
        },
        {
          name: 'removeItem',
          description: 'Remove an item from local storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem',
        },
        {
          name: 'clear',
          description: 'Clear local storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear',
        },
        {
          name: 'key',
          description: 'Return the name of the nth key in local storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage/key',
        },
      ],
    },
    {
      name: 'StorageAccess',
      documentMethods: [
        {
          name: 'requestStorageAccess',
          description: 'Request access to first-party storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/requestStorageAccess',
        },
        {
          name: 'hasStorageAccess',
          description: 'Check if storage access is granted',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/hasStorageAccess',
        },
      ],
    },
    {
      // navigator.storage
      name: 'StorageManager',
      methods: [
        {
          name: 'estimate',
          description: 'Returns current storage space - used and available',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate',
        },
        {
          name: 'persist',
          description: 'Request permission to use persistent storage',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist',
        },
        {
          name: 'persisted',
          description: 'Check if persistent storage is granted',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persisted',
        },
      ],
    },
    {
      // self.crypto.subtle
      name: 'SubtleCrypto',
      methods: [
        {
          name: 'decrypt',
          description: 'Decrypt data',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt',
        },
        {
          name: 'deriveBits',
          description: 'Derive bits from a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits',
        },
        {
          name: 'deriveKey',
          description: 'Derive a secret key from a master key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey',
        },
        {
          name: 'digest',
          description: 'Generate a crypto digest from data',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest',
        },
        {
          name: 'encrypt',
          description: 'Encrypt data',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt',
        },
        {
          name: 'exportKey',
          description: 'Export a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey',
        },
        {
          name: 'generateKey',
          description: 'Generate a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey',
        },
        {
          name: 'importKey',
          description: 'Import a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey',
        },
        {
          name: 'sign',
          description: 'Sign data',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign',
        },
        {
          name: 'unwrapKey',
          description: 'Unwrap a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey',
        },
        {
          name: 'verify',
          description: 'Verify data',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify',
        },
        {
          name: 'wrapKey',
          description: 'Wrap a crypto key',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey',
        },
      ],
    },
    {
      // navigator.usb
      name: 'USB',
      methods: [
        {
          name: 'getDevices',
          description: 'Get a list of paired attached USB devices',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/USB/getDevices',
        },
        {
          name: 'requestDevice',
          description: 'Request access to a USB device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/USB/requestDevice',
        },
      ],
    },
    {
      name: 'Vibration',
      navigatorMethods: [
        {
          name: 'vibrate',
          description: 'Vibrate the device',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate',
        },
      ],
    },
    {
      // navigator.wakeLock
      name: 'WakeLock',
      methods: [
        {
          name: 'request',
          description: 'Request a device wake lock',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WakeLock/request',
        },
      ],
    },
    {
      name: 'WebSocket',
      globalConstructor: true,
      constructorDescription: 'Create a new WebSocket object',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket',
      methods: [
        {
          name: 'close',
          description: 'Close a websocket connection',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close',
        },
        {
          name: 'send',
          description: 'Send data on a websocket connection',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send',
        },
      ],
    },
    {
      name: 'Worker',
      globalConstructor: true,
      constructorDescription: 'Create a new web worker',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker',
      methods: [
        {
          name: 'postMessage',
          description: 'Post a message to a web worker',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage',
        },
        {
          name: 'terminate',
          description: 'Terminate a web worker',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate',
        },
      ],
    },
    {
      name: 'SharedWorker',
      globalConstructor: true,
      constructorDescription: 'Create a new shared worker',
      constructorUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker/SharedWorker',
    },
    {
      name: 'XMLHttpRequest',
      globalConstructor: true,
      constructorDescription: 'Communicate with a web server',
      constructorUrl:
        'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest',
      methods: [
        {
          name: 'abort',
          description: 'Abort an web request',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort',
        },
        {
          name: 'getAllResponseHeaders',
          description: 'Get all response headers',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders',
        },
        {
          name: 'getResponseHeader',
          description: 'Get a response header',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader',
        },
        {
          name: 'open',
          description: 'Open a web request',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open',
        },
        {
          name: 'overrideMimeType',
          description: 'Override the MIME type',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType',
        },
        {
          name: 'send',
          description: 'Send data via a web request',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send',
        },
        {
          name: 'setRequestHeader',
          description: 'Set a request header',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader',
        },
      ],
    },
  ].reduce((acc, cur) => [...acc, ...builder(cur)], []);

module.exports = library;
