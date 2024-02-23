-----
id: pls
github: pls
home: /pls/
title: "pls"
subtitle: "A polite but determined task runner"
summary: "A simple but powerful task runner that lets you define your own commands by editing a YAML configuration file."
content-type: project
active: true
ci: true
download: "https://github.com/h3rald/pls/releases/download/"
version: 1.0.0
docs: /pls/Pls_UserGuide.htm
-----

_pls_ is a simple, general-purpose task runner that aims at making common tasks easier to manage and execute. It was inspired by some of the functionalities provided by the [nifty](/nifty) package manager, only without the package manager part.

### Main Features

_pls_ can be used to:

- Define a catalog of _actions_ to perform on _things_, which will result in _commands_ to be executed, each with the same simple syntax.
- Define a catalog of _things_, representing virtually anything that can be the object of a _shell command_ or referred within other _things_.
- Define a set of _dependencies_ among _commands_, in the form of _commands_.
- Manage aliases to commonly-used strings (_properties_) to use within other sections of the configuration.

### Hello, World!

Here's minimal but quite comprehensive example of how everything works with _pls_. Given the following <var>pls.yml</var> file (placed in <var>$HOME</var> or in <var>%USERPROFILE%</var> on Windows):

```
things:
  home:
    value: /home/h3rald
  bin:
    value: {{home.value}}/bin
  self:
    value: {{home.value}}/dev/pls
    exe: pls
    config: {{home.value}}/pls.yml
    nimble: true
actions:
  config:
    config: vim {\{config}}
  build:
    nimble+value: cd {\{value}} && nimble build -d:release
  publish:
    exe+value: cd {\{value}} && $(cp "{\{exe}}" "{{bin.value}}") &
deps:
  publish self:
    - build self
```

It will be possible to run the following _command_ to build the _pls_ program itself and copy it to the [/home/h3rald/bin](class:dir):

```
pls publish self
```

Similarly, to edit the <var>pls.yml</var> file using Vim, it will be sufficient to run:

```
pls config self
```

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)
