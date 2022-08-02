# Overview

Sandworm-JS is a malware detection tool for npm packages. Rather than relying on CVE advisories, 
Sandworm watches lower level APIs like the Node VM, browser APIs like DOM manipulation, fetch, etc and issues
warnings when a library unexpectedly accesses these APIs.

While this won't protect against all classes of vulnerabilities, it assures that your project is safe from hand crafted,
zero-day vulnerabilities that leave your data open to attack until a CVE is issued.
