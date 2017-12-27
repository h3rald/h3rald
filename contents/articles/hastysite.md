-----
title: "Building yet another static site generator"
subtitle: "Sometimes the best tool for the job should be your own tool"
content-type: article
timestamp: 1514365455 
-----

It has been *over TWO years* since my [last article](/introducing-litestore/) on this site. I have been pretty busy with work and all and well... same old, same old. 

It's not that I didn't have time to write articles, it's a mixture of different things:

* I've been neglecting this site, in favor of other projects.
* this site was running an old version of the [Nanoc](https://nanoc.ws/) static site generator.
* ...that in turn was running on an old version of Ruby.
* ...and I am not really using Ruby anymore nowadays.

I've always been fascinated by the [IndieWeb](https://indieweb.org/) as a bold response to being subjugated by the proprietary web of Facebook, Google, Twitter et al. I am not a social user and I've never been one: I just can't wrap my head around the concept of essentially giving *my own creations* (content, in this case) to a corporation for free, without proper credit. 

I've owned my own web site since 2004, and I am a proud believer of essentially all the [IndieWeb Principles](https://indieweb.org/Principles). They make logical sense to me; in particular the one concerning [selfdogfooding](https://indieweb.org/selfdogfooding) ---a horrible term for a very noble cause.

So I decided to ditch Nanoc. There's nothing inherently wrong with it, and it is also an open source project, but I really wanted to build my own tool to publish content on the web.

<hr />

### TL;DR

I ended up creating [HastySite](https://hastysite.h3rald.com), a self-contained static site generator written in [Nim](https://nim-lang.org) that leverages on [HastyScribe](https://h3rald.com/hastyscribe) for markdown processing, on [Moustachu](https://github.com/fenekku/moustachu) for mustache templates, and on the [min](https://min-lang.org) programming language for pretty much everything else.


### Choosing a technology stack

I started programming with Turbo Pascal, then C, C++, Java, then I learnt PHP, then moved on to Ruby in the golden years of Ruby on Rails, meanwhile got briefly acquainted with Lisp, Scheme, Haskell, a bunch of esoteric programming languages like Io (see [this article](/articles/10-programming-languages/) for more). 

More recently, I started using Javascript (the *new* Javascript reborn in the 2010s, and more specifically its [good parts](http://shop.oreilly.com/product/9780596517748.do)) both in the browser and on the server, even at work. 

I believe that Javascript is a very powerful and expressive language, but it has its shortcomings ---both in terms of the language itself and its ecosystem. More specifically, I cannot believe we now consider *normal* juggling thousands of third-party NPM packages to build almost anything using today's Javascript. People are [getting more and more pissed off](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/) about this, and maybe someday the whole NPM ecosystem will implode in itself... But this is another story. 

Let's just say that I discarded Javascript for this endeavor, not because unsuitable for the task (there are dozens of pretty decent static site generators written in Javascript already), but because I wanted to build something simpler to manage, in terms of dependencies and... number of files.

That's why I chose [Nim](https://nim-lang.org). I have been using Nim on-and-off in my pet projects for years now: it is a very productive language, and it produces small, fast-as-C, self-contained executable files for many different platforms.

### Functionality

So what are the key features a static site generator must have?

At the very least, the following:

- Generate HTML files from a lightweight markup language.
- Provide a way to manage content templates (and partial templates) for things like headers, footers, and so on.
- Provide a way to store page metadata, and ideally to build custom logic based on it.
- Providing an efficient way to manage assets, i.e. typically just copy them to the output folder.
- Provide ways to customize paths and content/asset routing.

This is the bare minimum. Then you may also want support for CSS preprocessors, themes, JavaScript minification, content reuse and more.

#### Markdown Processing

When it comes to picking a lightweight markup language, Markdown is a solid choice. It is readable and it comes in many flavors that provide just about anything you need to write an article or blog post. 

A while back I created [HastyScribe](https://h3rald.com/hastyscribe), a fast Markdown processor based on [Discount](http://www.pell.portland.or.us/~orc/Code/discount/). It may not be the most standard flavor of Markdown, but it is one of the most feature-rich. Besides standard Markdown features and what is already supported by Discount, HastyScribe also provides support for:

- Content snippets
- Transclusion of other Markdown files
- Simple substitution macros
- Custom fields 

Those features provide a very high degree of content reuse; not everyone needs them, but they are very useful for certain types of web sites and when authoring technical reference documentation.

HastyScribe is also written in Nim, which makes it ideal for this project.

### Mustache Template Engine

Like with lightweight markup languages, there are tons of different template engines out there. [Mustache](http://mustache.github.io) is one of the oldest logic-less template engines, often emulated and improved upon. There are several implementations of Mustache in different languages, and luckily there's also one for Nim: [Moustachu](https://github.com/fenekku/moustachu).

Moustachu supports the following key basic features that are essential for the management of static web sites:

{{mustache => http://mustache.github.io/mustache.5.html}}

* [Variables]({{mustache}}#Variables) -- Essentially placeholders for text, wrapped in double curly braces.
* [Sections]({{mustache}}#Sections) -- Used for managing blocks of conditional text as well as lists of items.
* [Partials]({{mustache}}#Partials) -- Used to render a mustache template within another mustache template (and inheriting its context). This is essential to support proper layout management with reusable portions of code such as headers, footers, and so on.

#### Rules and Custom Scripts

Although logic-less templates are great for keeping things simple and making you focus on content and layout, they are not enough to create a whole site. You'd always need something to drive the generation flow, collect and expose (meta)data, copy and process files. 

I briefly considered the possibility of providing a big fat YAML or JSON file to configure every single aspect of a site and its generation process, from its name to the way content is processed, and routing. Luckily, I soon realized that this approach would not be enough if this new static site generator were meant to become *extensible* rather than just configurable, so I started looking into DSLs and small scripting languages to embed in the main Nim program -- Nim, being a compiled language, cannot be used for this purpose.

I could have picked something like [duktape](http://duktape.org) and be done with it, but in the interests of *selfdogfooding* I decided to use my own. While working on this project, I was also implementing a new, minimalist [concatenative](https://en.wikipedia.org/wiki/Concatenative_programming_language) programming language called [min](httos://min-lang.org).

Now, min is written in Nim (pun intended), and provides the bare minimum to qualify as a systems programming language: work with files, environment variables, execute external processes etc. Being concatenative and also functional, it seemed a good candidate to be used as the backbone for the building pipeline of a static site generator, while also providing a high-level way to extend the program.

### Introducing _HastySite_

After a few months of experimenting and tinkering with the above-mentioned technologies, I released [HastySite](https://hastysite.h3rald.com), a fully-functional static site generator built around the HastyScribe markdown processor.

HastySite is a single, self-contained executable file available for all major platforms that allows you create a brand new static site or blog in a matter of _seconds_ -- if you choose to stick with the defaults and not customize anything, that is. Otherwise... you can go through the documentation on the site (also available as a standalone, printable [HTML file](https://www.h3rald.com/hastysite/HastySite_UserGuide.htm)), learn how everything works, and customize/extend whatever you want, from the CSS styles to use to the way you are copying files to the output folder (which can of course be something different than _output_).

If you just want to play with it, just download the executable and run **hastysite init**. This is actually the only command provided by HastySite that _cannot_ be customized (where customized in this case means _rewritten from scratch_), simply because it creates the default web site structure.

This command will also dump some CSS files and fonts in your asset folder, just enough to create a web site as ugly as HastySite's ---the idea is of course that you remove those and place your own there. Similarly, you will also have some default templates and some commands you can use to create content and build the site ---you'll probably want to keep those, or maybe just change them just a little bit at least until you become comfortable with the min language.

So, to sum up, with HastySite you get:

* Enhanced Markdown support for all your content, powered by [HastyScribe](https://h3rald.com/hastyscribe).
* Mustache templates support.
* A bare-bones but fully-functional responsive site theme based on HastyScribe's stylesheet.
* Default scripts to build and clean your site, as well as creating pages and blog posts.
* Support for arbitrary metadata processing in content files, so that you can implement your own custom logic to process content.
* Support for [customizing and extending](https://hastysite.h3rald.com/customization/) the way the program works almost in any way, using the [min](https://min-lang.org) programming language.
* Very fast and optimized (write a file in output only if it is new or modified) content processing.

...and of course it's 100% open source, MIT-licensed software.

### Conclusion

There are an awful lot [static site generators](https://www.staticgen.com) out there, implemented in almost any programming language and offering varying degrees of customizability. I decided to build my own because over the years I never found any that was both _minimal_ (as in simple, self-contained, and without a ton of dependencies) and _highly extensible_. Plus, I really wanted to reuse what I already implemented in HastyScribe: a powerful markdown processor with support for content-reuse features like snippets and macros.

HastySite may never become as popular as [Jekyll](https://jekyllrb.com) or [Nanoc](https://nanoc.ws), but at least it is something that fits my needs _perfectly_, which is what matters the most right now. At present, I use HastyScribe to power the following web sites:

* <https://h3rald.com>
* <https://hastysite.h3rald.com>
* <https://min-lang.org>

If you want to build something similar, or if you ---like me--- didn't find a static site generator that fitted your needs, you should definitely give HastySite a try!

