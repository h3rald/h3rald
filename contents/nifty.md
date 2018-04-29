-----
id: nifty
github: nifty
home: /nifty/
docs: /nifty/Nifty_UserGuide.htm
title: "nifty"
subtitle: "A decentralized (pseudo) package manager and script runner"
summary: "A self-contained command-line program that can be used as a bare bones package manager and as a versatile script runner."
content-type: project
active: true
version: 1.0.0
download: "https://github.com/h3rald/nifty/releases/download/"
-----

{{n -> *nifty*}} is a simple, self-contained program that can be used as a bare-bones, decentralized (pseudo) package manager and script runner. 

It was born out of the necessity of building {{nim -> [Nim](https://nim-lang.org)}} programs with several dependencies like [min](https://h3rald.com/min) or [hastysite](https://h3rald.com/hastysite) on machines with low memory (i.e. a VPS running x86 Linux with 500MB of RAM). The main problem was that on such low-end machine it [may not even be possible](https://github.com/nim-lang/nimble/issues/278) to compile the [Nimble](https://github.com/nim-lang/nimble) package manager, because apparently it requires more RAM to compile than Nim itself.

Nimble offers a lot of features that *proper* package managers do, like dependency management, package creation and publishing, support for semantic versioning, etc. while {{n}} does not. Hence {{n}} is only a _pseudo-_package manager and script runner, but it could be useful in certain situations nonetheless. 

### Main features

In a nutshell, {{n}} is a program that executes user-defined scripts on a set of folders or files within a user-define package folder. It doesn't do (almost) anything by itself, it just relies on other programs and utilities that are typically already available on your system like [git](https://git-scm.com) and [curl](https://curl.haxx.se) to do all the heavy-lifting.

#### Run side-by-side your existing package manager

{{n}} doesn't claim to replace your existing package manager, therefore it tries not to get too much in the way of your existing project structure. All it needs to work resides in a humble {{nj -> `nifty.json`}} file that is used to:

* keep track of what packages are part of the current project
* provide the full definition of all the available commands and how to execute them on specific packages

The folder where packages will be stored is by default set to a [packages](class:kwd) subfolder within the current project directory, but even this can be configured in the {{nj}} file. 

#### Define your own packages

For {{n}}, a package can be a folder containing files, or even a single files. Through the {{nj}} file, you can define:

* The *source* of a package (typically a git repository or event just a URL).
* Whether the package supports *git*, *curl* or any other command that will be used to retrieve its contents.

#### Define your own commands 

You can use your {{nj}} to teach {{n}} new tricks, i.e. how to execute new commands on packages. Your commands look like... well, CLI commands, except that you can use placeholders like `{\{name}\}` and `{\{src}\}` in them for your package name, source, etc.

#### Run on many different platforms and regardless of the type of project

{{n}} is a self-contained executable program written in {{nim -> [Nim](https://nim-lang.org)}} and runs on all platforms where Nim compiles. Also, unlike other package managers that are typically used within the context of one specific programming language (like [NPM](https://www.npmjs.com) for Javascript or [RubyGems](https://rubygems.org) for Ruby), {{n}} can be used in virtually any project, regardless of the programming language used.

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Linux (x86)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x86.zip)
* [Linux (ARM)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_arm.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)
