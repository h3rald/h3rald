-----
title: "Choosing the Right Blogging Platform"
content-type: article
subtitle: "Or why I am still going to use Nanoc for the foreseeable future"
timestamp: 1398607426
tags: "writing|internet|webdevelopment"
-----
  Every so often I wonder whether I should ditch my current blogging platform and try something new and shiny that just came out. Luckily, normally I come back to the same conclusion: I don't need to change anything, I just need to find the time and the will to write about something.
  
  This time is no different, but I thought I'd write a roundup of platforms, services, and tools that you can use for blogging or managing your personal sites. Note that this roundup is by no means exhaustive (like most roundups) -- it's just a quick overview of the pros and cons of a few systems that I've been researching on lately. Maybe it will be useful to someone.

### TL;DR

  * Don't care about having "your own platform" but just want to get published somewhere? &rarr; [Medium][medium]
  * Do you want a full-fledged blog and the possibility to extend it? &rarr; [WordPress][wp]
  * Do you want to blog with markdown and Dropbox? &rarr; [Scrivaner][wp]
  * Do you want something simple and hassle-free but also suitably geeky and hackable?
    * ...in Ruby? &rarr; [Nanoc][nanoc] (but I am very partial to Nanoc, so probably I guess [Middleman][middleman] is awesome too)
    * ...in Python? &rarr; [Pelican][pelican]
    * ...in NodeJS? &rarr; [Metalsmith][metalsmith]

### Evaluation Criteria

Here's the list of features I am typically looking for in a blogging platform:

 * It must be sufficiently mature and stable, OR extremely simple to use and hack
 * It must not lock me in forever. Hosted is OK, as long as I don't feel my content is trapped in any way. The platform must at least provide a way to export content, and preferably a way to import fairly heterogenous content into it.
 * I like experimenting with multiple markup languages (that's just me I guess) -- so support for multiple types of content sources (Markdown, Textile, plain HTML, etc.) is a plus.
 * It must be extensible in some way, and allow me to change the look and feel
 * A nice and shiny web editor and an IOs app is a plus, although not mandatory


### Blogging Engines and Services

These are third-party sites offering a (free) way to create an manage your own blog, complete with comments, draft management, and all the bells and whistles (well, most of). All of them offer a *hosted* option, and a few of them give users the possibility to download the software and run it on your own server.


#### [WordPress][wp]

WordPress is the de-facto blogging platform. It is the blogging plaform a lot of people end up with because at the end of the day it does the job pretty well. It is also the blogging platform a lot of people are trying to replace with something else because they find it too bloated, heavyweight or complex. 

If you want a solid blogging platform, go for it -- you can have your blog hosted via [WordPress.com](https://wordpress.com/) or download it from [WordPress.org][wp] and run it on your own service.

Pros &amp; Cons:

 * &#x2714; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2718; Does not require server-side code to work
 * &#x2718; Does not require a database to work
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2714; Provides an WYSIWYG editor and an administration area
 * &#x2714; Supports one or more IOs/Android apps for authoring content

#### [Tumblr][tumblr]

If you want something more lightweight than WordPress and you don't care about having your content hosted on someone else's platform, Tumblr could be a good fit for you. Unlike similar platforms, it allows you to completely customize the look and feel of your site (if you are sufficiently proficient with HTML and CSS, obviously), but of course it cannot be used for something other than blogging... or you cannot extend it in any way. 

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a -- hosted]
 * &#x2714; Does not require a database to work [n/a -- hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2714; Supports one or more IOs/Android apps for authoring content

#### [Medium][medium]

One of the most popular *next generation* blogging platform. Medium aims empower and encourage authors to write high-quality content and publish it on... well, yes, Medium.com. Unlike all the other services and software mentioned in this article, this is the only one that does not offer (and apparently has no plans to offer) the possibility to claim your own space via a custom domain or simiular.  

I was *extremely tempted* to try out Medium (and I did in fact, but very briefly) because of its lean and powerful web editor and because of the sense of consistency that it conveys, but I decided to stay away, at least for now. [Marco Arment][marco-platform] summarizes the problem with Medium very well:

> Treat places like Medium the way you’d treat writing for someone else’s magazine, for free. It serves the same purpose: your writing gets to appear in a semi-upscale setting and you might temporarily get more readers than you would elsewhere, but you’re giving up ownership and a lot of control to get that.

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2718; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a -- hosted]
 * &#x2714; Does not require a database to work [n/a -- hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content [but they are planning to add support for authoring to their existing app]

