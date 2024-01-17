-----
id: mn
github: mn
home: /mn/
title: "mn"
subtitle: "A truly minimal concatenative programming language"
summary: "A tiny, very minimalistic programming language inspired by min."
content-type: project
active: true
ci: true
download: "https://github.com/h3rald/mn/releases/download/"
version: 0.4.0
docs: /mn/Mn_DeveloperGuide.htm
-----

mn is a concatenative, fully-homoiconic, functional, interpreted programming language. 

This basically means that:

* It is based on a somewhat obscure and slightly unintuitive programming paradigm, think of [Forth](http://www.forth.org/), [Factor](http://factorcode.org/) and [Joy](http://www.kevinalbrecht.com/code/joy-mirror/) but with parentheses for an extra [Lisp](https://common-lisp.net/)y flavor.
* Programs written in mn are actually written using *quotations*, i.e. lists.
* It comes with map, filter, find, and loads of other functional goodies.
* It is probably slower than the average production-ready programming language.

mn is [min](https://min-lang.org)'s little brother. When I started implementing min, I wanted to create a small but practical programming language you could use for shell scripting and perform common tasks. As more feature requests piled in, I noticed it slowly became more and more comprehensive and _batteries-included_: I slowly swapped small, less-unknown and somewhat quirky libraries used for regular expressions, compression etc. with more complete and well-known ones, added HTTPS support (and OpenSSL), improved runtime checks when creating symbols, enhanced the type system, and so on. While min can now be used on its own to create quite complex programs, it became less minimal than originally intended.

I tried to add compilation variants to reduce the modules to include but that made it more difficult to maintain and still included complex constructs like dictionaries and the full type system, so one day I decided to... fork it! And that's how mn was born.

Is mn the *successor* of min? No! As I said, it is min's little brother, and it has its own (somewhat more minimalist) life. If you want to create a quick script to glue some shell commands together, then mn is definitely the fastest way to do so. If you want to use the concatenative paradigm to create more complex applications, then min comes with a much bigger toolbox.

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)
