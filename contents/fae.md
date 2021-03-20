-----
id: fae
github: fae
home: /fae/
title: "fae 🧚"
subtitle: "Find and Edit Utility"
summary: "A minuscule utility to find and edit text in files." 
content-type: project
active: true
version: 1.1.0
download: "https://github.com/h3rald/fae/releases/download/"
-----

### Usage


**fae** _pattern_  **[** _replacement_ _\-\-option1_ _\-\-option2_ ... **]**

Where:

* _pattern_ is a regular expression to search for.
* _replacement_ is an optional replacement stringv use \1, \2, etc. to reference captured groups).

#### Options

* **-a**, **\-\-apply** &mdash; Substitute all occurrences of *pattern* with *replacement* in all files without asking for confirmation.
* **-d**, **\-\-directory** &mdash; Search in the specified directory (default: .)
* **-f**, **\-\-filter** &mdash; Specify a regular expression to filter file paths.
* **-h**, **\-\-help** &mdash; Display this message.
* **-i**, **\-\-insensitive** &mdash; Case-insensitive matching.
* **-r**, **\-\-recursive** &mdash; Search directories recursively.
* **-s**, **\-\-silent** &mdash; Do not display matches.
* **-t**, **\-\-test** &mdash; Do not perform substitutions, just print results.
* **-v**, **\-\-version** &mdash; Display the program version.

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)

