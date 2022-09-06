# Sandworm.JS Library
## Node
| Method | Description | Docs |
|---|---|---|
| `child_process.exec` | Spawn a shell and execute an arbitrary command | [Docs](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) |
| `child_process.execFile` | Spawn a shell and execute an arbitrary file | [Docs](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) |
| `child_process.fork` | Fork a child process | [Docs](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options) |
| `child_process.spawn` | Spawn a new process | [Docs](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) |
| `child_process.execFileSync` | Spawn a shell and execute an arbitrary file | [Docs](https://nodejs.org/api/child_process.html#child_process_child_process_execfilesync_file_args_options) |
| `child_process.execSync` | Spawn a shell and execute an arbitrary command | [Docs](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options) |
| `child_process.spawnSync` | Spawn a new process | [Docs](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) |
| `cluster.disconnect` | Disconnect a worker from its parent process | [Docs](https://nodejs.org/api/cluster.html#workerdisconnect) |
| `cluster.fork` | Fork a new worker process | [Docs](https://nodejs.org/api/cluster.html#clusterforkenv) |
| `cluster.setupPrimary` | Change the default fork behavior of cluster.fork | [Docs](https://nodejs.org/api/cluster.html#clustersetupprimarysettings) |
| `cluster.setupMaster` | Change the default fork behavior of cluster.fork | [Docs](https://nodejs.org/api/cluster.html#clustersetupmastersettings) |
| `dgram.createSocket` | Create a datagram socket | [Docs](https://nodejs.org/api/dgram.html#dgram_dgram_createsocket_type_callback) |
| `dns.Resolver` | Create a DNS resolver | [Docs](https://nodejs.org/api/dns.html#dns_class_dns_resolver) |
| `dns.getServers` | Get the list of current DNS servers | [Docs](https://nodejs.org/api/dns.html#dns_dns_getservers) |
| `dns.lookup` | Resolve a host name into the first found A or AAAA record | [Docs](https://nodejs.org/api/dns.html#dns_dns_lookup_hostname_options_callback) |
| `dns.lookupService` | Resolve the given address and port into a host name and service | [Docs](https://nodejs.org/api/dns.html#dnslookupserviceaddress-port-callback) |
| `dns.resolve` | Resolve a host name into an array of records | [Docs](https://nodejs.org/api/dns.html#dnsresolvehostname-rrtype-callback) |
| `dns.resolve4` | Resolve a host name to an IPv4 address | [Docs](https://nodejs.org/api/dns.html#dnsresolve4hostname-options-callback) |
| `dns.resolve6` | Resolve a host name to an IPv6 address | [Docs](https://nodejs.org/api/dns.html#dnsresolve6hostname-options-callback) |
| `dns.resolveAny` | Resolve a host name to an array of records | [Docs](https://nodejs.org/api/dns.html#dnsresolveanyhostname-callback) |
| `dns.resolveCname` | Resolve a host name to an array of CNAME records | [Docs](https://nodejs.org/api/dns.html#dnsresolvecnamehostname-callback) |
| `dns.resolveCaa` | Resolve a host name to an array of CAA records | [Docs](https://nodejs.org/api/dns.html#dnsresolvecaahostname-callback) |
| `dns.resolveMx` | Resolve a host name to an array of MX records | [Docs](https://nodejs.org/api/dns.html#dnsresolvemxhostname-callback) |
| `dns.resolveNaptr` | Resolve a host name to an array of NAPTR records | [Docs](https://nodejs.org/api/dns.html#dnsresolvenaptrhostname-callback) |
| `dns.resolveNs` | Resolve a host name to an array of NS records | [Docs](https://nodejs.org/api/dns.html#dnsresolvenshostname-callback) |
| `dns.resolvePtr` | Resolve a host name to an array of PTR records | [Docs](https://nodejs.org/api/dns.html#dnsresolveptrhostname-callback) |
| `dns.resolveSoa` | Resolve a host name to an SOA record | [Docs](https://nodejs.org/api/dns.html#dnsresolvesoahostname-callback) |
| `dns.resolveSrv` | Resolve a host name to an array of SRV records | [Docs](https://nodejs.org/api/dns.html#dnsresolvesrvhostname-callback) |
| `dns.resolveTxt` | Resolve a host name to an array of TXT records | [Docs](https://nodejs.org/api/dns.html#dnsresolvetxthostname-callback) |
| `dns.reverse` | Perform a reverse lookup for the given address | [Docs](https://nodejs.org/api/dns.html#dnsreverseip-callback) |
| `dns.setDefaultResultOrder` | Set the default order for result records | [Docs](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) |
| `dns.setServers` | Set the list of DNS servers to be used | [Docs](https://nodejs.org/api/dns.html#dns_dns_setservers_servers) |
| `fetch.fetch` | Communicate with a web server | [Docs](https://nodejs.org/api/fetch/) |
| `eval.eval` | Run arbitrary JS code from a string | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) |
| `Function.Function` | Create a new function from an arbitrary string | [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) |
| `fs.access` | Test a user's permissions for a file or directory | [Docs](https://nodejs.org/api/fs.html#fsaccesspath-mode-callback) |
| `fs.appendFile` | Append to a file | [Docs](https://nodejs.org/api/fs.html#fsappendfilepath-data-options-callback) |
| `fs.chmod` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fschmodpath-mode-callback) |
| `fs.chown` | Change file ownership | [Docs](https://nodejs.org/api/fs.html#fschownpath-uid-gid-callback) |
| `fs.close` | Close a file descriptor | [Docs](https://nodejs.org/api/fs.html#fschownpath-uid-gid-callback) |
| `fs.copyFile` | Copy a file | [Docs](https://nodejs.org/api/fs.html#fscopyfilesrc-dest-mode-callback) |
| `fs.cp` | Copy a directory | [Docs](https://nodejs.org/api/fs.html#fscpsrc-dest-options-callback) |
| `fs.createReadStream` | Create a readable stream | [Docs](https://nodejs.org/api/fs.html#fscreatereadstreampath-options) |
| `fs.createWriteStream` | Create a writable stream | [Docs](https://nodejs.org/api/fs.html#fscreatewritestreampath-options) |
| `fs.exists` | Test whether or not a file exists | [Docs](https://nodejs.org/api/fs.html#fsexistspath-callback) |
| `fs.fchmod` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fsfchmodfd-mode-callback) |
| `fs.fchown` | Change file ownership | [Docs](https://nodejs.org/api/fs.html#fsfchownfd-uid-gid-callback) |
| `fs.fdatasync` | Force all currently queued I/O operations to completion | [Docs](https://nodejs.org/api/fs.html#fsfdatasyncfd-callback) |
| `fs.fstat` | Get file status | [Docs](https://nodejs.org/api/fs.html#fsfstatfd-options-callback) |
| `fs.fsync` | Request data to be flushed to the storage device | [Docs](https://nodejs.org/api/fs.html#fsfsyncfd-callback) |
| `fs.ftruncate` | Truncate a file to a specified length | [Docs](https://nodejs.org/api/fs.html#fsftruncatefd-len-callback) |
| `fs.futimes` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fsfutimesfd-atime-mtime-callback) |
| `fs.lchmod` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fslchmodpath-mode-callback) |
| `fs.lchown` | Change file ownership | [Docs](https://nodejs.org/api/fs.html#fslchownpath-uid-gid-callback) |
| `fs.lutimes` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fslutimespath-atime-mtime-callback) |
| `fs.link` | Create a new link | [Docs](https://nodejs.org/api/fs.html#fslinkexistingpath-newpath-callback) |
| `fs.lstat` | Get file status | [Docs](https://nodejs.org/api/fs.html#fslstatpath-options-callback) |
| `fs.mkdir` | Create a directory | [Docs](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback) |
| `fs.mkdtemp` | Create a unique temporary directory | [Docs](https://nodejs.org/api/fs.html#fsmkdtempprefix-options-callback) |
| `fs.open` | Open a file | [Docs](https://nodejs.org/api/fs.html#fsopenpath-flags-mode-callback) |
| `fs.opendir` | Open a directory | [Docs](https://nodejs.org/api/fs.html#fsopendirpath-options-callback) |
| `fs.read` | Read a file | [Docs](https://nodejs.org/api/fs.html#fsreadfd-buffer-offset-length-position-callback) |
| `fs.readdir` | Read a directory | [Docs](https://nodejs.org/api/fs.html#fsreaddirpath-options-callback) |
| `fs.readFile` | Read a file | [Docs](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback) |
| `fs.readlink` | Read a symbolic link | [Docs](https://nodejs.org/api/fs.html#fsreadlinkpath-options-callback) |
| `fs.readv` | Read from a file | [Docs](https://nodejs.org/api/fs.html#fsreadvfd-buffers-position-callback) |
| `fs.realpath` | Resolve a canonical path | [Docs](https://nodejs.org/api/fs.html#fsrealpathpath-options-callback) |
| `fs.rename` | Rename a file or directory | [Docs](https://nodejs.org/api/fs.html#fsrenameoldpath-newpath-callback) |
| `fs.rmdir` | Remove a directory | [Docs](https://nodejs.org/api/fs.html#fsrmdirpath-options-callback) |
| `fs.rm` | Remove a file | [Docs](https://nodejs.org/api/fs.html#fsrmpath-options-callback) |
| `fs.stat` | Get file status | [Docs](https://nodejs.org/api/fs.html#fsstatpath-options-callback) |
| `fs.symlink` | Create a symbolic link | [Docs](https://nodejs.org/api/fs.html#fssymlinktarget-path-type-callback) |
| `fs.truncate` | Truncate a file to a specified length | [Docs](https://nodejs.org/api/fs.html#fstruncatepath-len-callback) |
| `fs.unlink` | Delete a file | [Docs](https://nodejs.org/api/fs.html#fsunlinkpath-callback) |
| `fs.unwatchFile` | Stop watching a file for changes | [Docs](https://nodejs.org/api/fs.html#fsunwatchfilefilename-listener) |
| `fs.utimes` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fsutimespath-atime-mtime-callback) |
| `fs.watch` | Monitor a file for changes | [Docs](https://nodejs.org/api/fs.html#fswatchfilename-options-listener) |
| `fs.watchFile` | Monitor a file for changes | [Docs](https://nodejs.org/api/fs.html#fswatchfilefilename-options-listener) |
| `fs.write` | Write to a file | [Docs](https://nodejs.org/api/fs.html#fswritefd-buffer-offset-length-position-callback) |
| `fs.writeFile` | Write a file | [Docs](https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback) |
| `fs.writev` | Write to a file | [Docs](https://nodejs.org/api/fs.html#fswritevfd-buffers-position-callback) |
| `fs.accessSync` | Test a user's permissions for a file or directory | [Docs](https://nodejs.org/api/fs.html#fsaccesssyncpath-mode) |
| `fs.appendFileSync` | Append data to a file | [Docs](https://nodejs.org/api/fs.html#fsappendfilesyncpath-data-options) |
| `fs.chmodSync` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fschmodsyncpath-mode) |
| `fs.chownSync` | Change file owner | [Docs](https://nodejs.org/api/fs.html#fschownsyncpath-uid-gid) |
| `fs.closeSync` | Close a file | [Docs](https://nodejs.org/api/fs.html#fsclosesyncfd) |
| `fs.copyFileSync` | Copy a file | [Docs](https://nodejs.org/api/fs.html#fscopyfilesyncsrc-dest-mode) |
| `fs.cpSync` | Copy a directory | [Docs](https://nodejs.org/api/fs.html#fscpsyncsrc-dest-options) |
| `fs.existsSync` | Test whether a file exists | [Docs](https://nodejs.org/api/fs.html#fsexistssyncpath) |
| `fs.fchmodSync` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fsfchmodsyncfd-mode) |
| `fs.fchownSync` | Change file owner | [Docs](https://nodejs.org/api/fs.html#fsfchownsyncfd-uid-gid) |
| `fs.fdatasyncSync` | Force all currently queued I/O operations to completion | [Docs](https://nodejs.org/api/fs.html#fsfdatasyncsyncfd) |
| `fs.fstatSync` | Get file status | [Docs](https://nodejs.org/api/fs.html#fsfstatsyncfd-options) |
| `fs.fsyncSync` | Force all data to be flushed to the storage device | [Docs](https://nodejs.org/api/fs.html#fsfsyncsyncfd) |
| `fs.ftruncateSync` | Truncate a file to a specified length | [Docs](https://nodejs.org/api/fs.html#fsftruncatesyncfd-len) |
| `fs.futimesSync` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fsfutimessyncfd-atime-mtime) |
| `fs.lchmodSync` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fslchmodsyncpath-mode) |
| `fs.lchownSync` | Change file owner | [Docs](https://nodejs.org/api/fs.html#fslchownsyncpath-uid-gid) |
| `fs.lutimesSync` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fslutimessyncpath-atime-mtime) |
| `fs.linkSync` | Create a hard link | [Docs](https://nodejs.org/api/fs.html#fslinksyncexistingpath-newpath) |
| `fs.lstatSync` | Get file status | [Docs](https://nodejs.org/api/fs.html#fslstatsyncpath-options) |
| `fs.mkdirSync` | Create a directory | [Docs](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options) |
| `fs.mkdtempSync` | Create a temporary directory | [Docs](https://nodejs.org/api/fs.html#fsmkdtempsyncprefix-options) |
| `fs.openSync` | Open a file | [Docs](https://nodejs.org/api/fs.html#fsopensyncpath-flags-mode) |
| `fs.opendirSync` | Open a directory | [Docs](https://nodejs.org/api/fs.html#fsopendirsyncpath-options) |
| `fs.readSync` | Read a file | [Docs](https://nodejs.org/api/fs.html#fsreadsyncfd-buffer-offset-length-position) |
| `fs.readdirSync` | Read a directory | [Docs](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options) |
| `fs.readFileSync` | Read a file | [Docs](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options) |
| `fs.readlinkSync` | Read a symbolic link | [Docs](https://nodejs.org/api/fs.html#fsreadlinksyncpath-options) |
| `fs.readvSync` | Read from a file | [Docs](https://nodejs.org/api/fs.html#fsreadvsyncfd-buffers-position) |
| `fs.realpathSync` | Return canonical absolute pathname | [Docs](https://nodejs.org/api/fs.html#fsrealpathsyncpath-options) |
| `fs.renameSync` | Rename a file or directory | [Docs](https://nodejs.org/api/fs.html#fsrenamesyncoldpath-newpath) |
| `fs.rmdirSync` | Remove a directory | [Docs](https://nodejs.org/api/fs.html#fsrmdirsyncpath-options) |
| `fs.rmSync` | Remove a file | [Docs](https://nodejs.org/api/fs.html#fsrmsyncpath-options) |
| `fs.statSync` | Get file status | [Docs](https://nodejs.org/api/fs.html#fsstatsyncpath-options) |
| `fs.symlinkSync` | Create a symbolic link | [Docs](https://nodejs.org/api/fs.html#fssymlinksynctarget-path-type) |
| `fs.truncateSync` | Truncate a file to a specified length | [Docs](https://nodejs.org/api/fs.html#fstruncatesyncpath-len) |
| `fs.unlinkSync` | Delete a file | [Docs](https://nodejs.org/api/fs.html#fsunlinksyncpath) |
| `fs.utimesSync` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fsutimessyncpath-atime-mtime) |
| `fs.writeSync` | Write to a file | [Docs](https://nodejs.org/api/fs.html#fswritesyncfd-buffer-offset-length-position) |
| `fs.writeFileSync` | Write a file | [Docs](https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options) |
| `fs.writevSync` | Write to a file | [Docs](https://nodejs.org/api/fs.html#fswritevsyncfd-buffers-position) |
| `fs/promises.access` | Test a user's permissions for a file or directory | [Docs](https://nodejs.org/api/fs.html#fspromisesaccesspath-mode) |
| `fs/promises.appendFile` | Append data to a file | [Docs](https://nodejs.org/api/fs.html#fspromisesappendfilepath-data-options) |
| `fs/promises.chmod` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fspromiseschmodpath-mode) |
| `fs/promises.chown` | Change file owner | [Docs](https://nodejs.org/api/fs.html#fspromiseschownpath-uid-gid) |
| `fs/promises.copyFile` | Copy a file | [Docs](https://nodejs.org/api/fs.html#fspromisescopyfilesrc-dest-mode) |
| `fs/promises.cp` | Copy a file | [Docs](https://nodejs.org/api/fs.html#fspromisescpsrc-dest-options) |
| `fs/promises.lchmod` | Change file permissions | [Docs](https://nodejs.org/api/fs.html#fspromiseslchmodpath-mode) |
| `fs/promises.lchown` | Change file owner | [Docs](https://nodejs.org/api/fs.html#fspromiseslchownpath-uid-gid) |
| `fs/promises.lutimes` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fspromiseslutimespath-atime-mtime) |
| `fs/promises.link` | Create a hard link | [Docs](https://nodejs.org/api/fs.html#fspromiseslinkexistingpath-newpath) |
| `fs/promises.lstat` | Get file status | [Docs](https://nodejs.org/api/fs.html#fspromiseslstatpath-options) |
| `fs/promises.mkdir` | Create a directory | [Docs](https://nodejs.org/api/fs.html#fspromisesmkdirpath-options) |
| `fs/promises.mkdtemp` | Create a temporary directory | [Docs](https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options) |
| `fs/promises.open` | Open a file | [Docs](hhttps://nodejs.org/api/fs.html#fspromisesopenpath-flags-mode) |
| `fs/promises.opendir` | Open a directory | [Docs](https://nodejs.org/api/fs.html#fspromisesopendirpath-options) |
| `fs/promises.readdir` | Read a directory | [Docs](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options) |
| `fs/promises.readFile` | Read a file | [Docs](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options) |
| `fs/promises.readlink` | Read a symbolic link | [Docs](https://nodejs.org/api/fs.html#fspromisesreadlinkpath-options) |
| `fs/promises.realpath` | Return canonical absolute pathname | [Docs](https://nodejs.org/api/fs.html#fspromisesrealpathpath-options) |
| `fs/promises.rename` | Rename a file or directory | [Docs](https://nodejs.org/api/fs.html#fspromisesrenameoldpath-newpath) |
| `fs/promises.rmdir` | Remove a directory | [Docs](https://nodejs.org/api/fs.html#fspromisesrmdirpath-options) |
| `fs/promises.rm` | Remove a file | [Docs](https://nodejs.org/api/fs.html#fspromisesrmpath-options) |
| `fs/promises.stat` | Get file status | [Docs](https://nodejs.org/api/fs.html#fspromisesstatpath-options) |
| `fs/promises.symlink` | Create a symbolic link | [Docs](https://nodejs.org/api/fs.html#fspromisessymlinktarget-path-type) |
| `fs/promises.truncate` | Truncate a file to a specified length | [Docs](https://nodejs.org/api/fs.html#fspromisestruncatepath-len) |
| `fs/promises.unlink` | Delete a file | [Docs](https://nodejs.org/api/fs.html#fspromisesunlinkpath) |
| `fs/promises.utimes` | Change file timestamps | [Docs](https://nodejs.org/api/fs.html#fspromisesutimespath-atime-mtime) |
| `fs/promises.watch` | Watch for changes on a file | [Docs](https://nodejs.org/api/fs.html#fspromiseswatchfilename-options) |
| `fs/promises.writeFile` | Write data to a file | [Docs](https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options) |
| `http.Agent` | Manage HTTP connection persistence and reuse | [Docs](https://nodejs.org/api/http.html#class-httpagent) |
| `http.createServer` | Create a new HTTP server | [Docs](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener) |
| `http.get` | Send a GET request to a server | [Docs](https://nodejs.org/api/http.html#httpgetoptions-callback) |
| `http.request` | Send an HTTP request to a server | [Docs](https://nodejs.org/api/http.html#httprequestoptions-callback) |
| `http2.createServer` | Create a new HTTP/2 server | [Docs](https://nodejs.org/api/http2.html#http2createserveroptions-onrequesthandler) |
| `http2.createSecureServer` | Create a new secure HTTP/2 server | [Docs](https://nodejs.org/api/http2.html#http2createsecureserveroptions-onrequesthandler) |
| `http2.connect` | Establish a connection to a server | [Docs](https://nodejs.org/api/http2.html#http2connectauthority-options-listener) |
| `http2.getDefaultSettings` | Get the default settings for a HTTP/2 session | [Docs](https://nodejs.org/api/http2.html#http2getdefaultsettings) |
| `http2.getPackedSettings` | Get the current settings for a HTTP/2 session | [Docs](https://nodejs.org/api/http2.html#http2getpackedsettings) |
| `http2.getUnpackedSettings` | Get the current settings for a HTTP/2 session | [Docs](hhttps://nodejs.org/api/http2.html#http2getunpackedsettingsbuf) |
| `https.Agent` | Manage HTTPS connection persistence and reuse | [Docs](https://nodejs.org/api/https.html#class-httpsagent) |
| `https.createServer` | Create a new HTTPS server | [Docs](https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener) |
| `https.get` | Send a GET request to a server | [Docs](https://nodejs.org/api/https.html#httpsgetoptions-callback) |
| `https.request` | Send an HTTPS request to a server | [Docs](https://nodejs.org/api/https.html#httpsrequestoptions-callback) |
| `inspector.close` | Close a V8 inspector | [Docs](https://nodejs.org/api/inspector.html#inspectorclose) |
| `inspector.open` | Open a V8 inspector | [Docs](https://nodejs.org/api/inspector.html#inspectoropenport-host-wait) |
| `inspector.url` | Get the URL of the V8 inspector | [Docs](https://nodejs.org/api/inspector.html#inspectorurl) |
| `inspector.waitForDebugger` | Wait for the V8 debugger to connect | [Docs](https://nodejs.org/api/inspector.html#inspectorwaitfordebugger) |
| `inspector.Session` | Create a new V8 inspector session | [Docs](https://nodejs.org/api/inspector.html#class-inspectorsession) |
| `net.Server` | Create a new TCP server | [Docs](https://nodejs.org/api/net.html#class-netserver) |
| `net.Socket` | Create a new TCP socket | [Docs](https://nodejs.org/api/net.html#class-netsocket) |
| `net.connect` | Connect to a remote TCP server | [Docs](https://nodejs.org/api/net.html#netconnect) |
| `net.createConnection` | Connect to a remote TCP server | [Docs](https://nodejs.org/api/net.html#netcreateconnection) |
| `net.createServer` | Create a new TCP server | [Docs](https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener) |
| `os.arch` | Get the CPU architecture | [Docs](https://nodejs.org/api/os.html#osarch) |
| `os.cpus` | Get CPU information | [Docs](https://nodejs.org/api/os.html#oscpus) |
| `os.endianness` | Get the endianness of the CPU | [Docs](https://nodejs.org/api/os.html#osendianness) |
| `os.freemem` | Get the amount of free system memory | [Docs](https://nodejs.org/api/os.html#osfreemem) |
| `os.getPriority` | Get the scheduling priority for a process | [Docs](https://nodejs.org/api/os.html#osgetprioritypid) |
| `os.homedir` | Get the home directory path for the current user | [Docs](https://nodejs.org/api/os.html#oshomedir) |
| `os.hostname` | Get the hostname of the OS | [Docs](https://nodejs.org/api/os.html#oshostname) |
| `os.loadavg` | Get system load average information | [Docs](https://nodejs.org/api/os.html#osloadavg) |
| `os.networkInterfaces` | Get a list of network interfaces | [Docs](https://nodejs.org/api/os.html#osnetworkinterfaces) |
| `os.platform` | Get the operating system platform | [Docs](https://nodejs.org/api/os.html#osplatform) |
| `os.release` | Get the operating system release | [Docs](https://nodejs.org/api/os.html#osrelease) |
| `os.setPriority` | Set the scheduling priority for a process | [Docs](https://nodejs.org/api/os.html#ossetprioritypid-priority) |
| `os.tmpdir` | Get the path of a temporary directory | [Docs](https://nodejs.org/api/os.html#ostmpdir) |
| `os.totalmem` | Get the total amount of system memory | [Docs](https://nodejs.org/api/os.html#ostotalmem) |
| `os.type` | Get the operating system name | [Docs](https://nodejs.org/api/os.html#ostype) |
| `os.uptime` | Get the system uptime | [Docs](https://nodejs.org/api/os.html#osuptime) |
| `os.userInfo` | Get current user information | [Docs](https://nodejs.org/api/os.html#osuserinfooptions) |
| `os.version` | Get the kernel version | [Docs](https://nodejs.org/api/os.html#osversion) |
| `process.abort` | Exit the Node.js process immediately | [Docs](https://nodejs.org/api/process.html#processabort) |
| `process.chdir` | Change the current working directory | [Docs](https://nodejs.org/api/process.html#processchdirdirectory) |
| `process.cpuUsage` | Get current process CPU usage info | [Docs](https://nodejs.org/api/process.html#processcpuusagepreviousvalue) |
| `process.cwd` | Get the current working directory | [Docs](https://nodejs.org/api/process.html#processcwd) |
| `process.disconnect` | Disconnect child process from parent | [Docs](https://nodejs.org/api/process.html#processdisconnect) |
| `process.dlopen` | Load C++ addons | [Docs](https://nodejs.org/api/process.html#processdlopenmodule-filename-flags) |
| `process.emitWarning` | Emit a custom process warning | [Docs](https://nodejs.org/api/process.html#processemitwarningwarning-options) |
| `process.exit` | Exit the Node.js process | [Docs](https://nodejs.org/api/process.html#processexitcode) |
| `process.getActiveResourcesInfo` | Get a list of resources currently keeping the event loop alive | [Docs](https://nodejs.org/api/process.html#processgetactiveresourcesinfo) |
| `process.getegid` | Get the effective group id of the Node.js process | [Docs](https://nodejs.org/api/process.html#processgetegid) |
| `process.geteuid` | Get the effective numerical user id | [Docs](https://nodejs.org/api/process.html#processgeteuid) |
| `process.getgid` | Get the numerical group id of the process | [Docs](https://nodejs.org/api/process.html#processgetgid) |
| `process.getgroups` | Get the list of supplementary group ids | [Docs](https://nodejs.org/api/process.html#processgetgroups) |
| `process.getuid` | Get the numerical user id of the process | [Docs](https://nodejs.org/api/process.html#processgetuid) |
| `process.hasUncaughtExceptionCaptureCallback` | Find out if there is an uncaught exception callback set | [Docs](https://nodejs.org/api/process.html#processhasuncaughtexceptioncapturecallback) |
| `process.hrtime` | Get high resolution time | [Docs](https://nodejs.org/api/process.html#processhrtimetime) |
| `process.initgroups` | Initialize the group access list | [Docs](https://nodejs.org/api/process.html#processinitgroupsuser-extragroup) |
| `process.kill` | Kill a process | [Docs](https://nodejs.org/api/process.html#processkillpid-signal) |
| `process.memoryUsage` | Get memory usage information | [Docs](https://nodejs.org/api/process.html#processmemoryusage) |
| `process.resourceUsage` | Get resource usage information | [Docs](https://nodejs.org/api/process.html#processresourceusage) |
| `process.send` | Send a message to a process | [Docs](https://nodejs.org/api/process.html#processsendmessage-sendhandle-options-callback) |
| `process.setegid` | Set the effective group id of the process | [Docs](https://nodejs.org/api/process.html#processsetegidid) |
| `process.seteuid` | Set the effective user id of the process | [Docs](https://nodejs.org/api/process.html#processseteuidid) |
| `process.setgid` | Set the group id of the process | [Docs](https://nodejs.org/api/process.html#processsetgidid) |
| `process.setgroups` | Set the supplementary group ids of the process | [Docs](https://nodejs.org/api/process.html#processsetgroupsgroups) |
| `process.setuid` | Set the user id of the process | [Docs](https://nodejs.org/api/process.html#processsetuidid) |
| `process.setSourceMapsEnabled` | Enable/disable source maps | [Docs](https://nodejs.org/api/process.html#processsetsourcemapsenabledval) |
| `process.setUncaughtExceptionCaptureCallback` | Set a callback to run when there is an uncaught exception | [Docs](https://nodejs.org/api/process.html#processsetuncaughtexceptioncapturecallbackfn) |
| `process.umask` | Set the file mode creation mask | [Docs](https://nodejs.org/api/process.html#processumask) |
| `process.uptime` | Get the process uptime | [Docs](https://nodejs.org/api/process.html#processuptime) |
| `process.on` | Add a listener for a process event | [Docs](https://nodejs.org/api/process.html#process-events) |
| `timers.setImmediate` | Queue a function for execution | [Docs](https://nodejs.org/api/timers.html#setimmediatecallback-args) |
| `timers.setInterval` | Set a repeating timer to execute a function | [Docs](https://nodejs.org/api/timers.html#setintervalcallback-delay-args) |
| `timers.setTimeout` | Set a timer to execute a function | [Docs](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args) |
| `timers.clearImmediate` | Cancel a setImmediate callback | [Docs](https://nodejs.org/api/timers.html#clearimmediateimmediate) |
| `timers.clearInterval` | Cancel a setInterval callback | [Docs](https://nodejs.org/api/timers.html#clearintervaltimeout) |
| `timers.clearTimeout` | Cancel a setTimeout callback | [Docs](https://nodejs.org/api/timers.html#cleartimeouttimeout) |
| `timers/promises.setImmediate` | Queue a function for execution | [Docs](https://nodejs.org/api/timers.html#timerspromisessetimmediatevalue-options) |
| `timers/promises.setInterval` | Set a repeating timer to execute a function | [Docs](https://nodejs.org/api/timers.html#timerspromisessetintervaldelay-value-options) |
| `timers/promises.setTimeout` | Set a timer to execute a function | [Docs](https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options) |
| `tls.Server` | Create a new TLS server | [Docs](https://nodejs.org/api/tls.html#class-tlsserver) |
| `tls.TLSSocket` | Create a new TLS socket | [Docs](https://nodejs.org/api/tls.html#class-tlstlssocket) |
| `tls.checkServerIdentity` | Verify that a server certificate is valid for a given host | [Docs](https://nodejs.org/api/tls.html#tlscheckserveridentityhostname-cert) |
| `tls.connect` | Connect to a TLS server | [Docs](https://nodejs.org/api/tls.html#tlsconnectoptions-callback) |
| `tls.createSecureContext` | Create a new secure context | [Docs](https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions) |
| `tls.createSecurePair` | Create a new secure pair | [Docs](https://nodejs.org/api/tls.html#tlscreatesecurepaircontext-isserver-requestcert-rejectunauthorized-options) |
| `tls.createServer` | Create a new TLS server | [Docs](https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener) |
| `tls.getCiphers` | Get a list of supported TLS ciphers | [Docs](https://nodejs.org/api/tls.html#tlsgetciphers) |
| `trace_events.createTracing` | Centralize system tracing information | [Docs](https://nodejs.org/api/tracing.html#trace_eventscreatetracingoptions) |
| `trace_events.getEnabledCategories` | Get the enabled trace event categories | [Docs](https://nodejs.org/api/tracing.html#trace_eventsgetenabledcategories) |
| `v8.cachedDataVersionTag` | Get a version tag derived from the V8 version, command-line flags, and detected CPU features | [Docs](https://nodejs.org/api/v8.html#v8cacheddataversiontag) |
| `v8.getHeapCodeStatistics` | Get statistics about code and its metadata in the heap | [Docs](https://nodejs.org/api/v8.html#v8getheapcodestatistics) |
| `v8.getHeapSnapshot` | Generate a snapshot of the current V8 heap | [Docs](https://nodejs.org/api/v8.html#v8getheapsnapshot) |
| `v8.getHeapSpaceStatistics` | Get statistics about the V8 heap spaces | [Docs](https://nodejs.org/api/v8.html#v8getheapspacestatistics) |
| `v8.getHeapStatistics` | Get detailed V8 heap statistics | [Docs](https://nodejs.org/api/v8.html#v8getheapstatistics) |
| `v8.setFlagsFromString` | Programmatically set V8 command-line flags | [Docs](https://nodejs.org/api/v8.html#v8setflagsfromstringflags) |
| `v8.stopCoverage` | Stop collecting JavaScript code coverage collection | [Docs](https://nodejs.org/api/v8.html#v8stopcoverage) |
| `v8.takeCoverage` | Write code coverage data to disk | [Docs](https://nodejs.org/api/v8.html#v8takecoverage) |
| `v8.writeHeapSnapshot` | Write a heap snapshot to a file | [Docs](https://nodejs.org/api/v8.html#v8writeheapsnapshotfilename) |
| `v8.serialize` | Serialize value into a buffer | [Docs](https://nodejs.org/api/v8.html#v8serializevalue) |
| `v8.deserialize` | Deserialize value from a buffer | [Docs](https://nodejs.org/api/v8.html#v8deserializebuffer) |
| `vm.Script` | Precompile arbitrary code to execute later | [Docs](https://nodejs.org/api/vm.html#class-vmscript) |
| `vm.SourceTextModule` | Create a module defined from ECMAScript source text | [Docs](https://nodejs.org/api/vm.html#class-vmsourcetextmodule) |
| `vm.SyntheticModule` | Create a WebIDL synthetic module | [Docs](https://nodejs.org/api/vm.html#class-vmsyntheticmodule) |
| `vm.compileFunction` | Compile a JavaScript function | [Docs](https://nodejs.org/api/vm.html#vmcompilefunctioncode-params-options) |
| `vm.createContext` | Create a new execution context | [Docs](https://nodejs.org/api/vm.html#vmcreatecontextcontextobject-options) |
| `vm.isContext` | Check if the given object is an execution context | [Docs](https://nodejs.org/api/vm.html#vmiscontextobject) |
| `vm.measureMemory` | Measure V8 memory usage | [Docs](https://nodejs.org/api/vm.html#vmmeasurememoryoptions) |
| `vm.runInContext` | Run arbitrary code in a context | [Docs](https://nodejs.org/api/vm.html#vmrunincontextcode-contextifiedobject-options) |
| `vm.runInNewContext` | Run arbitrary code in a new context | [Docs](https://nodejs.org/api/vm.html#vmruninnewcontextcode-contextobject-options) |
| `vm.runInThisContext` | Run arbitrary code in the current context | [Docs](https://nodejs.org/api/vm.html#vmruninthiscontextcode-options) |
| `wasi.WASI` | Give WebAssembly apps access to the underlying OS | [Docs](https://nodejs.org/api/wasi.html#new-wasioptions) |
| `worker_threads.Worker` | Create a new independent JavaScript execution thread | [Docs](https://nodejs.org/api/worker_threads.html#class-worker) |
| `worker_threads.getEnvironmentData` | Get thread environment data | [Docs](https://nodejs.org/api/worker_threads.html#workergetenvironmentdatakey) |
| `worker_threads.markAsUntransferable` | Mark a buffer as untransferable between threads | [Docs](https://nodejs.org/api/worker_threads.html#workermarkasuntransferableobject) |
| `worker_threads.moveMessagePortToContext` | Move a message port to a different context | [Docs](https://nodejs.org/api/worker_threads.html#workermovemessageporttocontextport-contextifiedsandbox) |
| `worker_threads.receiveMessageOnPort` | Receive single a message on a port | [Docs](https://nodejs.org/api/worker_threads.html#workerreceivemessageonportport) |
| `worker_threads.setEnvironmentData` | Set thread environment data | [Docs](https://nodejs.org/api/worker_threads.html#workersetenvironmentdatakey-value) |

## Web
| Method | Description | Docs |
|---|---|---|
| `AudioContext.AudioContext` | Enable execution of audio processing or decoding. | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) |
| `BackgroundFetchManager.fetch` | Register URLs for background fetch | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/fetch) |
| `BackgroundFetchManager.get` | Get info on background fetch job | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/get) |
| `BackgroundFetchManager.getIds` | Return the IDs of all registered background fetches | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/BackgroundFetchManager/getIds) |
| `BackgroundTasks.requestIdleCallback` | Queue task to be executed in the background | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) |
| `BackgroundTasks.cancelIdleCallback` | Cancel a previously queued background task | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) |
| `Beacon.sendBeacon` | Send an asynchronous request that does not expect a response | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) |
| `Bluetooth.getAvailability` | Is the browser able to use Bluetooth | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/getAvailability) |
| `Bluetooth.getDevices` | Get a list of available Bluetooth devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/getDevices) |
| `Bluetooth.requestDevice` | Request a Bluetooth device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice) |
| `Clipboard.read` | Request arbitrary data from the clipboard | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read) |
| `Clipboard.readText` | Request text from the clipboard | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText) |
| `Clipboard.write` | Write arbitrary data to the clipboard | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write) |
| `Clipboard.writeText` | Write text to the clipboard | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) |
| `ContactsManager.select` | Retrieve contact information from user device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager/select) |
| `ContactsManager.getProperties` | List all available contact properties | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager/getProperties) |
| `ContentIndex.add` | Register offline enabled content with the browser | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/add) |
| `ContentIndex.delete` | Delete an offline enabled content | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/delete) |
| `ContentIndex.getAll` | Get all offline enabled content | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex/getAll) |
| `CookieStore.delete` | Delete a cookie | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/delete) |
| `CookieStore.get` | Get a cookie | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/get) |
| `CookieStore.getAll` | Get all cookies | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/getAll) |
| `CookieStore.set` | Set a cookie | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore/set) |
| `CredentialsContainer.create` | Create a new Credential instance | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create) |
| `CredentialsContainer.get` | Retrieve saved authentication credentials | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get) |
| `CredentialsContainer.preventSilentAccess` | Set if automatic log in is allowed | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/preventSilentAccess) |
| `CredentialsContainer.store` | Store user authentication credentials | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store) |
| `EventSource.EventSource` | Recieve events from a server, via a persistent connection | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) |
| `Fetch.fetch` | Communicate with a web server | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/fetch) |
| `FileReader.abort` | Abort reading file | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/abort) |
| `FileReader.readAsArrayBuffer` | Read file as ArrayBuffer | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer) |
| `FileReader.readAsBinaryString` | Read file as binary string | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString) |
| `FileReader.readAsDataURL` | Read file as data URL | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) |
| `FileReader.readAsText` | Read file as text | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText) |
| `FileReader.FileReader` | Read the contents of a user file | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) |
| `FileReaderSync.readAsArrayBuffer` | Read file as ArrayBuffer | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsArrayBuffer) |
| `FileReaderSync.readAsBinaryString` | Read file as binary string | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsBinaryString) |
| `FileReaderSync.readAsDataURL` | Read file as data URL | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsDataURL) |
| `FileReaderSync.readAsText` | Read file as text | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync/readAsText) |
| `FileReaderSync.FileReaderSync` | Read the contents of a user file | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileReaderSync) |
| `FileSystem.showOpenFilePicker` | Prompt user to allow reading a file from his system | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker) |
| `FileSystem.showSaveFilePicker` | Prompt user to allow saving a file to his system | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker) |
| `FileSystem.showDirectoryPicker` | Prompt user to allow reading a directory from his system | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/window/showDirectoryPicker) |
| `Gamepad.getGamepads` | Get a list of connected gamepads | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads) |
| `Geolocation.clearWatch` | Stop tracking user location | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch) |
| `Geolocation.getCurrentPosition` | Get user location | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) |
| `Geolocation.watchPosition` | Track user location | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) |
| `Battery.getBattery` | Get device battery information | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) |
| `HID.getDevices` | List connected Human Interface Devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/HID/getDevices) |
| `HID.requestDevice` | Connect to a Human Interface Device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/HID/requestDevice) |
| `History.back` | Go back in navigation history | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/History/back) |
| `History.forward` | Go forward in navigation history | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/History/forward) |
| `History.go` | Go to a specific point in the navigation history | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/History/go) |
| `History.pushState` | Add a new entry to the history stack | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) |
| `History.replaceState` | Replace the current entry in the history stack | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) |
| `IDBFactory.cmp` | Compare two database keys | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/cmp) |
| `IDBFactory.databases` | List all available databases | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/databases) |
| `IDBFactory.deleteDatabase` | Delete a database | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/deleteDatabase) |
| `IDBFactory.open` | Open a database | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open) |
| `ImageCapture.getPhotoCapabilities` | Get the capabilities of the camera | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/getPhotoCapabilities) |
| `ImageCapture.getPhotoSettings` | Get the settings of the camera | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/getPhotoSettings) |
| `ImageCapture.grabFrame` | Take a snapshot of the live video stream | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/grabFrame) |
| `ImageCapture.takePhoto` | Take a single exposure using the video capture device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture/takePhoto) |
| `ImageCapture.ImageCapture` | Enable the capture of images or photos from a camera | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture) |
| `MediaDevices.enumerateDevices` | List all connected media devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) |
| `MediaDevices.getDisplayMedia` | Capture the contents of a display or portion thereof | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) |
| `MediaDevices.getSupportedConstraints` | Get the supported media device constraints | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getSupportedConstraints) |
| `MediaDevices.getUserMedia` | Request access to user media devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) |
| `MediaDevices.selectAudioOutput` | Select an audio output device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/selectAudioOutput) |
| `MediaRecorder.MediaRecorder` | Record audio and video | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder) |
| `MediaStream.MediaStream` | A stream of media content | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) |
| `MessageChannel.postMessage` | Send cross-origin communication between windows | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) |
| `MessageChannel.MessageChannel` | A channel for passing messages between threads | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/MessageChannel) |
| `MIDI.requestMIDIAccess` | Request access to connected MIDI devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMIDIAccess) |
| `Notification.requestPermission` | Request permission to show notifications | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission) |
| `Notification.showNotification` | Show a browser notification | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification) |
| `Notification.getNotifications` | List received notifications | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications) |
| `Notification.Notification` | Create a user notification | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) |
| `PaymentRequest.PaymentRequest` | Create a payment request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/PaymentRequest) |
| `PerformanceObserver.PerformanceObserver` | Monitor the performance of the page | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver) |
| `PeriodicSyncManager.register` | Registers a periodic background sync request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/register) |
| `PeriodicSyncManager.unregister` | Unregisters a periodic background sync request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/unregister) |
| `PeriodicSyncManager.getTags` | List registered periodic sync requests | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicSyncManager/getTags) |
| `Permissions.query` | Get user permission status for a given API | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query) |
| `Permissions.revoke` | Revoke a user permission for a given API | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Permissions/revoke) |
| `PresentationRequest.start` | Start a presentation | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/start) |
| `PresentationRequest.reconnect` | Reconnect to a presentation | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/reconnect) |
| `PresentationRequest.getAvailability` | Get availability for starting presentations | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/getAvailability) |
| `PresentationRequest.PresentationRequest` | Create a presentation request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest/PresentationRequest) |
| `PushManager.getSubscription` | Get the current push subscription | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/getSubscription) |
| `PushManager.hasPermission` | Get push subscription permission state | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/hasPermission) |
| `PushManager.permissionState` | Get push subscription permission state | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/permissionState) |
| `PushManager.register` | Register a push subscription | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/register) |
| `PushManager.registrations` | List of registered push subscriptions | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/registrations) |
| `PushManager.subscribe` | Subscribe to a push subscription | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe) |
| `PushManager.unregister` | Unregister a push subscription | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/unregister) |
| `ReportingObserver.ReportingObserver` | Collect and access reports on various issues | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/ReportingObserver/ReportingObserver) |
| `Scheduler.postTask` | Create a new scheduled task | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask) |
| `Selection.getSelection` | Get the current webpage selection | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) |
| `Selection.getSelection` | Get the current webpage selection | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/getSelection) |
| `Sensor.AbsoluteOrientationSensor` | Absolute orientation sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor) |
| `Sensor.Accelerometer` | Accelerometer sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Accelerometer) |
| `Sensor.AmbientLightSensor` | Ambient light sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor) |
| `Sensor.GravitySensor` | Gravity sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/GravitySensor) |
| `Sensor.Gyroscope` | Gyroscope sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope) |
| `Sensor.LinearAccelerationSensor` | Linear acceleration sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/LinearAccelerationSensor) |
| `Sensor.Magnetometer` | Magnetometer sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Magnetometer) |
| `Sensor.RelativeOrientationSensor` | Relative orientation sensor | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/RelativeOrientationSensor) |
| `Share.share` | Share content to user-selected targets | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) |
| `Share.canShare` | Check if sharing is supported | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare) |
| `SpeechRecognition.abort` | Abort a speech recognition process | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/abort) |
| `SpeechRecognition.start` | Start a speech recognition process | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start) |
| `SpeechRecognition.stop` | Stop a speech recognition process | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/stop) |
| `SpeechRecognition.SpeechRecognition` | Use the speech recognition API | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/SpeechRecognition) |
| `SpeechRecognition.webkitSpeechRecognition` | Use the speech recognition API | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/webkitSpeechRecognition) |
| `SpeechSynthesis.cancel` | Cancel speech synthesis | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel) |
| `SpeechSynthesis.getVoices` | Get the list of available voices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices) |
| `SpeechSynthesis.pause` | Pause speech synthesis | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause) |
| `SpeechSynthesis.resume` | Resume speech synthesis | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/resume) |
| `SpeechSynthesis.speak` | Speak text | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak) |
| `Storage.getItem` | Return an item from local storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) |
| `Storage.setItem` | Save an item to local storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) |
| `Storage.removeItem` | Remove an item from local storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem) |
| `Storage.clear` | Clear local storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear) |
| `Storage.key` | Return the name of the nth key in local storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key) |
| `StorageAccess.requestStorageAccess` | Request access to first-party storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/requestStorageAccess) |
| `StorageAccess.hasStorageAccess` | Check if storage access is granted | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/hasStorageAccess) |
| `StorageManager.estimate` | Returns current storage space - used and available | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate) |
| `StorageManager.persist` | Request permission to use persistent storage | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist) |
| `StorageManager.persisted` | Check if persistent storage is granted | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persisted) |
| `SubtleCrypto.decrypt` | Decrypt data | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt) |
| `SubtleCrypto.deriveBits` | Derive bits from a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits) |
| `SubtleCrypto.deriveKey` | Derive a secret key from a master key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey) |
| `SubtleCrypto.digest` | Generate a crypto digest from data | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) |
| `SubtleCrypto.encrypt` | Encrypt data | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt) |
| `SubtleCrypto.exportKey` | Export a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey) |
| `SubtleCrypto.generateKey` | Generate a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey) |
| `SubtleCrypto.importKey` | Import a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey) |
| `SubtleCrypto.sign` | Sign data | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign) |
| `SubtleCrypto.unwrapKey` | Unwrap a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey) |
| `SubtleCrypto.verify` | Verify data | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify) |
| `SubtleCrypto.wrapKey` | Wrap a crypto key | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey) |
| `USB.getDevices` | Get a list of paired attached USB devices | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/USB/getDevices) |
| `USB.requestDevice` | Request access to a USB device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/USB/requestDevice) |
| `Vibration.vibrate` | Vibrate the device | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate) |
| `WakeLock.request` | Request a device wake lock | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/WakeLock/request) |
| `WebSocket.close` | Close a websocket connection | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close) |
| `WebSocket.send` | Send data on a websocket connection | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) |
| `WebSocket.WebSocket` | Create a new WebSocket object | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) |
| `Worker.postMessage` | Post a message to a web worker | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) |
| `Worker.terminate` | Terminate a web worker | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate) |
| `Worker.Worker` | Create a new web worker | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) |
| `SharedWorker.SharedWorker` | Create a new shared worker | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker/SharedWorker) |
| `XMLHttpRequest.abort` | Abort an web request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) |
| `XMLHttpRequest.getAllResponseHeaders` | Get all response headers | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders) |
| `XMLHttpRequest.getResponseHeader` | Get a response header | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader) |
| `XMLHttpRequest.open` | Open a web request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open) |
| `XMLHttpRequest.overrideMimeType` | Override the MIME type | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType) |
| `XMLHttpRequest.send` | Send data via a web request | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) |
| `XMLHttpRequest.setRequestHeader` | Set a request header | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader) |
| `XMLHttpRequest.XMLHttpRequest` | Communicate with a web server | [Docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest) |

## `bind` calls
For each method listed above, Sandworm also intercepts `bind` calls. To allow `bind` calls with more than one argument, the `bind.args` permission is required. [Read more](/README.md#bind-calls).