#### [Svbtle][svbtle]

Svbtle started as a blogging platform restricted to a restricted circle of *elite* bloggers. Medium didn't exist back then, so maybe some of you looked at those Svbtle blogs with a little bit of envy at the time. 

The good news is that Svbtle is now open for all, and even *you* can now be part of the game. While this was a good move on many fronts, it makes this platform less of a special thing: the magic is over. That being said, I seriously considered switching to Svbtle (or at least creating a new Svbtle blog) especially because -- unlike Medium -- it allows and encourages users to use their own domain, while still not allowing custom look and feel... but it makes sense for that they're trying to do.

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a -- hosted]
 * &#x2714; Does not require a database to work [n/a -- hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content [No app, but their mobile site works pretty well]

#### [Ghost][ghost]

The much-touted, midly-overhyped, [NodeJS][nodejs]-powered WordPress killer. Although not quite finished yet (release 0.4 at the time of writing) Ghost is a very promising next-generation blogging platform. 

In this period I am experimenting a lot with NodeJS, so this looked appealing... but in the end I didn't want to go down the route of having to host a non-static site for H3RALD.com.

Pros &amp; Cons:

 * &#x2714; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2718; Does not require server-side code to work
 * &#x2718; Does not require a database to work
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content 

### Blogging Tools Powered by Other Services

These are lightweight blogging services that *piggy-back* other services like [Dropbox][dropbox] or [Evernote][evernote]. Typically more limited in functionality, these services are however worth a shot if you want a simple way to blog and you already use one of the required services. Keep in mind that if you choose this route you're committing to not one, but TWO different third-party services for your blogging needs.

#### [Calepin][calepin] (Dropbox)

If I remember correctly this one was the very first Dropbox-powered blogging platform. The idea is simple: use [Dropbox][dropbox] to store your content, and publish it using a separate service (which must have sufficient privileges to access the necessary dropbox files). 

Although Calepin's creator originally [announced](https://twitter.com/calepinapp/statuses/192336999720550401) the shutdown of the service back in 2012 ([open sourcing](https://github.com/jokull/calepin) the original source code -- thanks!), Calepin seems to be alive and well now.

All you need to do is write your blog posts in markdown within a specific folder of your Dropbox, and Calepin will do the rest. Compared to its main competitors (see below), Calepin is very minimalist by nature (you cannot customize the look and feel of your site, for example) but it still has its own appeal, mainly because it is extremely simple to use (as in *no configuration whatsoever*).

Pros &amp; Cons:

 * &#x2714; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2718; Does not require server-side code to work [if you choose to host your own]
 * &#x2714; Does not require a database to work
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2718; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content [Although you can use any Dropbox-enabled markdown editor app with it]

#### [Skrivr][skrivr] (Dropbox)

Similar to Calepin, but adds a bit more features (and a bit more complexity to the process), namely support for custom themes, with its own templating engine. Currently invite only (but I got an invite after a while). 

Personally, I feel that this service is somewhat in the middle between Calepin and Scriptogram (see below) -- If I had to choose, I'd go for one of the other two.

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a: Hosted]
 * &#x2714; Does not require a database to work [n/a: Hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2714; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content [Although you can use any Dropbox-enabled markdown editor app with it]

#### [Scriptogram][scriptogram] (Dropbox)

