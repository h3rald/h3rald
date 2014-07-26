-----
:permalink: hastyscribe
:title: Introducing HastyScribe
:subtitle: A simple command-line application to generate self-contained HTML documents
:type: article
:intro: |
  Did you ever have to write a document, but didn't want to (or couldn't) use MS Word or another WYSIWYG word processor? Yep, I agree: that's what "Markdown":https://daringfireball.net/projects/markdown/ is for. 

  Luckily, there are a lot of editors that support Markdown out there (I just installed "MacDown":http://macdown.uranusjr.com/ myself), and they work great, most of the time. Unfortunately though, they often:
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

Luckily, there are a lot of editors that support Markdown out there (I just installed [MacDown](http://macdown.uranusjr.com/) myself), and they work great, most of the time. Unfortunately though, they often:

  * Generate HTML _fragments_ instead of full documents
  * Don't include a proper stylesheet
  * Generate more than one file

The last one on the list in particular, is true for all of them: the stylesheet may be embedded in the document, but if you want to use images, they are managed as separate files; and the same thing happens if you want to use custom fonts. That's how HTML works, after all... right? Nope.

The [Data URI Scheme](http://en.wikipedia.org/wiki/Data_URI_scheme) can be used to include data inline inside web pages. This means that the **src** attribute of an **img** can be set to a data URI containing _the full image_ encoded in base64 instead of a traditional URL. It turns out that you can actually use data URIs even in CSS files, for example to embed web fonts instead of linking to the usual .woff, .ttf, .otf etc. &ndash; The only downside is that Internet Explorer 8 only supports data URIs for images, and only up to 32,768 characters. But luckily these limitations are no longer present in IE9+.

Anyhow, back to writing documents. Having read a bit about data URIs and after doing a few tests with all major browsers I thought of creating a program that would:

  * parse markdown and generate HTML code
  * automatically embed all images in the HTML files
  * include a _gorgeous_ stylesheet, with beautiful fonts and awesome icons.

That's how the concept behind [HastyScribe](/hastyscribe/) was born!

(Note: my wife actually came up with the name HastyScribe &ndash; I am totally useless when it come to naming programs)

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

Then I went shopping for a Markdown library. At the time there weren't any in Nimrod, so I went looking for one implemented in C that I could use with Nimrod. I chose [Discount](http://www.pell.portland.or.us/~orc/Code/discount/) because of the unique features it offered compared to the competition, especially two of them:

  * Pseudo-protocols, e.g.: `[some text](class:some-class)` &ndash; useful to add a class to an inline element)
  * Class blocks: <q>A blockquote with a first line of `> %class%` will become `<div class="class">` instead of a `<blockquote>`.</q>

I know. I _know_. Those things are an insult to the very phylosophy of Markdown! Err... no, actually. I think David Parsons did an amazing job of adding those functionalities in a way that actually works really well with the rest of Markdown syntax. And besides, no one else had an alternative for class blocks (which are necessary to format things like notes or sidebars).

#### Fonts! 

Next, I spent a considerable amount of time looking for suitable fonts. I wanted my utility to generate nice-looking documents, and therefore good fonts are essential.

In the end, my choices were:

* [FontAwesome][fa], the most obvious choice for all the icons.
* [Mr Bedfort](http://www.google.com/fonts/specimen/Mr+Bedfort), used as the base for the <span class="hastyscribe"></span> logo.
* [Source Sans Pro](https://store1.adobe.com/cfusion/store/html/index.cfm?event=displayFontPackage&code=1959) and [Source Code Pro](http://store1.adobe.com/cfusion/store/html/index.cfm?event=displayFontPackage&code=1960), for all standard text and source code.

[fa]:http://fortawesome.github.io/Font-Awesome/

### Developing HastyScribe

The first thing to do was to make Discount work with Nimrod. It turned out to be relatively easy to do, because the Nimrod compiler calls a C compiler (clang or gcc, typically) after compiling Nimrod code to C, and the compiler call can be configured to link static C libraries to produce a single executable file. Just what I wanted.

#### Compiling Discount

So, compiling Discount (with all the options I needed to handle all the extra Markdown extensions) consists in running configure & make:

`./configure.sh &ndash;with-tabstops=2 &ndash;with-dl=both &ndash;with-id-anchor &ndash;with-github-tags &ndash;with-fenced-code &ndash;enable-all-features`

`make`

Easy peasy on my Mac (and I suspect on Linux too), on Windows as usual I ran into a couple of issues, but nothing huge. First of all you need [MinGW](http://www.mingw.org/), and in particular gcc and make. You can probably compile Discount with something else, but I felt more comfortable with MinGW anyway.

The one thing I had to fix after running configure was on line 8 of mkdio.h &ndash; I had to change the following line:

<pre><code class="c">typedef @DWORD@ mkd_flag_t;</code></pre>

<pre><code class="c">typedef unsigned long DWORD;
typedef DWORD mkd_flag_t;</code></pre>

There's probably a better way to go about this, but it did the trick and I got my **libmarkdown.a** both on Windows and then on Mac. I do have a Ubuntu machine at home but I hardly use it nowadays (I am normally happy with just my [Raspberry Pi](http://www.raspberrypi.org/) running Arch Linux ARM &ndash; but Nimrod doesn't run on ARM as far as I know).

#### markdown.nim

Next, I needed to be able to access Discount API to:

 * compile Markdown code into an HTML fragment
 * generate a Table of Contents automatically
 * parse the Pandoc-style document headers (title, author, date) supported by Discount

 So I armed myself with [c2nim](https://github.com/h3rald/hastyscribe/blob/master/hastyscribe.nim) a handy little utility that can be used to convert C code into Nimrod. In practice, it is very handy for converting simple things like .h files, so I tried it on **markdown.h**.

 Didn't work in a totally automatic way, but it got me far enough that I could handle fixing the remaining bits, mostly consisting in name clashes due to Nimrod's rather unusual case-and-underscore-unsensitiveness and in a few pragmas to add here and there (`{.push importc, cdecl.}` at the start, for example).

I also added two high level `md` functions that basically can generate an HTML document with or without document headers. Here's one of them:

    proc md*(s: string, f = 0, data: var TMDMetadata): string =
      var flags = uint32(f)
      # Check if metadata is present
      var lns = s.splitLines
      var valid_metadata = false
      var offset = 0
      if (lns[0][0] == '%') and (lns[1][0] == '%') and (lns[2][0] == '%'):
        valid_metadata = true
      else:
        valid_metadata = false
        if lns[0][0] == '%':
          offset = 2
          if lns[1][0] == '%':
            offset = 3
      var str = cstring(lns[offset..lns.len-1].join("\n"))
      var mmiot = mkd_string(str, cint(str.len-1), flags)
      if valid_metadata:
        data.title = $mkd_doc_title(mmiot)
        data.author = $mkd_doc_author(mmiot)
        data.date = $mkd_doc_date(mmiot)
      discard mkd_compile(mmiot, flags)
      if (int(flags) and MKD_DOTOC) == MKD_DOTOC:
        var toc = allocCStringArray([""])
        discard $mkd_toc(mmiot, toc)
        try:
          data.toc = cstringArrayToSeq(toc)[0]
        except:
          data.toc = ""
      var res = allocCStringArray([""])
      discard mkd_document(mmiot, res)
      result = cstringArrayToSeq(res)[0]
      mkd_cleanup(mmiot)
      return

Anyhow, I managed to create a working [markdown.nim](https://github.com/h3rald/hastyscribe/blob/master/markdown.nim) that can be used as any other Nimrod library (provided that libmarkdown.a is available at compilation time).

#### hastyscribe.nim

Writing the code for HastyScribe itself wasn't too hard (Discount does all the heavy-lifting, let's be honest). 

At the beginning of [hastyscribe.nim](https://github.com/h3rald/hastyscribe/blob/master/hastyscribe.nim) you'll find a few `slurp`s &ndash; that yummy Nimrod proc is what's needed to physically embed all the assets in the executable, and that's why HastyScribe does not need any stylesheets or fonts lying around.

For the implementation of the snippet functionality and for converting fonts and images into base64 to create the data URIs I used Nimrod's [pegs](http://nimrod-lang.org/pegs.html) module. I chose this module simply because the [regular expression](http://nimrod-lang.org/re.html) module is an _impure_ (as in "not completely Nimrod code") module and requires PCRE as a dynamic library and... well, yes, it's the same self-contained obsession thing again, you guessed right.

Anyhow, the pegs module did a great job with the snippet and image tag parsing. I didn't really even try to integrate this extra parsing within the Markdown code parsing done by Discount, and... well OK, I currently do two separate parsing passes: one before parsing Markdown, to parse snippets, which can therefore contain Markdown code, and another one after the Markdown code has been converted to HTML, to replace standard image (relative) URLs with data URIs (no, I don't auto-download and convert remotely-hosted images... not yet anyway, so patches are welcome!).

#### The stylesheet!

Honestly, the Nimrod coding part wasn't the longest part of the development phase. If you look at the code stats on Github for the [HastyScribe](https://github.com/h3rald/hastyscribe) repository, it breaks down to the following:

  * Shell: 0.2%
  * Nimrod: 17.1%
  * CSS: 82.7%

Yep. Most of the code is CSS ([LESS](http://lesscss.org/) actually), and it did take a while to get it right. I used [normalize.css](http://necolas.github.io/normalize.css/) to start with, and I used part of the [FontAwesome][fa] LESS sources as well for the icon classes. The rest is all mine &ndash; but I did look for inspiration in GitHub's own stylesheet for the layout of notes and sidebars.

I am happy enough with the result, but of course patches are more than welcome. 

Oh yes, and if you are looking for a cross-platform app to compile your LESS stylesheet and merge them automatically, try [Koala](http://koala-app.com/), it's a nice application that can combine and minify both CSS and Javascript, it's cross-platform (written in Ruby I believe), open source, fun and easy to use, and works very well.

### Conclusion 

And this is how HastyScribe was born. I have been using it for a few months (the development version) and I spent a lot of time perfecting it, adding features, and improving the stylesheet. 

It is something I needed myself desperately because I always wanted something able to create pretty documents out of Markdown files and that I could use both at work (on Windows) and at home (on OSX). I believe it fills a very specific niche and it will *not* therefore replace your Markdown editor/compiler any time soon &ndash; but if you are in a hurry and don't have time to spent hours creating a stylesheet that works for your needs, maybe this can help.

An example document? Sure, here's the official [HastyScribe User Guide](/hastyscribe/HastyScribe_UserGuide.htm) (and here's the corresponding [source file](https://raw.githubusercontent.com/h3rald/hastyscribe/master/doc/HastyScribe_UserGuide.md)).

If you're interested in giving HastyScribe a try, head over to the [project page](/hastyscribe/) and grab it. The pre-compiled binaries are only for Windows and Mac, but I think Linux/BSD/\*nix enthusiasts won't have any trouble compiling Discount and HastyScribe from source anyway!













