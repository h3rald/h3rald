-----
id: hastysite
github: hastysite
home: /hastysite/
title: "HastySite"
subtitle: "A small but powerful static site generator"
summary: "A self-contained static site generator featuring markdown support, mustache templates, and a powerful min-powered rule and script engine."
content-type: project
active: true
version: 0.1.0
download: "https://github.com/h3rald/hastysite/releases/download/"
-----

*HastySite* is a static-site generator written in [Nim](https://nim-lang.org). Unlike most static site generators, it is only comprised of a single file -- the **hastysite** executable. 

It provides:

* A powerful and extensible engine that allows the creation of custom [min](/min/) scripts and rules to drive the generator main flows.
* A feature-rich markdown compiler, powered by [HastyScribe](/hastyscribe/).
* A simple mustache template engine, powered by [moustachu](https://github.com/fenekku/moustachu).

HastySite powers this site and <https://min-lang.org>. Currently there is no public documentation for this project. If you want to learn how HastySite works, try using the command line help (`hastysite -h`) and have a look at the source code of this web site, in particular the `rules.min` and `scripts` folder.
