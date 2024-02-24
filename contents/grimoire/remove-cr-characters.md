-----
id: remove-cr-characters
title: "Remove carriage return characters"
subtitle: "These pesky ^M characters can be seen when using Vim every so often"
content-type: spell 
-----

Vim will add these if you created a file on Windows, and you try to open it on a *nix machine. Apparently you can [avoid this entirely](https://vim.fandom.com/wiki/File_format) with some extra configuration, but if it happens, just ente the following command:

```vim
:s/^M$//
```

(press `CTRL+V` and `CTRL+M` to enter the `^M` thingie)
