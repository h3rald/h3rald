-----
id: create-git-tag
title: "Create and push a git tag"
subtitle: "Need to remember this for Sourcehut and similar..."
content-type: spell 
-----

So... [Github.com](https://github.com) has releases, and therefore typically tags get created automatically when you publish a new release. [Sourcehut](https://sr.ht) instead doesn't have all that fancy stuff so... how do you create (and push) a git tag?

Simple enough:

```bash
git tag my-tag master
git push origin tag my-tag
```

