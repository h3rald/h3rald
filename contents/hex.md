-----
id: hex
github: hex
home: /hex/
site: "https://hex.2c.fyi"
title: "hex"
subtitle: "A tiny, mininalist, slightly-esoteric, concatenative programming language"
summary: "hex aims to be a little programming language that is simple to learn and fun to use."
content-type: project
active: true
ci: true
version: 0.7.0
download: "https://github.com/h3rald/hex/releases/download/"
-----

_hex_ is a concatenative programming language heavily inspired by [min](/min) and [mn](/mn), but even more minimalist. 

It is implemented in a single C file, and provides:

- support for 32bit integers, but written only in hexadecimal format (hence the name), strings, quotations (lists) and symbols.
- the possibility to define your own symbols, but they will always be global (no lexical scoping).
- an interactive REPL.
- an integrated manual/cheat sheet.
- basic error handling and a stack trace
- 64 native symbols to manage control flow, arithmetical operations, comparison, Boolean logic, operations on strings and quotations, bitwise operations, I/O, File I/O, and shell command execution.

Despite its quirks, _hex_ aims to bring more people into the world of concatenative programming. The language web site includes a short tutorial, a simple specification of the language, and even a WASM-powered playground with an actual hex REPL to play with.


### Downloads

* [macOS (x86_64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macos_x86_64.zip)
* [macOS (ARM64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macos_arn64.zip)
* [Linux (x86_64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x86_64.zip)
* [Windows (x86_64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x86_64.zip)
* [αcτµαlly pδrταblε εxεcµταblε]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_ape.zip)
* [WebAssembly]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_wasm.zip)
