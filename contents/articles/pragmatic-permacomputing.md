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

### Realistic motivations

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


### Portability: Target multiple architectures

When it comes to portability, I think that pretty much nothing beats [virtual machines](https://wiki.xxiivv.com/site/virtual_machines.html) and emulators. That's why it is still possible to run old SNES games like the original Super Mario Bros. on much newer hardware than originally intended.

Alternatively, some popular games like GTA San Andreas have been successfully _ported_ to many architectures and systems (yes, I have been re-playing it on my iPhone just recently).

If you rely on a piece of software, or if you decide to make your own, you should make sure it runs on as many operating systems and as many architectures as possible. 

Implementing your software as an [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html) is probably today's best example of portability of a single executable file being able to run (as-is and _without_ being recompiled!) on Linux, MacOS, Windows, FreeBSD, OpenBSD, and NetBSD for both the ARM64 and AMD64 architectures.


### Understandability

### limit reliance on 3rd parties (within reason)

### Run on limited memory/cpu

### local first (avoid AI, cloud, internet, containers)

### open source and knowledge 

### interoperability (import/export)

### build for resilience 



