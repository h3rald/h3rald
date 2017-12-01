-----
title: "Building my own static site generator"
subtitle: "Why using your own product really matters"
draft: true
content-type: article
timestamp: 1508087990
-----

It has been *over TWO years* since my [last article](/introducing-litestore/) on this site. I have been pretty busy with work and all and well... same old, same old. 

It's not that I didn't have time to write articles, it's a mixture of different things:

* I've been neglecting this site, in favor of other projects.
* this site was running an old version of the [nanoc](https://nanoc.ws/) static site generator.
* ...that in turn was running on an old version of Ruby.
* ...and I am not really using Ruby anymore nowadays.

I've always been fascinated by the [IndieWeb](https://indieweb.org/) as a bold response to being subjugated by the proprietary web of Facebook, Google, Twitter et al. I am not a social user and I've never been one: I just can't wrap my head around the concept of essentially giving *my own creations* (content, in this case) to a corporation and to the whole world for free, without proper credit. 

I've owned my own web site since 2004, and I am a proud believer of essentially all the [IndieWeb Principles](https://indieweb.org/Principles), simply because they make logical sense to me, and in particular the one concerning [selfdogfooding](https://indieweb.org/selfdogfooding) — a horrible term for a very noble cause.

So I decided to ditch nanoc — although there's nothing inherently wrong with it, and it is also an open source project — and build my own tools to publish content on the web.

<hr />

### Choosing a technology stack

I started programming with Turbo Pascal, then C, C++, Java, then I learnt PHP, then moved on to Ruby in the golden years of Ruby on Rails, meanwhile got briefly acquainted with Lisp, Scheme, Haskell, a bunch of esoteric programming languages like Io (see [this article](/articles/10-programming-languages/) for more). 

More recently, I started using Javascript (the *new* Javascript reborn in the 2010s, and more specifically its [good parts](http://shop.oreilly.com/product/9780596517748.do)) both in the browser and on the server, even at work. 

I personally do believe that Javascript is a very powerful and expressive language, but it has its shortcomings -- both in terms of the language itself and its ecosystem. More specifically, I cannot believe we now consider *normal* juggling thousands of third-party NPM packages to build almost anything using today's Javascript. People are [getting more and more pissed off](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/) about this, and maybe someday the whole NPM ecosystem will implode in itself... But this is another story really. 

Let's just say that I immediately discarded Javascript for this endeavor, not because unsuitable for the task (there are dozens of pretty decent Javascript static site generators already), but because I wanted to build something simpler to manage, in terms of dependencies and well... number of files.

That's why I chose [Nim](https://nim-lang.org). I have been using Nim on-and-off in my pet projects for years now, and it is a very productive language. And above all, it produces small, fast-as-C, and self-contained executable files for many different platforms.

### Functionality

So what are the key features a static site generator must have?

At the very least, the following:

- Generate HTML files from a lightweight markup language.
- Provide a way to manage content templates (and partial templates) for things like headers, footers, and so on.
- Provide a way to store page metadata, and ideally to build custom logic based on it.
- Providing an efficient way to manage assets, i.e. typically just copy them to the output folder.
- Provide ways to customize paths and content/asset routing.

This is the bare minimum. Then you could also want support for CSS preprocessors, themes, JavaScript minification, content reuse and more.

#### Markdown Processing

When it comes to picking a lightweight markup language, Markdown is a solid choice. It is readable and it comes in many flavors that provide just about anything you’d need to write an article. 

A while back I created [HastyScribe](https://h3rald.com/hastyscribe), a fast Markdown processor based on Discount. It may not be the most standard flavor of Markdown, but it is probably one of the most feature-rich — besides standard Markdown features and what is already supported by Discount, HastyScribe also provides support for:

- Content snippets
- Transclusion of other Markdown files
- Simple substitution macros
- Custom fields 

Those features essentially provide a very high degree of content reuse; not everyone needs them, but they are very useful for certain kinds of web sites and when authoring technical reference documentation.

HastyScribe is also written in Nim, which makes it ideal for this project.

### Mustache Template Engine

Like with lightweight markup languages, there are tons of different template engines out there. Some can be used together with code, Other are logic-less... Mustache is one of the oldest logic-less template engine, often emulated and improved upon.
