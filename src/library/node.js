const {node: builder} = require('./builder');

const library = () =>
  [
    {
      name: 'child_process',
      methods: [
        {
          name: 'exec',
          description: 'Spawn a shell and execute an arbitrary command',
          url: 'https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback',
          needsExplicitPermission: true,
        },
        {
          name: 'execFile',
          description: 'Spawn a shell and execute an arbitrary file',
          url: 'https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback',
          needsExplicitPermission: true,
        },
        {
          name: 'fork',
          description: 'Fork a child process',
          url: 'https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options',
        },
        {
          name: 'spawn',
          description: 'Spawn a new process',
          url: 'https://nodejs.org/api/child_process.html#child_processspawncommand-args-options',
        },
        {
          name: 'execFileSync',
          description: 'Spawn a shell and execute an arbitrary file',
          url: 'https://nodejs.org/api/child_process.html#child_process_child_process_execfilesync_file_args_options',
          needsExplicitPermission: true,
        },
        {
          name: 'execSync',
          description: 'Spawn a shell and execute an arbitrary command',
          url: 'https://nodejs.org/api/child_process.html#child_processexecsynccommand-options',
          needsExplicitPermission: true,
        },
        {
          name: 'spawnSync',
          description: 'Spawn a new process',
          url: 'https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options',
        },
      ],
    },
    {
      name: 'cluster',
      methods: [
        {
          name: 'disconnect',
          description: 'Disconnect a worker from its parent process',
          url: 'https://nodejs.org/api/cluster.html#workerdisconnect',
        },
        {
          name: 'fork',
          description: 'Fork a new worker process',
          url: 'https://nodejs.org/api/cluster.html#clusterforkenv',
        },
        {
          name: 'setupPrimary',
          description: 'Change the default fork behavior of cluster.fork',
          url: 'https://nodejs.org/api/cluster.html#clustersetupprimarysettings',
        },
        {
          name: 'setupMaster',
          description: 'Change the default fork behavior of cluster.fork',
          url: 'https://nodejs.org/api/cluster.html#clustersetupmastersettings',
        },
      ],
    },
    {
      name: 'dgram',
      methods: [
        {
          name: 'createSocket',
          description: 'Create a datagram socket',
          url: 'https://nodejs.org/api/dgram.html#dgram_dgram_createsocket_type_callback',
        },
      ],
    },
    {
      name: 'dns',
      methods: [
        {
          name: 'Resolver',
          isConstructor: true,
          description: 'Create a DNS resolver',
          url: 'https://nodejs.org/api/dns.html#dns_class_dns_resolver',
        },
        {
          name: 'getServers',
          description: 'Get the list of current DNS servers',
          url: 'https://nodejs.org/api/dns.html#dns_dns_getservers',
        },
        {
          name: 'lookup',
          description: 'Resolve a host name into the first found A or AAAA record',
          url: 'https://nodejs.org/api/dns.html#dns_dns_lookup_hostname_options_callback',
        },
        {
          name: 'lookupService',
          description: 'Resolve the given address and port into a host name and service',
          url: 'https://nodejs.org/api/dns.html#dnslookupserviceaddress-port-callback',
        },
        {
          name: 'resolve',
          description: 'Resolve a host name into an array of records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvehostname-rrtype-callback',
        },
        {
          name: 'resolve4',
          description: 'Resolve a host name to an IPv4 address',
          url: 'https://nodejs.org/api/dns.html#dnsresolve4hostname-options-callback',
        },
        {
          name: 'resolve6',
          description: 'Resolve a host name to an IPv6 address',
          url: 'https://nodejs.org/api/dns.html#dnsresolve6hostname-options-callback',
        },
        {
          name: 'resolveAny',
          description: 'Resolve a host name to an array of records',
          url: 'https://nodejs.org/api/dns.html#dnsresolveanyhostname-callback',
        },
        {
          name: 'resolveCname',
          description: 'Resolve a host name to an array of CNAME records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvecnamehostname-callback',
        },
        {
          name: 'resolveCaa',
          description: 'Resolve a host name to an array of CAA records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvecaahostname-callback',
        },
        {
          name: 'resolveMx',
          description: 'Resolve a host name to an array of MX records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvemxhostname-callback',
        },
        {
          name: 'resolveNaptr',
          description: 'Resolve a host name to an array of NAPTR records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvenaptrhostname-callback',
        },
        {
          name: 'resolveNs',
          description: 'Resolve a host name to an array of NS records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvenshostname-callback',
        },
        {
          name: 'resolvePtr',
          description: 'Resolve a host name to an array of PTR records',
          url: 'https://nodejs.org/api/dns.html#dnsresolveptrhostname-callback',
        },
        {
          name: 'resolveSoa',
          description: 'Resolve a host name to an SOA record',
          url: 'https://nodejs.org/api/dns.html#dnsresolvesoahostname-callback',
        },
        {
          name: 'resolveSrv',
          description: 'Resolve a host name to an array of SRV records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvesrvhostname-callback',
        },
        {
          name: 'resolveTxt',
          description: 'Resolve a host name to an array of TXT records',
          url: 'https://nodejs.org/api/dns.html#dnsresolvetxthostname-callback',
        },
        {
          name: 'reverse',
          description: 'Perform a reverse lookup for the given address',
          url: 'https://nodejs.org/api/dns.html#dnsreverseip-callback',
        },
        {
          name: 'setDefaultResultOrder',
          description: 'Set the default order for result records',
          url: 'https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder',
        },
        {
          name: 'setServers',
          description: 'Set the list of DNS servers to be used',
          url: 'https://nodejs.org/api/dns.html#dns_dns_setservers_servers',
        },
      ],
    },
    {
      name: 'fetch',
      methods: [
        {
          name: 'fetch',
          description: 'Communicate with a web server',
          url: 'https://nodejs.org/api/fetch/',
        },
      ],
      globalMethod: true,
    },
    {
      name: 'eval',
      methods: [
        {
          name: 'eval',
          description: 'Run arbitrary JS code from a string',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval',
          needsExplicitPermission: true,
        },
      ],
      globalMethod: true,
    },
    {
      name: 'Function',
      methods: [
        {
          name: 'Function',
          description: 'Create a new function from an arbitrary string',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
          needsExplicitPermission: true,
        },
      ],
      globalMethod: true,
    },
    {
      name: 'fs',
      methods: [
        // Callback API
        {
          name: 'access',
          description: "Test a user's permissions for a file or directory",
          url: 'https://nodejs.org/api/fs.html#fsaccesspath-mode-callback',
        },
        {
          name: 'appendFile',
          description: 'Append to a file',
          url: 'https://nodejs.org/api/fs.html#fsappendfilepath-data-options-callback',
        },
        {
          name: 'chmod',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fschmodpath-mode-callback',
        },
        {
          name: 'chown',
          description: 'Change file ownership',
          url: 'https://nodejs.org/api/fs.html#fschownpath-uid-gid-callback',
        },
        {
          name: 'close',
          description: 'Close a file descriptor',
          url: 'https://nodejs.org/api/fs.html#fschownpath-uid-gid-callback',
        },
        {
          name: 'copyFile',
          description: 'Copy a file',
          url: 'https://nodejs.org/api/fs.html#fscopyfilesrc-dest-mode-callback',
        },
        {
          name: 'cp',
          description: 'Copy a directory',
          url: 'https://nodejs.org/api/fs.html#fscpsrc-dest-options-callback',
        },
        {
          name: 'createReadStream',
          description: 'Create a readable stream',
          url: 'https://nodejs.org/api/fs.html#fscreatereadstreampath-options',
        },
        {
          name: 'createWriteStream',
          description: 'Create a writable stream',
          url: 'https://nodejs.org/api/fs.html#fscreatewritestreampath-options',
        },
        {
          name: 'exists',
          description: 'Test whether or not a file exists',
          url: 'https://nodejs.org/api/fs.html#fsexistspath-callback',
        },
        {
          name: 'fchmod',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fsfchmodfd-mode-callback',
        },
        {
          name: 'fchown',
          description: 'Change file ownership',
          url: 'https://nodejs.org/api/fs.html#fsfchownfd-uid-gid-callback',
        },
        {
          name: 'fdatasync',
          description: 'Force all currently queued I/O operations to completion',
          url: 'https://nodejs.org/api/fs.html#fsfdatasyncfd-callback',
        },
        {
          name: 'fstat',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fsfstatfd-options-callback',
        },
        {
          name: 'fsync',
          description: 'Request data to be flushed to the storage device',
          url: 'https://nodejs.org/api/fs.html#fsfsyncfd-callback',
        },
        {
          name: 'ftruncate',
          description: 'Truncate a file to a specified length',
          url: 'https://nodejs.org/api/fs.html#fsftruncatefd-len-callback',
        },
        {
          name: 'futimes',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fsfutimesfd-atime-mtime-callback',
        },
        {
          name: 'lchmod',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fslchmodpath-mode-callback',
        },
        {
          name: 'lchown',
          description: 'Change file ownership',
          url: 'https://nodejs.org/api/fs.html#fslchownpath-uid-gid-callback',
        },
        {
          name: 'lutimes',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fslutimespath-atime-mtime-callback',
        },
        {
          name: 'link',
          description: 'Create a new link',
          url: 'https://nodejs.org/api/fs.html#fslinkexistingpath-newpath-callback',
        },
        {
          name: 'lstat',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fslstatpath-options-callback',
        },
        {
          name: 'mkdir',
          description: 'Create a directory',
          url: 'https://nodejs.org/api/fs.html#fsmkdirpath-options-callback',
        },
        {
          name: 'mkdtemp',
          description: 'Create a unique temporary directory',
          url: 'https://nodejs.org/api/fs.html#fsmkdtempprefix-options-callback',
        },
        {
          name: 'open',
          description: 'Open a file',
          url: 'https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback',
        },
        {
          name: 'opendir',
          description: 'Open a directory',
          url: 'https://nodejs.org/api/fs.html#fsopendirpath-options-callback',
        },
        {
          name: 'read',
          description: 'Read a file',
          url: 'https://nodejs.org/api/fs.html#fsreadfd-buffer-offset-length-position-callback',
        },
        {
          name: 'readdir',
          description: 'Read a directory',
          url: 'https://nodejs.org/api/fs.html#fsreaddirpath-options-callback',
        },
        {
          name: 'readFile',
          description: 'Read a file',
          url: 'https://nodejs.org/api/fs.html#fsreadfilepath-options-callback',
        },
        {
          name: 'readlink',
          description: 'Read a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fsreadlinkpath-options-callback',
        },
        {
          name: 'readv',
          description: 'Read from a file',
          url: 'https://nodejs.org/api/fs.html#fsreadvfd-buffers-position-callback',
        },
        {
          name: 'realpath',
          description: 'Resolve a canonical path',
          url: 'https://nodejs.org/api/fs.html#fsrealpathpath-options-callback',
        },
        {
          name: 'rename',
          description: 'Rename a file or directory',
          url: 'https://nodejs.org/api/fs.html#fsrenameoldpath-newpath-callback',
        },
        {
          name: 'rmdir',
          description: 'Remove a directory',
          url: 'https://nodejs.org/api/fs.html#fsrmdirpath-options-callback',
        },
        {
          name: 'rm',
          description: 'Remove a file',
          url: 'https://nodejs.org/api/fs.html#fsrmpath-options-callback',
        },
        {
          name: 'stat',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fsstatpath-options-callback',
        },
        {
          name: 'symlink',
          description: 'Create a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fssymlinktarget-path-type-callback',
        },
        {
          name: 'truncate',
          description: 'Truncate a file to a specified length',
          url: 'https://nodejs.org/api/fs.html#fstruncatepath-len-callback',
        },
        {
          name: 'unlink',
          description: 'Delete a file',
          url: 'https://nodejs.org/api/fs.html#fsunlinkpath-callback',
        },
        {
          name: 'unwatchFile',
          description: 'Stop watching a file for changes',
          url: 'https://nodejs.org/api/fs.html#fsunwatchfilefilename-listener',
        },
        {
          name: 'utimes',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fsutimespath-atime-mtime-callback',
        },
        {
          name: 'watch',
          description: 'Monitor a file for changes',
          url: 'https://nodejs.org/api/fs.html#fswatchfilename-options-listener',
        },
        {
          name: 'watchFile',
          description: 'Monitor a file for changes',
          url: 'https://nodejs.org/api/fs.html#fswatchfilefilename-options-listener',
        },
        {
          name: 'write',
          description: 'Write to a file',
          url: 'https://nodejs.org/api/fs.html#fswritefd-buffer-offset-length-position-callback',
        },
        {
          name: 'writeFile',
          description: 'Write a file',
          url: 'https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback',
        },
        {
          name: 'writev',
          description: 'Write to a file',
          url: 'https://nodejs.org/api/fs.html#fswritevfd-buffers-position-callback',
        },
        // Synchronous API
        {
          name: 'accessSync',
          description: "Test a user's permissions for a file or directory",
          url: 'https://nodejs.org/api/fs.html#fsaccesssyncpath-mode',
        },
        {
          name: 'appendFileSync',
          description: 'Append data to a file',
          url: 'https://nodejs.org/api/fs.html#fsappendfilesyncpath-data-options',
        },
        {
          name: 'chmodSync',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fschmodsyncpath-mode',
        },
        {
          name: 'chownSync',
          description: 'Change file owner',
          url: 'https://nodejs.org/api/fs.html#fschownsyncpath-uid-gid',
        },
        {
          name: 'closeSync',
          description: 'Close a file',
          url: 'https://nodejs.org/api/fs.html#fsclosesyncfd',
        },
        {
          name: 'copyFileSync',
          description: 'Copy a file',
          url: 'https://nodejs.org/api/fs.html#fscopyfilesyncsrc-dest-mode',
        },
        {
          name: 'cpSync',
          description: 'Copy a directory',
          url: 'https://nodejs.org/api/fs.html#fscpsyncsrc-dest-options',
        },
        {
          name: 'existsSync',
          description: 'Test whether a file exists',
          url: 'https://nodejs.org/api/fs.html#fsexistssyncpath',
        },
        {
          name: 'fchmodSync',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fsfchmodsyncfd-mode',
        },
        {
          name: 'fchownSync',
          description: 'Change file owner',
          url: 'https://nodejs.org/api/fs.html#fsfchownsyncfd-uid-gid',
        },
        {
          name: 'fdatasyncSync',
          description: 'Force all currently queued I/O operations to completion',
          url: 'https://nodejs.org/api/fs.html#fsfdatasyncsyncfd',
        },
        {
          name: 'fstatSync',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fsfstatsyncfd-options',
        },
        {
          name: 'fsyncSync',
          description: 'Force all data to be flushed to the storage device',
          url: 'https://nodejs.org/api/fs.html#fsfsyncsyncfd',
        },
        {
          name: 'ftruncateSync',
          description: 'Truncate a file to a specified length',
          url: 'https://nodejs.org/api/fs.html#fsftruncatesyncfd-len',
        },
        {
          name: 'futimesSync',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fsfutimessyncfd-atime-mtime',
        },
        {
          name: 'lchmodSync',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fslchmodsyncpath-mode',
        },
        {
          name: 'lchownSync',
          description: 'Change file owner',
          url: 'https://nodejs.org/api/fs.html#fslchownsyncpath-uid-gid',
        },
        {
          name: 'lutimesSync',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fslutimessyncpath-atime-mtime',
        },
        {
          name: 'linkSync',
          description: 'Create a hard link',
          url: 'https://nodejs.org/api/fs.html#fslinksyncexistingpath-newpath',
        },
        {
          name: 'lstatSync',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fslstatsyncpath-options',
        },
        {
          name: 'mkdirSync',
          description: 'Create a directory',
          url: 'https://nodejs.org/api/fs.html#fsmkdirsyncpath-options',
        },
        {
          name: 'mkdtempSync',
          description: 'Create a temporary directory',
          url: 'https://nodejs.org/api/fs.html#fsmkdtempsyncprefix-options',
        },
        {
          name: 'openSync',
          description: 'Open a file',
          url: 'https://nodejs.org/api/fs.html#fsopensyncpath-flags-mode',
        },
        {
          name: 'opendirSync',
          description: 'Open a directory',
          url: 'https://nodejs.org/api/fs.html#fsopendirsyncpath-options',
        },
        {
          name: 'readSync',
          description: 'Read a file',
          url: 'https://nodejs.org/api/fs.html#fsreadsyncfd-buffer-offset-length-position',
        },
        {
          name: 'readdirSync',
          description: 'Read a directory',
          url: 'https://nodejs.org/api/fs.html#fsreaddirsyncpath-options',
        },
        {
          name: 'readFileSync',
          description: 'Read a file',
          url: 'https://nodejs.org/api/fs.html#fsreadfilesyncpath-options',
        },
        {
          name: 'readlinkSync',
          description: 'Read a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fsreadlinksyncpath-options',
        },
        {
          name: 'readvSync',
          description: 'Read from a file',
          url: 'https://nodejs.org/api/fs.html#fsreadvsyncfd-buffers-position',
        },
        {
          name: 'realpathSync',
          description: 'Return canonical absolute pathname',
          url: 'https://nodejs.org/api/fs.html#fsrealpathsyncpath-options',
        },
        {
          name: 'renameSync',
          description: 'Rename a file or directory',
          url: 'https://nodejs.org/api/fs.html#fsrenamesyncoldpath-newpath',
        },
        {
          name: 'rmdirSync',
          description: 'Remove a directory',
          url: 'https://nodejs.org/api/fs.html#fsrmdirsyncpath-options',
        },
        {
          name: 'rmSync',
          description: 'Remove a file',
          url: 'https://nodejs.org/api/fs.html#fsrmsyncpath-options',
        },
        {
          name: 'statSync',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fsstatsyncpath-options',
        },
        {
          name: 'symlinkSync',
          description: 'Create a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fssymlinksynctarget-path-type',
        },
        {
          name: 'truncateSync',
          description: 'Truncate a file to a specified length',
          url: 'https://nodejs.org/api/fs.html#fstruncatesyncpath-len',
        },
        {
          name: 'unlinkSync',
          description: 'Delete a file',
          url: 'https://nodejs.org/api/fs.html#fsunlinksyncpath',
        },
        {
          name: 'utimesSync',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fsutimessyncpath-atime-mtime',
        },
        {
          name: 'writeSync',
          description: 'Write to a file',
          url: 'https://nodejs.org/api/fs.html#fswritesyncfd-buffer-offset-length-position',
        },
        {
          name: 'writeFileSync',
          description: 'Write a file',
          url: 'https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options',
        },
        {
          name: 'writevSync',
          description: 'Write to a file',
          url: 'https://nodejs.org/api/fs.html#fswritevsyncfd-buffers-position',
        },
      ],
    },
    {
      name: 'fs/promises',
      methods: [
        {
          name: 'access',
          description: "Test a user's permissions for a file or directory",
          url: 'https://nodejs.org/api/fs.html#fspromisesaccesspath-mode',
        },
        {
          name: 'appendFile',
          description: 'Append data to a file',
          url: 'https://nodejs.org/api/fs.html#fspromisesappendfilepath-data-options',
        },
        {
          name: 'chmod',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fspromiseschmodpath-mode',
        },
        {
          name: 'chown',
          description: 'Change file owner',
          url: 'https://nodejs.org/api/fs.html#fspromiseschownpath-uid-gid',
        },
        {
          name: 'copyFile',
          description: 'Copy a file',
          url: 'https://nodejs.org/api/fs.html#fspromisescopyfilesrc-dest-mode',
        },
        {
          name: 'cp',
          description: 'Copy a file',
          url: 'https://nodejs.org/api/fs.html#fspromisescpsrc-dest-options',
        },
        {
          name: 'lchmod',
          description: 'Change file permissions',
          url: 'https://nodejs.org/api/fs.html#fspromiseslchmodpath-mode',
        },
        {
          name: 'lchown',
          description: 'Change file owner',
          url: 'https://nodejs.org/api/fs.html#fspromiseslchownpath-uid-gid',
        },
        {
          name: 'lutimes',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fspromiseslutimespath-atime-mtime',
        },
        {
          name: 'link',
          description: 'Create a hard link',
          url: 'https://nodejs.org/api/fs.html#fspromiseslinkexistingpath-newpath',
        },
        {
          name: 'lstat',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fspromiseslstatpath-options',
        },
        {
          name: 'mkdir',
          description: 'Create a directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesmkdirpath-options',
        },
        {
          name: 'mkdtemp',
          description: 'Create a temporary directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options',
        },
        {
          name: 'open',
          description: 'Open a file',
          url: 'hhttps://nodejs.org/api/fs.html#fspromisesopenpath-flags-mode',
        },
        {
          name: 'opendir',
          description: 'Open a directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesopendirpath-options',
        },
        {
          name: 'readdir',
          description: 'Read a directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesreaddirpath-options',
        },
        {
          name: 'readFile',
          description: 'Read a file',
          url: 'https://nodejs.org/api/fs.html#fspromisesreadfilepath-options',
        },
        {
          name: 'readlink',
          description: 'Read a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fspromisesreadlinkpath-options',
        },
        {
          name: 'realpath',
          description: 'Return canonical absolute pathname',
          url: 'https://nodejs.org/api/fs.html#fspromisesrealpathpath-options',
        },
        {
          name: 'rename',
          description: 'Rename a file or directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesrenameoldpath-newpath',
        },
        {
          name: 'rmdir',
          description: 'Remove a directory',
          url: 'https://nodejs.org/api/fs.html#fspromisesrmdirpath-options',
        },
        {
          name: 'rm',
          description: 'Remove a file',
          url: 'https://nodejs.org/api/fs.html#fspromisesrmpath-options',
        },
        {
          name: 'stat',
          description: 'Get file status',
          url: 'https://nodejs.org/api/fs.html#fspromisesstatpath-options',
        },
        {
          name: 'symlink',
          description: 'Create a symbolic link',
          url: 'https://nodejs.org/api/fs.html#fspromisessymlinktarget-path-type',
        },
        {
          name: 'truncate',
          description: 'Truncate a file to a specified length',
          url: 'https://nodejs.org/api/fs.html#fspromisestruncatepath-len',
        },
        {
          name: 'unlink',
          description: 'Delete a file',
          url: 'https://nodejs.org/api/fs.html#fspromisesunlinkpath',
        },
        {
          name: 'utimes',
          description: 'Change file timestamps',
          url: 'https://nodejs.org/api/fs.html#fspromisesutimespath-atime-mtime',
        },
        {
          name: 'watch',
          description: 'Watch for changes on a file',
          url: 'https://nodejs.org/api/fs.html#fspromiseswatchfilename-options',
        },
        {
          name: 'writeFile',
          description: 'Write data to a file',
          url: 'https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options',
        },
      ],
    },
    {
      name: 'http',
      methods: [
        {
          name: 'Agent',
          description: 'Manage HTTP connection persistence and reuse',
          url: 'https://nodejs.org/api/http.html#class-httpagent',
        },
        {
          name: 'createServer',
          description: 'Create a new HTTP server',
          url: 'https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener',
        },
        {
          name: 'get',
          description: 'Send a GET request to a server',
          url: 'https://nodejs.org/api/http.html#httpgetoptions-callback',
        },
        {
          name: 'request',
          description: 'Send an HTTP request to a server',
          url: 'https://nodejs.org/api/http.html#httprequestoptions-callback',
        },
      ],
    },
    {
      name: 'http2',
      methods: [
        {
          name: 'createServer',
          description: 'Create a new HTTP/2 server',
          url: 'https://nodejs.org/api/http2.html#http2createserveroptions-onrequesthandler',
        },
        {
          name: 'createSecureServer',
          description: 'Create a new secure HTTP/2 server',
          url: 'https://nodejs.org/api/http2.html#http2createsecureserveroptions-onrequesthandler',
        },
        {
          name: 'connect',
          description: 'Establish a connection to a server',
          url: 'https://nodejs.org/api/http2.html#http2connectauthority-options-listener',
        },
        {
          name: 'getDefaultSettings',
          description: 'Get the default settings for a HTTP/2 session',
          url: 'https://nodejs.org/api/http2.html#http2getdefaultsettings',
        },
        {
          name: 'getPackedSettings',
          description: 'Get the current settings for a HTTP/2 session',
          url: 'https://nodejs.org/api/http2.html#http2getpackedsettings',
        },
        {
          name: 'getUnpackedSettings',
          description: 'Get the current settings for a HTTP/2 session',
          url: 'hhttps://nodejs.org/api/http2.html#http2getunpackedsettingsbuf',
        },
      ],
    },
    {
      name: 'https',
      methods: [
        {
          name: 'Agent',
          description: 'Manage HTTPS connection persistence and reuse',
          url: 'https://nodejs.org/api/https.html#class-httpsagent',
        },
        {
          name: 'createServer',
          description: 'Create a new HTTPS server',
          url: 'https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener',
        },
        {
          name: 'get',
          description: 'Send a GET request to a server',
          url: 'https://nodejs.org/api/https.html#httpsgetoptions-callback',
        },
        {
          name: 'request',
          description: 'Send an HTTPS request to a server',
          url: 'https://nodejs.org/api/https.html#httpsrequestoptions-callback',
        },
      ],
    },
    {
      name: 'inspector',
      methods: [
        {
          name: 'close',
          description: 'Close a V8 inspector',
          url: 'https://nodejs.org/api/inspector.html#inspectorclose',
        },
        {
          name: 'open',
          description: 'Open a V8 inspector',
          url: 'https://nodejs.org/api/inspector.html#inspectoropenport-host-wait',
        },
        {
          name: 'url',
          description: 'Get the URL of the V8 inspector',
          url: 'https://nodejs.org/api/inspector.html#inspectorurl',
        },
        {
          name: 'waitForDebugger',
          description: 'Wait for the V8 debugger to connect',
          url: 'https://nodejs.org/api/inspector.html#inspectorwaitfordebugger',
        },
        {
          name: 'Session',
          isConstructor: true,
          description: 'Create a new V8 inspector session',
          url: 'https://nodejs.org/api/inspector.html#class-inspectorsession',
        },
      ],
    },
    {
      name: 'net',
      methods: [
        {
          name: 'Server',
          description: 'Create a new TCP server',
          url: 'https://nodejs.org/api/net.html#class-netserver',
        },
        {
          name: 'Socket',
          description: 'Create a new TCP socket',
          url: 'https://nodejs.org/api/net.html#class-netsocket',
        },
        {
          name: 'connect',
          description: 'Connect to a remote TCP server',
          url: 'https://nodejs.org/api/net.html#netconnect',
        },
        {
          name: 'createConnection',
          description: 'Connect to a remote TCP server',
          url: 'https://nodejs.org/api/net.html#netcreateconnection',
        },
        {
          name: 'createServer',
          description: 'Create a new TCP server',
          url: 'https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener',
        },
      ],
    },
    {
      name: 'os',
      methods: [
        {
          name: 'arch',
          description: 'Get the CPU architecture',
          url: 'https://nodejs.org/api/os.html#osarch',
        },
        {
          name: 'cpus',
          description: 'Get CPU information',
          url: 'https://nodejs.org/api/os.html#oscpus',
        },
        {
          name: 'endianness',
          description: 'Get the endianness of the CPU',
          url: 'https://nodejs.org/api/os.html#osendianness',
        },
        {
          name: 'freemem',
          description: 'Get the amount of free system memory',
          url: 'https://nodejs.org/api/os.html#osfreemem',
        },
        {
          name: 'getPriority',
          description: 'Get the scheduling priority for a process',
          url: 'https://nodejs.org/api/os.html#osgetprioritypid',
        },
        {
          name: 'homedir',
          description: 'Get the home directory path for the current user',
          url: 'https://nodejs.org/api/os.html#oshomedir',
        },
        {
          name: 'hostname',
          description: 'Get the hostname of the OS',
          url: 'https://nodejs.org/api/os.html#oshostname',
        },
        {
          name: 'loadavg',
          description: 'Get system load average information',
          url: 'https://nodejs.org/api/os.html#osloadavg',
        },
        {
          name: 'networkInterfaces',
          description: 'Get a list of network interfaces',
          url: 'https://nodejs.org/api/os.html#osnetworkinterfaces',
        },
        {
          name: 'platform',
          description: 'Get the operating system platform',
          url: 'https://nodejs.org/api/os.html#osplatform',
        },
        {
          name: 'release',
          description: 'Get the operating system release',
          url: 'https://nodejs.org/api/os.html#osrelease',
        },
        {
          name: 'setPriority',
          description: 'Set the scheduling priority for a process',
          url: 'https://nodejs.org/api/os.html#ossetprioritypid-priority',
        },
        {
          name: 'tmpdir',
          description: 'Get the path of a temporary directory',
          url: 'https://nodejs.org/api/os.html#ostmpdir',
        },
        {
          name: 'totalmem',
          description: 'Get the total amount of system memory',
          url: 'https://nodejs.org/api/os.html#ostotalmem',
        },
        {
          name: 'type',
          description: 'Get the operating system name',
          url: 'https://nodejs.org/api/os.html#ostype',
        },
        {
          name: 'uptime',
          description: 'Get the system uptime',
          url: 'https://nodejs.org/api/os.html#osuptime',
        },
        {
          name: 'userInfo',
          description: 'Get current user information',
          url: 'https://nodejs.org/api/os.html#osuserinfooptions',
        },
        {
          name: 'version',
          description: 'Get the kernel version',
          url: 'https://nodejs.org/api/os.html#osversion',
        },
      ],
    },
    {
      name: 'process',
      methods: [
        {
          name: 'abort',
          description: 'Exit the Node.js process immediately',
          url: 'https://nodejs.org/api/process.html#processabort',
        },
        {
          name: 'chdir',
          description: 'Change the current working directory',
          url: 'https://nodejs.org/api/process.html#processchdirdirectory',
        },
        {
          name: 'cpuUsage',
          description: 'Get current process CPU usage info',
          url: 'https://nodejs.org/api/process.html#processcpuusagepreviousvalue',
        },
        {
          name: 'cwd',
          description: 'Get the current working directory',
          url: 'https://nodejs.org/api/process.html#processcwd',
        },
        {
          name: 'disconnect',
          description: 'Disconnect child process from parent',
          url: 'https://nodejs.org/api/process.html#processdisconnect',
        },
        {
          name: 'dlopen',
          description: 'Load C++ addons',
          url: 'https://nodejs.org/api/process.html#processdlopenmodule-filename-flags',
          needsExplicitPermission: true,
        },
        {
          name: 'emitWarning',
          description: 'Emit a custom process warning',
          url: 'https://nodejs.org/api/process.html#processemitwarningwarning-options',
        },
        {
          name: 'exit',
          description: 'Exit the Node.js process',
          url: 'https://nodejs.org/api/process.html#processexitcode',
        },
        {
          name: 'getActiveResourcesInfo',
          description: 'Get a list of resources currently keeping the event loop alive',
          url: 'https://nodejs.org/api/process.html#processgetactiveresourcesinfo',
        },
        {
          name: 'getegid',
          description: 'Get the effective group id of the Node.js process',
          url: 'https://nodejs.org/api/process.html#processgetegid',
        },
        {
          name: 'geteuid',
          description: 'Get the effective numerical user id',
          url: 'https://nodejs.org/api/process.html#processgeteuid',
        },
        {
          name: 'getgid',
          description: 'Get the numerical group id of the process',
          url: 'https://nodejs.org/api/process.html#processgetgid',
        },
        {
          name: 'getgroups',
          description: 'Get the list of supplementary group ids',
          url: 'https://nodejs.org/api/process.html#processgetgroups',
        },
        {
          name: 'getuid',
          description: 'Get the numerical user id of the process',
          url: 'https://nodejs.org/api/process.html#processgetuid',
        },
        {
          name: 'hasUncaughtExceptionCaptureCallback',
          description: 'Find out if there is an uncaught exception callback set',
          url: 'https://nodejs.org/api/process.html#processhasuncaughtexceptioncapturecallback',
        },
        {
          name: 'hrtime',
          description: 'Get high resolution time',
          url: 'https://nodejs.org/api/process.html#processhrtimetime',
        },
        {
          name: 'initgroups',
          description: 'Initialize the group access list',
          url: 'https://nodejs.org/api/process.html#processinitgroupsuser-extragroup',
        },
        {
          name: 'kill',
          description: 'Kill a process',
          url: 'https://nodejs.org/api/process.html#processkillpid-signal',
        },
        {
          name: 'memoryUsage',
          description: 'Get memory usage information',
          url: 'https://nodejs.org/api/process.html#processmemoryusage',
        },
        {
          name: 'resourceUsage',
          description: 'Get resource usage information',
          url: 'https://nodejs.org/api/process.html#processresourceusage',
        },
        {
          name: 'send',
          description: 'Send a message to a process',
          url: 'https://nodejs.org/api/process.html#processsendmessage-sendhandle-options-callback',
        },
        {
          name: 'setegid',
          description: 'Set the effective group id of the process',
          url: 'https://nodejs.org/api/process.html#processsetegidid',
        },
        {
          name: 'seteuid',
          description: 'Set the effective user id of the process',
          url: 'https://nodejs.org/api/process.html#processseteuidid',
        },
        {
          name: 'setgid',
          description: 'Set the group id of the process',
          url: 'https://nodejs.org/api/process.html#processsetgidid',
        },
        {
          name: 'setgroups',
          description: 'Set the supplementary group ids of the process',
          url: 'https://nodejs.org/api/process.html#processsetgroupsgroups',
        },
        {
          name: 'setuid',
          description: 'Set the user id of the process',
          url: 'https://nodejs.org/api/process.html#processsetuidid',
        },
        {
          name: 'setSourceMapsEnabled',
          description: 'Enable/disable source maps',
          url: 'https://nodejs.org/api/process.html#processsetsourcemapsenabledval',
        },
        {
          name: 'setUncaughtExceptionCaptureCallback',
          description: 'Set a callback to run when there is an uncaught exception',
          url: 'https://nodejs.org/api/process.html#processsetuncaughtexceptioncapturecallbackfn',
        },
        {
          name: 'umask',
          description: 'Set the file mode creation mask',
          url: 'https://nodejs.org/api/process.html#processumask',
        },
        {
          name: 'uptime',
          description: 'Get the process uptime',
          url: 'https://nodejs.org/api/process.html#processuptime',
        },
        {
          name: 'on',
          description: 'Add a listener for a process event',
          url: 'https://nodejs.org/api/process.html#process-events',
        },
      ],
    },
    {
      name: 'timers',
      methods: [
        {
          name: 'setImmediate',
          description: 'Queue a function for execution',
          url: 'https://nodejs.org/api/timers.html#setimmediatecallback-args',
        },
        {
          name: 'setInterval',
          description: 'Set a repeating timer to execute a function',
          url: 'https://nodejs.org/api/timers.html#setintervalcallback-delay-args',
        },
        {
          name: 'setTimeout',
          description: 'Set a timer to execute a function',
          url: 'https://nodejs.org/api/timers.html#settimeoutcallback-delay-args',
        },
        {
          name: 'clearImmediate',
          description: 'Cancel a setImmediate callback',
          url: 'https://nodejs.org/api/timers.html#clearimmediateimmediate',
        },
        {
          name: 'clearInterval',
          description: 'Cancel a setInterval callback',
          url: 'https://nodejs.org/api/timers.html#clearintervaltimeout',
        },
        {
          name: 'clearTimeout',
          description: 'Cancel a setTimeout callback',
          url: 'https://nodejs.org/api/timers.html#cleartimeouttimeout',
        },
      ],
    },
    {
      name: 'timers/promises',
      methods: [
        {
          name: 'setImmediate',
          description: 'Queue a function for execution',
          url: 'https://nodejs.org/api/timers.html#timerspromisessetimmediatevalue-options',
        },
        {
          name: 'setInterval',
          description: 'Set a repeating timer to execute a function',
          url: 'https://nodejs.org/api/timers.html#timerspromisessetintervaldelay-value-options',
        },
        {
          name: 'setTimeout',
          description: 'Set a timer to execute a function',
          url: 'https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options',
        },
      ],
    },
    {
      name: 'tls',
      methods: [
        {
          name: 'Server',
          description: 'Create a new TLS server',
          url: 'https://nodejs.org/api/tls.html#class-tlsserver',
        },
        {
          name: 'TLSSocket',
          description: 'Create a new TLS socket',
          url: 'https://nodejs.org/api/tls.html#class-tlstlssocket',
        },
        {
          name: 'checkServerIdentity',
          description: 'Verify that a server certificate is valid for a given host',
          url: 'https://nodejs.org/api/tls.html#tlscheckserveridentityhostname-cert',
        },
        {
          name: 'connect',
          description: 'Connect to a TLS server',
          url: 'https://nodejs.org/api/tls.html#tlsconnectoptions-callback',
        },
        {
          name: 'createSecureContext',
          description: 'Create a new secure context',
          url: 'https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions',
        },
        {
          name: 'createSecurePair',
          description: 'Create a new secure pair',
          url: 'https://nodejs.org/api/tls.html#tlscreatesecurepaircontext-isserver-requestcert-rejectunauthorized-options',
        },
        {
          name: 'createServer',
          description: 'Create a new TLS server',
          url: 'https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener',
        },
        {
          name: 'getCiphers',
          description: 'Get a list of supported TLS ciphers',
          url: 'https://nodejs.org/api/tls.html#tlsgetciphers',
        },
      ],
    },
    {
      name: 'trace_events',
      methods: [
        {
          name: 'createTracing',
          description: 'Centralize system tracing information',
          url: 'https://nodejs.org/api/tracing.html#trace_eventscreatetracingoptions',
        },
        {
          name: 'getEnabledCategories',
          description: 'Get the enabled trace event categories',
          url: 'https://nodejs.org/api/tracing.html#trace_eventsgetenabledcategories',
        },
      ],
    },
    {
      name: 'v8',
      methods: [
        {
          name: 'cachedDataVersionTag',
          description:
            'Get a version tag derived from the V8 version, command-line flags, and detected CPU features',
          url: 'https://nodejs.org/api/v8.html#v8cacheddataversiontag',
        },
        {
          name: 'getHeapCodeStatistics',
          description: 'Get statistics about code and its metadata in the heap',
          url: 'https://nodejs.org/api/v8.html#v8getheapcodestatistics',
        },
        {
          name: 'getHeapSnapshot',
          description: 'Generate a snapshot of the current V8 heap',
          url: 'https://nodejs.org/api/v8.html#v8getheapsnapshot',
        },
        {
          name: 'getHeapSpaceStatistics',
          description: 'Get statistics about the V8 heap spaces',
          url: 'https://nodejs.org/api/v8.html#v8getheapspacestatistics',
        },
        {
          name: 'getHeapStatistics',
          description: 'Get detailed V8 heap statistics',
          url: 'https://nodejs.org/api/v8.html#v8getheapstatistics',
        },
        {
          name: 'setFlagsFromString',
          description: 'Programmatically set V8 command-line flags',
          url: 'https://nodejs.org/api/v8.html#v8setflagsfromstringflags',
        },
        {
          name: 'stopCoverage',
          description: 'Stop collecting JavaScript code coverage collection',
          url: 'https://nodejs.org/api/v8.html#v8stopcoverage',
        },
        {
          name: 'takeCoverage',
          description: 'Write code coverage data to disk',
          url: 'https://nodejs.org/api/v8.html#v8takecoverage',
        },
        {
          name: 'writeHeapSnapshot',
          description: 'Write a heap snapshot to a file',
          url: 'https://nodejs.org/api/v8.html#v8writeheapsnapshotfilename',
        },
        {
          name: 'serialize',
          description: 'Serialize value into a buffer',
          url: 'https://nodejs.org/api/v8.html#v8serializevalue',
        },
        {
          name: 'deserialize',
          description: 'Deserialize value from a buffer',
          url: 'https://nodejs.org/api/v8.html#v8deserializebuffer',
        },
      ],
    },
    {
      name: 'vm',
      methods: [
        {
          name: 'Script',
          isConstructor: true,
          description: 'Precompile arbitrary code to execute later',
          url: 'https://nodejs.org/api/vm.html#class-vmscript',
          needsExplicitPermission: true,
        },
        {
          name: 'SourceTextModule',
          description: 'Create a module defined from ECMAScript source text',
          url: 'https://nodejs.org/api/vm.html#class-vmsourcetextmodule',
        },
        {
          name: 'SyntheticModule',
          description: 'Create a WebIDL synthetic module',
          url: 'https://nodejs.org/api/vm.html#class-vmsyntheticmodule',
        },
        {
          name: 'compileFunction',
          description: 'Compile a JavaScript function',
          url: 'https://nodejs.org/api/vm.html#vmcompilefunctioncode-params-options',
        },
        {
          name: 'createContext',
          description: 'Create a new execution context',
          url: 'https://nodejs.org/api/vm.html#vmcreatecontextcontextobject-options',
        },
        {
          name: 'isContext',
          description: 'Check if the given object is an execution context',
          url: 'https://nodejs.org/api/vm.html#vmiscontextobject',
        },
        {
          name: 'measureMemory',
          description: 'Measure V8 memory usage',
          url: 'https://nodejs.org/api/vm.html#vmmeasurememoryoptions',
        },
        {
          name: 'runInContext',
          description: 'Run arbitrary code in a context',
          url: 'https://nodejs.org/api/vm.html#vmrunincontextcode-contextifiedobject-options',
          needsExplicitPermission: true,
        },
        {
          name: 'runInNewContext',
          description: 'Run arbitrary code in a new context',
          url: 'https://nodejs.org/api/vm.html#vmruninnewcontextcode-contextobject-options',
          needsExplicitPermission: true,
        },
        {
          name: 'runInThisContext',
          description: 'Run arbitrary code in the current context',
          url: 'https://nodejs.org/api/vm.html#vmruninthiscontextcode-options',
          needsExplicitPermission: true,
        },
      ],
    },
    {
      name: 'wasi',
      methods: [
        {
          name: 'WASI',
          isConstructor: true,
          description: 'Give WebAssembly apps access to the underlying OS',
          url: 'https://nodejs.org/api/wasi.html#new-wasioptions',
          needsExplicitPermission: true,
        },
      ],
    },
    {
      name: 'worker_threads',
      methods: [
        {
          name: 'Worker',
          isConstructor: true,
          description: 'Create a new independent JavaScript execution thread',
          url: 'https://nodejs.org/api/worker_threads.html#class-worker',
        },
        {
          name: 'getEnvironmentData',
          description: 'Get thread environment data',
          url: 'https://nodejs.org/api/worker_threads.html#workergetenvironmentdatakey',
        },
        {
          name: 'markAsUntransferable',
          description: 'Mark a buffer as untransferable between threads',
          url: 'https://nodejs.org/api/worker_threads.html#workermarkasuntransferableobject',
        },
        {
          name: 'moveMessagePortToContext',
          description: 'Move a message port to a different context',
          url: 'https://nodejs.org/api/worker_threads.html#workermovemessageporttocontextport-contextifiedsandbox',
        },
        {
          name: 'receiveMessageOnPort',
          description: 'Receive single a message on a port',
          url: 'https://nodejs.org/api/worker_threads.html#workerreceivemessageonportport',
        },
        {
          name: 'setEnvironmentData',
          description: 'Set thread environment data',
          url: 'https://nodejs.org/api/worker_threads.html#workersetenvironmentdatakey-value',
        },
      ],
    },
  ].map((lib) => builder(lib));

module.exports = library;
