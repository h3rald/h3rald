-----
id: scp-file-transfers
title: "Transfer files using SCP"
subtitle: "The fastest way to copy files to/from a server"
content-type: spell 
-----

Sometimes I just want to copy a file to my VPS, run a program to process it in some way, and copy it back to my local machine. With _scp_ that's as easy as...

```bash
# Copy to server
scp <path/to/local/file> <user>@<server>:</path/to/remote/directory>

# Copy from server
scp <user>@<server>:</path/to/remote/directory> <path/to/local/directory>
```
