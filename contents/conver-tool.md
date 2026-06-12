-----
id: conver
home: /conver-tool/
title: "conver (tool)"
subtitle: "A command line tool to manage ConVer projects."
summary: "A simple command line tool that can be used to manage Convergent Versioning for your projects."
content-type: project
active: true
version: 100D
release-color: orange
license: MIT
sourcehut: conver-tool
changelog: true
-----

**conver** is a simple tool to manage projects implementing [Convergent Versioning](https://h3rald.com/conver).

### Usage

```
conver - Convergent Versioning Tool v100-D
(c) Copyright 2026 Fabio Cevasco

SYNTAX
  conver [<flag> | <command>]

  Where:
    <flag> can be one of the following:
      -v, --version: Print the version of the program.
      -h, --help: Print this help message.

    <command> can be one of the following:
      init: Initialize the project for ConVer usage.
      draft: Draft a new release by specifying score and metadata.
      status: Display the current Draft and Release versions, if any.
      release: Move the current draft version to release.
      semver: Generate SemVer version number based on history.
      history: Print the full version history of the project.
```

### The .conver directory and the VERSIONING.md file

By running `conver init` in the root folder of your project, the following files are created:

* ./conver &mdash; This directory contains some files used to internally manage Convergent Versioning via the _conver_ tool.
  * draft.txt &mdash; This file is used to store the current _draft_ version of the project you are working on.
  * history.txt &mdash; This file contains the full Convergent Versioning history (all ConVer releases) of your project.
  * legacy.txt &mdash; This file can be used to set the legacy Semantic Versioning release number, which will be used to calculate the equivalent SemVer number of your ConVer releases.
  * release.txt &mdash; This file is used to store the current _release_ version of the project you are working on.
  * semver.txr &mdash; This file will contain the equivalent SemVer release number generated via `conver semver`.
* VERSIONING.md &mdash; This file contains a standard notice informing users that this project follow Convergent Versioning.

### Commands

`conver` provides different sub commands, described in the following sections.

#### init

This project initializes your project to use ConVer by creating the `.conver` directory and the `VERSIONING.md` file.

#### draft

This command asks you some questions about the version of your project you are working on, to determine the correct ConVer number.

#### release

This command is used to _release_ an existing draft version of your project. It will write the ConVer version number to the `.conver/release.txt` file and append an entry to the `.conver/history.txt` file.

#### status

This command displays the current draft and the current release versions of your project, if any.

#### history

This comman prints the full details of each ConVer release of your project by processing the `.conver/history.txt` file.

#### semver

This command generates a SemVer-compatible version number for your project by processing the `.conver/history.txt` file, and stores it in `.conver.semver.txt`.

### Building conver

`conver` is written in C99 and has no external dependencies. To generate the `conver` or `conver.exe` executable:

* Clone the [conver-tool](https://git.sr.ht/~h3rald/conver-tool) repository.
* Run `make`
