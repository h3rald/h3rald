-----
id: nimhttpd
github: nimhttpd
home: /nimhttpd/
title: "NimHTTPd"
subtitle: "A tiny static file web server."
summary: "A tiny, self-contained program able to serve files within a directory via HTTP."
content-type: project
active: true
ci: true
version: 1.3.0
download: "https://github.com/h3rald/nimhttpd/releases/download/"
-----
_NimHHTPd_ is a minimal web server that can be used to serve static files.

### Usage

**nimhttpd** **[** **-p:**_port_ **-t:**_title_ **-a:**_address_ **]** **[** _directory_ **]**

Where:

* _directory_ is the directory to serve (default: current directory).
* _port_ is the port to listen to (default: 1337). If the specified port is
  unavailable, the number will be incremented until an available port is found.
* _address_ is the address to bind to (default: 0.0.0.0).
* _title_ is the title to use when listing the contents of a directory.

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)
