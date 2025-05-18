-----
id: pragmatic-permacomputing
title: "Pragmatic Permacomputing"
draft: true
subtitle: "Consideraton on building practical and resilient software"
content-type: article
timestamp: 1747484731
-----

[Permacomputing](https://permacomputing.net) should be taught at school. It should provide a _forma mentis_ for future engineers interested in building software and hardware that is mean to last, rather than doomed to be thrown away after a relatively short time. 

> [Permacomputing] values maintenance and refactoring of systems to keep them efficient, instead of planned obsolescence, permacomputing practices planned longevity. It is about using computation only when it has a strengthening effect on ecosystems.

-- Devine Lu Linvega on [Permacomputing](https://wiki.xxiivv.com/site/permacomputing.html)

Interesting stuff, no doubt, but _why_? What drives this semi-underground, off-the-beaten-track movement that aims at doing more with less, recycling old hardware, and building _resilient_ software?

[Collapse OS](https://collapseos.org) and its less radical brother [Dusk OS](https://duskos.org) are two examples of software that is meant to be used at the [first and second stage](https://collapseos.org/why.html) of a [collapse of civilization](https://collapseos.org/civ.html) that is both _imminent_ and _inevitable_.

Scary stuff. A bit over the top, if you ask me, and these two remarkable projects regularly get [criticized](https://news.ycombinator.com/item?id=43482705) on Hacker News for being excessively alarmist. Also, in a future where humanity is not able to produce computers anymore &mdash; maybe due to a sudden catastrophe like a nuclear holocaust, alien invasion, zombie apocalypse, ...take yor pick &mdash; people would be more concerned about survival rather than programming some old computer in Forth.

I do think, however, that permacomputing can be a very practical philosophy for developing or choosing software and hardware. You can definitely be pragmatic about it, and do something good for yourself and the planet in the process.

### Have realistic motivations

There are definitely more down-to-Earth motivations to embrace permacomputing than imminent civilization collapse. Here are a few:

- **Temporary or partial infrastructure failure** &mdash; Think earthquakes, black outs, terrorist attacks, cyber attacks, civil unrest, and the likes. Nasty, but definitely plausible as they did happen already. Still on the alarmist side of things, but if you are 100% reliant on the Internet, would you be OK if you couldn't connect to it for a day? How about a week?
- **Lack of financial resources** &mdash; Imagine not being able to afford a new laptop or smartphone. Can you make do with older hardware
- **Lack of free time** &mdash; You are studying at high school or uni, and building software using the latest stuff. You don't mind using hundreds of NPM packages and keeping them up-to-date every week. Fast forward a few years, you have a family and kids. Your priority changes, but you still want to run your own web site and apps even if you don't have 2 hours of spare time per day, or per week, even. 
- **Save money on VPS or self-host on RPis etc.** &mdash; A VPS is a fairly cheap way to run your own server. For four bucks per month, [DigitalOcean gives you a droplet](https://www.digitalocean.com/pricing/droplets) with Linux on it, and you can install whatever you want on it and run it 24/7. As long as 512MB of RAM is enough for you. You want more? You pay more. You can get 4GB of RAM for $24/month for example, are you OK to pay that amount? Even then, your laptop has what, 16GB of RAM these days? Forget running bloated software there. Same thing if you plan to self-host on your Raspberry Pi: you are going to have to deal with more resource-constrained hardware... but that's a _good thing_, because it forces you to re-evaluate your software stack and often go for less-bloated alternatives.
- **Service shuutting down (or increasing prices)** &mdash; Only potentially related to permacomputing, but surely one of the biggest reason to go the [self-hosting](https://github.com/awesome-selfhosted/awesome-selfhosted) route. Are you OK using a "free" service that may shut down or go premium with minimal warning? Can you host it yourself? Can you implement a program that does the same thing?

Your mileage may vary, but chances are that you already experienced at least one of the scenarios above.

### Recycle and salvage old hardware

One of the first steps to reduce the amounts of e-waste that gets generated every year is realizing that _you may not need_ the latest and gratest laptop, or the latest iPhone. You don't need to change smartphone every year, especially because &mdash; let's face it &mdash; upgrading your phone is no way near as exciting as it was in the 2010s. You get what, a better camera? More GBs? Even higher processing power? Sure. But do you _really_ need it? Maybe not. 

I am currently using a three-year old iPhone 14 Pro. I used to change my iPhone every two years, and give the previous one to a family member. We have quite a few iPhones in the family all the way to iPhone 6, and, guess what, they all still work perfectly. Hell, my 2nd generation iPod touch from 2009 still works perfectly! Sure, the battery may not last as long after a few years, but for the most part, Apple device are still very well-made and durable. 

You should never throw away one of those devices, you should put it to use in one way or the other! 

Anyhow, back to my three-year old iPhone. This thing has a six-core CPU, an Apple A16 GPU, and 6GB of RAM. Those specs are _stupidly_ high. Think back at the average VPS that you can get for 5$/month, or think about your first computer... I got mine back in '98, and it had only 64MB of RAM. A few years later, I expanded it to 128MB and I was able to run &mdash; albeit sluggishly &mdash; Windows XP on it.

Fast forward 20 years, and you can still run Windows XP [in your browser](https://lrusso.github.io/VirtualXP/VirtualXP.htm)!

While few purists may not like it, the fact that these days there are a lot of very powerful proprietary devices at risk of being thrown out is a reality, and something we should do something about. While there are few, there should be more projects aimed at leveraging the high-end specs of these devices and give them a second life. 

Also, I wish big companies like Apple and Google could commit in keeping patching their old operating systems, or at least they could open source them and let volunteers do it.

### Be portable and target multiple platforms and architectures

When it comes to portability, I think that pretty much nothing beats [virtual machines](https://wiki.xxiivv.com/site/virtual_machines.html) and emulators. That's why it is still possible to run old SNES games like the original Super Mario Bros. on much newer hardware than originally intended.

Alternatively, some popular games like GTA San Andreas have been successfully _ported_ to many architectures and systems (yes, I have been re-playing it on my iPhone just recently).

If you rely on a piece of software, or if you decide to make your own, you should make sure it runs on as many operating systems and as many architectures as possible. 

Implementing your software as an [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html) is probably today's best example of portability of a single executable file being able to run (as-is and _without_ being recompiled!) on Linux, MacOS, Windows, FreeBSD, OpenBSD, and NetBSD for both the ARM64 and AMD64 architectures.

Justine Tunney explains why this it's important for her.

> One of the reasons why I love working with a lot of these old technologies, is that I want any software work I'm involved in to stand the test of time with minimal toil. Similar to how the Super Mario Bros ROM has managed to survive all these years without needing a GitHub issue tracker.

Speaking of ROMs, [Uxn](https://wiki.xxiivv.com/site/uxn.html) is another example of portability and permacomputing at its finest. The virtual machine is devised to be simple to implement, so that it can be ported to many platforms relatively effortlessly (if you are into that sort of thing). Uxn is remarkable for other reasons as well, as we'll see later on in this article, but especially because it is based on the principle that if you can implement the virtual machine in any way you want, you will be able to run pre-compiled ROMs forever.

Of course, Justine and Devine are one-of-a-kind programming gurus, but the good news is that a lot of today's programming languages can built executables that run on different platforms without code changes. Rust, Go, and of course C (with some caveats) to name a few.

In my case, I picked [Nim](https://nim-lang.org) to implement most of my very own [personal ecosystem](https://code.h3rald.com) that can run on MacOS, Windows and Linux. Maybe not the most popular choice (read on for more on _popularity_), but it is easy to use and does the job.

### Reduce dependencies on third-party party code 

When it comes to managing dependencies in software and the current state of things, no one describes it better than [XKCD #2347](https://xkcd.com/2347/).

Certain ecosystems (NodeJS and modern JavaScript, I am looking at you!) encourage the proliferation of dependencies. The more dependencies on third-party code your program relies on, the higher the chance that something will change, and break things.

This is the reason why I decided to implement [my own static site generator](/hastysite/) instead of using one of the millions existing ones out there. It was a pragmatic decision mind: changes in my life reduced the amount of time I had to tinker with code and stay on top of an ever-changing ecosystem (and I was using Nanoc and Ruby, nothing too crazy, even).

My recommendation here is not to go too crazy in reinventing the wheel: you _probably_ don't need to reimplement an operating system from scratch, and you _probably_ don't need to implement your own programming language or blacklist NodeJS forever because of NPM. But you should definitely evaluate your options.

I am running a bunch of web services in NodeJS, _but_ I am not relying on third-party dependencies, for example. NodeJS has been fairly considerate in its relatively short lifespan to not break things too often, even between major versions. They offer LTS releases, so all I have to do is keep the system patched automatically, and upgrade every couple of years. For me, right now, that is manageable.

And if you decide to rely on a closed ecosystem like Windows or iOS, that may also be fine: there are programs that can still run on Windows after 20 years, and the same can (nearly) be said for some iOS apps. Other considerations apply, in this case, like interoperability of file formats, but it is important not to dismiss proprietary systems just because they are proprietary: the reality is that a lot of e-waste today is constituted by devices running on proprietary systems. Sure, you could blank a Windows laptop and install Linux on it, if you are so inclined and you are comfortable with it, but if you are not, it's fine too.

### Ensure you are leveraging interoperable technologies and formats

For years I have been dreaming about using some sort of Microsoft Excel alternative. There is gotta be something out there that does the job, maybe using CSV files or similar... and there is, probably.

Devine recently made [Nebu](https://wiki.xxiivv.com/site/nebu) for Uxn, and I think that's a remarkable feat of engineering. Would I tell my father to use it? Probably not. Could I use it at work? Maybe, but as sad as it is, people would start wondering why suddenly I am using CSV files instead of XLSX so... let's just say that would be impractical.

The important thing here is that in a lot of cases it's _fine_ to choose certain applications, proprietary or not, as long as you have a way out, a way to export your data to a common data format that can then be imported something else. 

We could debate on the inherent evil of the XLS or XLSX format, how horrible and inconsiderate it is on certain aspects, but at the end of the day:

- It can be converted to CSV and then you are "free" again
- It can be imported and managed by many competitors of Excel
- We have been using it for decades, it's still there. You can probably open an .xls file created twenty years ago
- It is _reasonable_ to expect that it will still work for the next twenty years

Sure, Microsoft switched from XLS to XLSX, but hey, we survived. 

All this applies to text editors, spreadsheet editors, or whatever software uses a specific file format to save its state: there are thousands of Markdown editors out there, for any platform. It really doesn't matter which one you pick, as long as it uses markdown as a format. Does your favorite editor become unmaintained? No problem, you can pick another.

Looking at my specific case, I am relying on a specific flavor of markdown ([Discount](https://www.pell.portland.or.us/~orc/Code/discount/)) with some custom extensions for macros and snippets for my own [HastyScribe](/hastyscribe/) and [HastySite](/hastysite/) projects. That's probably a red flag: if you want to use HastyScribe as a markdown processor (few other than me do), you have to live with the fact that:

- It does not use _standard_ Markdown
- It relies on 3rd party dependency
- It is written in Nim

I can live with all that, but I am also the sole maintainer.

### Make your code open source and understandable

I put understandability and open source in the same section because they go hand-in-hand 90% of the time. The assumption here is if you don't have access to the source of a program, chances are that you will not be able to fully understand how it works. 

There are probably other reasons for open sourcing your software, but as far as permacomputing goes, understandability is the most important. If a piece of software has to withstand the passage of time, it has to be understood by others. Again, there are extremes: a basic Uxn implementation is 100 lines of C and [fits on a napkin](https://wiki.xxiivv.com/etc/uxnmin.c.txt); the idea here is that it should be easy to understand and re-implement in other programming languages and systems.

Of course, being able to read the source code is not enough: I have been a technical writer in the past, and I have always included plenty of documentation for all my open source software. A well-documented open source program can be studied by someone else ten, twenty years after it was release. It can be understood, so that it can be ported to another operating system or architecture, or corrected to address a specific bug, or extended to implement a missing feature.

### Rely on somehing that has alternative implementations

This goes hand-in-hand with interoperability and portability, and it is one of the criteria for [choosing a programming language](https://permacomputing.net/programming_languages/) suitable for permacomputing. 

While you may want to choose something that is not too complex and can be easily re-implemented from scratch, it is often hard to find or excessively niche. Looking at something that has many alternative implementations available is often more viable and practical.

Talking about high-level programming languages, one that I think it is often overlooked and frowned (in permacomputing circles at least) is... JavaScript!

As I pointed out before, NodeJS can be a good high-level programming language and ecosystem, even on its own, without any NPM package. Too big? No problem, there are implementations of JavaScript that [run on microcontrollers](https://www.espruino.com), that are very small, amazingly complete and very portable like [QuickJS](https://bellard.org/quickjs/quickjs.html), that can be really easily embedded like [Duktape](https://duktape.org) (I embedded it in my very own [LiteStore](/litestore/) data store, works wonderfully).

The problem here is that each implementation may have its own little quirks and proprietary APIs, but all of them are at least partially compliant with some version of the [ECMAScript](https://it.wikipedia.org/wiki/ECMAScript) standard. 

The availability of alternatives (or lack thereof) made me second-guess my choice of picking Nim as the programming language of choice for my ecosystem and sort-of (soft) [bedrock platform](https://permacomputing.net/bedrock_platform/)... again, it is all about tradeoffs.

### Run on limited resources

Speaking of Nim, the top reason why I went for it (besides being an easy-to-learn high-level language), was that it can generate small, cross-platform executables that are fast and can be fairly memory/CPU efficient. 

It compiles down to fairly optimized C code, so that is definitely a good thing.

You can go for Rust if you wish, or whatever you want, but please, make sure that you write programs that run on a limited amount of memory and processing power. For me, a key requirement was that my web services, data stores etc. had to run comfortably on my VPS. [LiteStore](/litestore/) fits the bill perfectly, and it powers a few of my own artisan apps that I use every day (some of which still closed-source), and so does my hand-made API server written in [min](https://min-lang.org) that I am using for [nifty.tools](https://nifty.tools) and other instances of the same personal wiki engine I made.

I get really pissed off at really bloated and complex software. Especially for things like your own blog or wiki, or a money tracking app, or a personal journal app... they really don't have to be. Keep things simple, and fast, and make sure they need as little resources as possible.

### Favor simpler architectures and avoid infrastructural dependencies

Again, this does not apply for _everything_, but to state the obvious, simpler software is easier to manage and maintain. When I build something, I at least try to avoid relying on the following (in this order):

- Cloud
- Containers
- Internet

I'll probably have to add _AI_ or _agents_ to the very top of that list soon, but for now (it won't be true in months, I am sure) software is not relying too much on these things _to work_, even though they are increasingly being used to _implement_ software or to provide add-on functionality.

I am probably thinking of simpler every day tools and apps here, but for me there is no valid reason that anything you are using every day should rely on cloud technologies and containerization to work. I remember someone was kind enough to provide a [Dockerfile](https://github.com/h3rald/litestore/blob/master/Dockerfile) for LiteStore a few years ago... to make it easier to setup and run, you know...

_Hang on a minute_. I had just released an open source document store server that compiles to a single, statically-linked executable that can run on all major operating system, with sensible defaults and almost no configuration... why on Earth would I want it to be containerized? For scaling reasons? I built it primarily to use it as primary storage for my own artisan apps... it's a small and simple thing, it really doesn't need to be complicated!

Being able to _not_ rely on the Internet is harder, but [local-first software](https://localfirstweb.dev) is actually a thing. Because I tend to create web UIs when I need a graphical user interface for my tools, deploying them on the Internet with simple cookie-based authentication is very convenient: I can implement my app once, deploy it on my VPS, and access it from any device, without worrying about synchronizing data and things like that.

That is probably fine. I am acknowledging a hard dependency on the Internet being accessible, which may not be OK in some scenarios (while on a plane or similar), but I have two mitigations:

- If, for some weird reason, I will not be able to access the Internet for longer periods of time, I can still run the same tools locally, on a server running on localhost.
- For my personal wiki app, I added *full* offline support with [service workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers). I was reluctant of doing so because things can change, and I am sure there will be simpler and better ways to implement offline support in web apps in the future, but that was a tradeoff I was willing to make.

### Choose popular, well-known software, systems, and formats 

This is gonna be a controversial one... If you go through the [projects](https://permacomputing.net/projects/) page of the permacomputing wiki, you will find a lot of names of _minimalist_ software that the average Joe never heard about. None of them is mainstream, or _popular_, if you will: there may be works of enlightened computer gurus, reclusive hermits, or brilliant artist/technologists living on boats... Works of art that could become popular, but maybe in an alternate reality.

The world we live in relies on bloated software running on popular, mainstream systems like Windows, or MacOS. That is "fine" I guess, for most. Until it isn't. In opened a drawer the other day and I found my old [Nokia 6600](https://en.wikipedia.org/wiki/Nokia_6600) running Symbian OS 7, I found my old [Palm Treo](https://en.wikipedia.org/wiki/Palm_Treo) running Windows Mobile 6.1, and the [Blackberry Curve 9300](https://en.wikipedia.org/wiki/BlackBerry_Curve) running the Blabkberry OS I picked up a couple of years ago at a flea marked for 15€. They all turn on. The battery is not that bad. They could potentially work and even (unsafely and very slowly) browse the web with [Opera Mini](http://m.opera.com/?act=opts&rnd=2799480596&vid=0x10cb75bb14cbb1d8&ua=MOT-i415).

All those once-popular platforms and operating systems are now forgotten. And because those systems are proprietary and closed-source, no one bothers or even can keep them alive.

Choosing a _popular_ platform is literally like betting on a race horse. The only difference is that the race may last five, ten, maybe fifteen years? Will I be writing about my old iPhone 14 Pro fifteen years from now, of how awesome it felt until "the downfall of iOS"?

I wish we could do something about this. For one, things would be much easier if systems were more open. Maybe Android is better that way? Not sure. But I wish some clever folk could figure something out to at least put the _hardware_ of these expensive bricks to good use. And that's hard, I get it, but we should invest in figuring it out.

Take [Uxn](https://100r.co/site/uxn.html) for example. It can run on anything, literally. However, the [Uxn emulator for iOS](https://github.com/paiv/uxn-ios) doesn't seem to be complete or maintained. And because of the very nature of the platform, it is neither on the App Store, nor on the recently-legalized (in Europe) [AltStore](https://altstore.io), making it harded to install on their device for the average user.

And this is not an attack to the person that created it... but I just wish this project (and others similar to this) could get more love.

If we want permacomputing to succeed, if we want to reduce e-waste, we have to realize that &mdash; unfortunately &mdash; cannot pick the hardware our programs can run on. Maybe not even the operating system.

### Conclusion


