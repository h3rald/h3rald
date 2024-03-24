-----
id: create-symlink
title: "Create a symbolic link"
subtitle: "Because I never remember if the source file comes first or second..."
content-type: spell 
-----

The existing file you want to link to comes first, and the new file that links to it comes second.

Oh, and don't forget `-s`.

```bash
ln -s <source_file> <link>
```
