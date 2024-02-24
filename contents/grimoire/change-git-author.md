-----
id: change-git-author
title: "Change the author of git commits"
subtitle: "How to rewrite git history to fix author names and emails"
content-type: spell 
-----

A simple bash script to change the author of existing git commits, by searching for a specific email address.

```bash
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="ENTER OLD EMAIL HERE"
CORRECT_NAME="ENTER NAME HERE"
CORRECT_EMAIL="ENTER EMAIL HERE"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