The high-end platform within this category. Like Skrivr, Scriptogram offers support for more customizations for your Dropbox-powered blog, but it looks a bit more polished and user-friendly.

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a: Hosted]
 * &#x2714; Does not require a database to work [n/a: Hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2714; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content [Although you can use any Dropbox-enabled markdown editor app with it]

#### [Postachio][postachio] (Evernote)

Unlike the previosly-mentioned services, Postachio does not relies on Dropbox as its data source, but it uses [Evernote][evernote] instead. Pretty neat, and similar to Scriptogram or Skrivr feature-wise (theme support, templates with custom tags, etc.). The main drawback? You need an Evernote account to use it -- and if I was going to use Evernote for blogging as well, I'd definitely choose to upgrade to a premium account. 

Not happening for now, but good if you live in an Evernote-centric ecosystem already (maybe you use Evernote as your main todo list as well, besides using it for all your note-taking needs). 

Pros &amp; Cons:

 * &#x2718; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work [n/a: Hosted]
 * &#x2714; Does not require a database to work [n/a: Hosted]
 * &#x2718; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2714; Can be easily customized without using addons or themes
 * &#x2718; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2714; Supports one or more IOs/Android apps for authoring content [the Evernote app...]

### Static Site Generators

Static site generators allows you to manage a blog or web site relatively effortlessly while not relying on a third-party service. This blog is [powered by][h3rald-nanoc] one of them: [nanoc][nanoc]. 

The basic idea behind every static site generator is simple: manage all your content in flat-files (normally using a lightweight markup language like markdown) and then use a script (in Ruby, Python, NodeJS, or many others...) to *compile them* into a static web site, relying on third-party services for all the interactive bits, if any (most notably comments, via [Disqus][disqus]). 

According to [StaticSiteGenerators.net][ssg], there are 240 of them, so obviously I'm not going to cover them all here -- I'll limit the roundup to the most popular ones and/or those I am experienced with.

To save myself some copying and pasting, the Pros &amp; Cons of *all* the static site generators (using the same list that I have been using to compare other services) is the following:

 * &#x2714; Can be installed on your own server
 * &#x2714; Can be used with your own domain
 * &#x2714; Does not require server-side code to work 
 * &#x2714; Does not require a database to work 
 * &#x2714; Provides support for multiple lightweight markup languages (Markdown, Textiles, etc.)
 * &#x2714; Can be easily customized without using addons or themes
 * &#x2714; Supports interoperability with other platforms (import/export/convert content to other formats)
 * &#x2718; Supports one or more IOs/Android apps for authoring content 


#### [Jekyll][jekyll]

Apparently, Jekyll is *the most popular* static site generator by... number of stars on its Github repo. Which isn't really fair because Jekyll powers Github pages and has been heavily marketed by its creators and supporters as the easiest way to set yourself free from Wordpress or a similar *heavyweight* blogging platform. 

Truth is, it is if you plan to use Github Pages as well -- if not, you may as well use one of the others that offer much more customization (assuming that you need more customization, that is). If you like it but you want something more suitable for a blog, you may want to check out Octopress instead.

#### [Octopress][octopress]

Although the Octopress site has not been updated since... 2011 (!), the Github repo shows recent activity and the project seems still very popular. It is basically Jekyll on steroids, with a lot of blogging-related goodies.

#### [Nanoc][nanoc]

Nanoc is the static site generator that still powers this web site. Overall, I am still very happy with it because it can do everything I need (and because I already have a working site running on it of course!). I already wrote about it in the past, and while nanoc (and my site) evolved a lot meanwhile, most of the [original article][h3rald-nanoc] remains valid today.

#### [Middleman][middleman]

I admit I didn't try this one yet, but judging from the number of people that starred it on Github this is the most popular static site generator written in Ruby (after Jekyll and Octopress). It seems to be feature-packed (including native support for i18n) and well worth a look.

#### [Pelican][pelican]

