-----
id: hastysite
github: hastysite
home: /hastysite/
docs: /hastysite/HastySite_UserGuide.htm
title: "HastySite"
site: "https://hastysite.h3rald.com"
subtitle: "A small but powerful static site generator"
summary: "A self-contained static site generator featuring markdown support, mustache templates, and a powerful min-powered rule and script engine."
content-type: project
active: true
version: 1.1.0
download: "https://github.com/h3rald/hastysite/releases/download/"
-----

*HastySite* is a static-site generator written in [Nim](https://nim-lang.org). Unlike most static site generators, it is only comprised of a single file -- the **hastysite** executable. 

It provides:

* Built-in rich markdown support via [HastyScribe](https://h3rald.com/hastyscribe).
* Built-in [mustache](https://mustache.github.io/) support for page templates.
* Limited support for standard [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).
* Fully configurable content and asset processing pipeline, using the [min](https://min-lang.org) programming language.
* Custom script definition, using the [min](https://min-lang.org) programming language.
* Default stylesheet and fonts from [HastyScribe](https://h3rald.com/hastyscribe).
* Default scripts and rules to get started quickly.
* All packed in a single executable file, with no dependencies, available for the most common desktop platforms.

HastySite powers this site and <https://min-lang.org>, as well as HastySite's own [web site](https://hastysite.h3rald.com).

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Linux (x86)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x86.zip)
* [Linux (ARM)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_arm.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)
