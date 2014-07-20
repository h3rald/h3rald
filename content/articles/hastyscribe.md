-----
:permalink: hastyscribe
:title: Introducing HastyScribe
:subtitle: A simple command-line application to generate self-contained HTML documents
:type: article
:intro: |
  Did you ever have to write a document, but didn't want to (or couldn't) use MS Word or another WYSIWYG word processor? Yep, I agree: that's what "Markdown":https://daringfireball.net/projects/markdown/ is for. 

  Luckily, there are a lot of editors that support markdown out there (I just installed "MacDown":http://macdown.uranusjr.com/ myself), and they work great, most of the time. Unfortunately though, they often:
  * Generate HTML _fragments_ instead of full documents
  * Don't include a proper stylesheet
  * Generate more than one file

  The last one on the list in particular, is true for all of them: the stylesheet may be embedded in the document, but if you want to use images, they are managed as separate files; and the same thing happens if you want to use custom fonts. That's how HTML works, after all... right? Nope.
  
:tags:
- writing
- hastyscribe
- opensource
:date: 2014-07-20 19:31:32.000000000 +01:00
-----

Did you ever have to write a document, but didn't want to (or couldn't) use MS Word or another WYSIWYG word processor? Yep, I agree: that's what [Markdown](https://daringfireball.net/projects/markdown/) is for. 

Luckily, there are a lot of editors that support markdown out there (I just installed [MacDown](http://macdown.uranusjr.com/) myself), and they work great, most of the time. Unfortunately though, they often:

  * Generate HTML _fragments_ instead of full documents
  * Don't include a proper stylesheet
  * Generate more than one file

The last one on the list in particular, is true for all of them: the stylesheet may be embedded in the document, but if you want to use images, they are managed as separate files; and the same thing happens if you want to use custom fonts. That's how HTML works, after all... right? Nope.

The [Data URI Scheme](http://en.wikipedia.org/wiki/Data_URI_scheme) can be used to include data inline inside web pages. This means that the **src** attribute of an **img** can be set to a data URI containing _the full image_ encoded in base64 instead of a traditional URL. It turns out that you can actually use data URIs even in CSS files, for example to embed web fonts instead of linking to the usual .woff, .ttf, .otf etc. -- The only downside is that Internet Explorer 8 only supports data URIs for images, and only up to 32,768 characters. But luckily these limitations are no longer present in IE9+.

Anyhow, back to writing documents. Having read a bit about data URIs and after doing a few tests with all major browsers I thought of creating a program that would:

  * parse markdown and generate HTML code
  * automatically embed all images in the HTML files
  * include a _gorgeous_ stylesheet, with beautiful fonts and awesome icons.

### The Ingredients

The first I decided was _not_ to create a GUI for this program. I wanted a command-line utility, and I wanted it to be also self-contained and cross-platform. I am a big fan of [Fossil](http://www.fossil-scm.org/index.html/doc/tip/www/index.wiki) and [SQLite](http://www.sqlite.org/), and I wanted my utility to be tiny, have no dependencies, and run on both my Mac and my Windows computers (and on Linux of course, why not!).

#### Nimrod Programming Language

So I picked a programming language suitable to the task. The winner was [Nimrod](http://nimrod-lang.org/), because:

  * It is very elegant and very expressive, like a high-level programming language
  * It generates C code that can be compiled on many platforms
  * It produces very small executables
  * It can work with existing C libraries
  * My C is more than a bit rusty, but yes, someone else could have used C for this
  * I really, really wanted to try building something with Nimrod

#### Discount Markdown Library

Then I went shopping for a markdown library. At the time there weren't any in Nimrod, so I went looking for one implemented in C that I could use with Nimrod. I chose [Discount](http://www.pell.portland.or.us/~orc/Code/discount/) because of the unique features it offered compared to the competition, especially two of them:

  * Pseudo-protocols, e.g.: `[some text](class:some-class)` -- useful to add a class to an inline element)
  * Class blocks: <q>A blockquote with a first line of `> %class%` will become `<div class="class">` instead of a `<blockquote>`.</q>

I know. I _know_. Those things are an insult to the very phylosophy of markdown! Err... no, actually. I think David Parsons did an amazing job of adding those functionalities in a way that actually works really well with the rest of Markdown syntax. And besides, no one else had an alternative for class blocks (which are necessary to format things like notes or sidebars).

#### Fonts! 

Next, I spent a considerable amount of time looking for suitable fonts. I wanted my utility to generate nice-looking documents, and therefore good fonts are essential.

My choices were:

* The ...awesome [FontAwesome][fa] font, used for all the icons.
* The beautiful Mr Bedfort font, used as the base for the <span class="hastyscribe"></span> logo.
* The neat [Source Sans Pro](https://store1.adobe.com/cfusion/store/html/index.cfm?event=displayFontPackage&code=1959) and [Source Code Pro](http://store1.adobe.com/cfusion/store/html/index.cfm?event=displayFontPackage&code=1960) font, used for all standard text.

[fa]:http://fortawesome.github.io/Font-Awesome/

### Developing HastyScribe







