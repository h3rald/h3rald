-----
id: december-adventure-2024
title: "December Adventure 2024"
subtitle: "Everyday fun with hex, a tiny concatenative programming language"
content-type: article
timestamp: 1733287393
-----

And so it begins! This year I learnt about this [#DecemberAdventure](https://eli.li/december-adventure) thing and decided to give it a go. I believe it started off last year as a sort of low-key alternative to [Advent of Code](https://en.wikipedia.org/wiki/Advent_of_Code)... but last year I probably didn't pay too much attention to it, or dismissed like yet another daily thing to do every day of the month in autumn, and I normally don't bother with those things (I seldom write here these days, let alone do something *every day*!).

This year, when more and more fellow Mervellians [started to post about it](https://merveilles.town/tags/DecemberAdventure), I thought I'd give it a shot.

Truth is, this year I have a cool little project that just _begs_ to be blogged about. I actually started working on it in mid-November, but the idea is to write a bit of code every day in December (which I have been doing), so that works too. The thing in question is [hex](https://hex.2c.fyi), a new concatenative programming language of mine (yes, [again](https://min-lang.org)).

The thing with this thing, hex, is that... well, it's a little thing, you see. It's _low key_. It doesn't even get its own domain, just a subdomain, at most. And the site! A little site indeed. Call it minimalist, brutalist even. Very simple styling, simple colors (I am using CSS color names instead of RGB codes because most of it is being written by hand, and on my mobile phone!). It's just perfect. For me at least, which is what matters the most, right? ;)

Good! Now that we are done with all the introductions and pledges, let's get going already!

### The first fortnight...

As I mentioned earlier, this project actually started on November 15th, 2024. Yes, I should have waited and posted bits about it everyday in December maybe, that may have been more interesting... or not, in a way. The thing is, this new language right is now more or less implemented, from a pure coding point of view, but a ton of stuff is missing that makes a project *polished enough* to be released. I am referring to things like:

- More extensive testing
- Comprehensive documentation
- A web site
- An online playground
- Automated builds for different platforms
- Blog posts about it
- A project page here on H3RALD.com

In the first fifteen days I concentrated on rough development, I implemented a way to process tokens, interpret them, I added all the necessary data structures to manage state... I did all this in C. C you say? But I somewhat recently (in June! That's recent for this site) [blurted about](https://h3rald.com/articles/home-cooked-apps-the-right-way/#heading__On_not_being_smart__and_knowing_your_limits) the fact that I _didn't_ actually know how to code C properly! So how the...

Well, AI. 

WAIT! Before you metaphorically close this article and burn it, I didn't mean that AI wrote the whole thing. I started off innocently as asking ChatGPT if it could build an interpreter for a small programming language able to process integers and do simple arithmetic, gave it the parameters, kept refining it, asked to add string support, caught some problems and got it to address them. For a while (0.6745 seconds) I thought this thing was actually able to understand my thoughts and that all developers were going to be out of a job, then... well, then the poor thing just couldn't do it. 

It did well, I gotta say. Let's say that if you keep your code down to, say, 500 lines it can "remember it" more or less as a fairly dumb junior developer who's really fast at stack-overflowing tasks... then it falls apart: forgets that we decided to change function names from camel case to snake case, forgets that freeing things in that way segfaulted, and then it started with names of functions that didn't exist. Damn. Repeat after me:

_LLMs ain't smart, stop trusting them!_

Before the hallucinations got out of hand, I did the right thing and took that code out of it and put it in a repo. It needed actual nourishment and care, it needed love. I took pity of that half-baked codebase, and tried to see if I could improve upon it.

One thing I realized was that by conversing with that... thing, and asking the right questions on how pointer work, and how memory is managed, I kinda brought my latent C programming skills from university back to life. I am no expert C programmer, but I believe this little digression helped me remember some of it, at least!

All satisfied with my newfound C wizardly skills, I kept iterating over the code till it got in semi-decent shape. I believe by the end of November most of the symbols I implemented worked properly, segmentation faults that plagued the thing are (mostly) gone, there are a bunch of tests as well and a couple of scripts written in hex, too. One for [running the tests](https://github.com/h3rald/hex/blob/master/test.hex) and one for [generating the web site](https://github.com/h3rald/hex/blob/master/web.hex). Oh, and I almost learnt something about [Makefiles](https://github.com/h3rald/hex/blob/master/Makefile), too!

### Day 1

Today I made some improvements to reporting parsing errors (I had line and column counters already there, why on Earth shouldn't I use them for parsing errors?), and then focused on getting the [playground](https://hex.2c.fyi/play) to work. I read about WASM and Emscripten, and managed to actually compile with minor modifications but... it turns out that if you want to have something other than browser prompts to handle standard import, is a (nearly) impossible task.

### Day 2

### Day 3
