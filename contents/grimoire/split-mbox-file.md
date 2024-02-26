-----
id: split-mbox-file
title: "Split a .mbox file into chunks"
subtitle: "Apparently, Apple Mail insists on copying the entire .mbox file contents into RAM when importing..."
content-type: spell 
-----

The MBOX format is essentially a textual format for exporting emails as single files. As a result, if you try to export several years of emails, these files can get big pretty quickly.

While this may not be a problem, some email clients such as Apple Mail insist on doing stupid things like loading (very inefficiently, too) the entire contents of the file into RAM when importing it, which will likely cause your MacBook to scream that you are out of application memory.

To avoid this, you can use this nifty script to tidily split your .mbox file into chunks of 1GB each (adjust as needed):

```awk
BEGIN{chunk=0;filesize=0;}
    /^From /{
    if(filesize>=1000000000){#file size per chunk in byte
        close("chunk_" chunk ".txt");
        filesize=0;
        chunk++;
    }
  }
  {filesize+=length()}
  {print > ("chunk_" chunk ".txt")}
```

Credits: [StackOverflow](https://stackoverflow.com/questions/28110536/how-to-split-an-mbox-file-into-n-mb-big-chunks-using-the-terminal)


