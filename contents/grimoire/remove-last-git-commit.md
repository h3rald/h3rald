-----
id: remove-last-git-commit
title: "Remove your last git commit"
subtitle: "Because some time you mess up but notice one second too late"
content-type: spell 
-----

Sometimes you get so much into the flow that you accidentally commit stuff too early, and typically notice right after committing.

Undoing the last git commit is easy enough, thankfully. If you didn't push already, just run

```bash
git reset HEAD^
```

If you did push to your remote repository, but hopefully no one else pulled already, you can run the following command after the previous one:

```bash
git push origin +HEAD
```

...which will _rewrite history_, but sometimes that's OK.

Credits: StackOverflow [#1](https://stackoverflow.com/questions/37420642/how-to-undo-the-last-commit-in-git), [#2](https://stackoverflow.com/questions/8225125/remove-last-commit-from-remote-git-repository)