The Python counterpart of Jekyll. Never tried it personally, but it seems solid and a valid choice if you are a Pythonista. Oddly enough, it also powers the [Calepin.co][calepin] web site (and by reflection all Calepin-powered blogs in existance).

#### [DocPad][docpad]

If you are already familiar with [NodeJS][nodejs] and you want to use something *extremely powerful and versatile* as your static site generator, Docpad is the answer. It provides all the features of other static site generators, but it comes with a hige amount of [plugins](http://docpad.org/docs/plugins) to do pretty much anything and more, including executing scripts/templates in other programming languages. Obviously it just runs external problems to accomplish this, but still, this could be appealing to some folks (and piss off others).

Drawbacks? Well, it Looks somewhat complex.

#### [Metalsmith][metalsmith]

If DocPad is powerful and complex, Metalsmith is still powerful but *incredibly* simple. Its [core](https://github.com/segmentio/metalsmith/blob/master/lib/index.js) is less than 200 lines of codes (OK, not including all the third-party libraries it requires, like many other NodeJS modules, anyway), and everything else is a plugin. 

One of the catchphrases of the project is actually *everything is a plugin*, and they mean it: all Metalsmith does is providing a way to pipe a set of source files through plugins to produce a set of output files. I've been using it for some other projects for a while and making plugins is very simple, and the existing ones can be easily combined to obtain a static-site geerator.

### Conclusions

For the time being, I decided not to switch to another platform and stick to Nanoc. Why? Because it *just works*. Anyhow, I did seriously consider a lot of the blogging platform I covered in this roundup.

In particular, I've been tempted to at least start using **Medium** regularly, mainly because of its fantastic post editor, and because of the high-quality content network it is becoming. But again, writing for medium would be like writing for a magazine for free: the fact that you cannot use a custom domain or effectively build your own identity was enough to put me off.

**Svbtle** is slightly better on the customization front (at least it allows custom domains) but didn't convince me. I may use it for a *secondary* blog though.

For what concerns **Dropbox-powered services**... the idea is really cool, but I don't feel comfortable in depending on *two* third-party services for my blog.

...Then there's static site generators. I came to the conclusion that they are by far the most flexible option for small/medium sized personal web site. At this stage, I could probably have switched to something different, maybe powered by NodeJS (I am using Ruby less and less nowadays) like **Metalsmith**... but why bother? I'd have had to port a lot of the customizations I implemented in Ruby to Javascript with no particular benefit, at least not in the short term anyway.

What do *you* think? What blogging platform are you using, and why?


[marco-platform]: http://www.marco.org/2013/08/05/be-your-own-platform
[postachio]:http://postach.io/
[evernote]:http://evernote.com/
[posthaven]:https://posthaven.com/
[blogger]:https://www.blogger.com/
[skrivr]:http://skrivr.com/
[jekyll]:http://jekyllrb.com/
[calepin]:http://calepin.co/
[search]:https://www.google.com/search?hl=en&q=blogging+platforms
[ghost]:https://ghost.org
[metalsmith]:http://www.metalsmith.io
[docpad]:http://docpad.org
[nanoc]:http://nanoc.ws
[octopress]:http://octopress.org
[ssg]:http://staticsitegenerators.net
[pelican]:http://blog.getpelican.com
[wp]:https://wordpress.org
[tumblr]:https://www.tumblr.com
[gulp]:http://gulpjs.com
[grunt]:http://gruntjs.com
[svbtle]:https://svbtle.com
[posterous]:http://help.posterous.com
[typepad]:http://www.typepad.com
[squarespace]:http://www.squarespace.com
[skrivr]:http://skrivr.com/
[scriptogram]: http://scriptogr.am/
[medium]:https://medium.com/
[nodejs]:http://nodejs.org
[dropbox]:http://dropbox.com/
[middleman]:http://middlemanapp.com/
[pelican]:http://blog.getpelican.com/
[disqus]:http://disqus.com/
[h3rald-nanoc]:/articles/take-back-your-site-with-nanoc/

