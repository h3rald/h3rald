-----
id: home-cooked-apps-the-right-way
title: "Home-cooked apps, the right way"
subtitle: "Reflections on programming for yourself, barriers, and extreme selfdogfooding"
content-type: article
timestamp: 1718152147
-----

_"Two espressos?"_

_"Sure, thanks!_

That was my cousin, the barman. He always gives us a little discount or offers us coffee at least every time my wife, daughter and I go to his bar for a cocktail and an _aperitivo_.

Except that now I am writing this at 2am at night. Coffee almost never works the way it was intended for me, but when it does, _it really does_.

### Apps as home-cooked meals, AI, and barriers

Anyhow, while I was trying to sleep I came across [this article](https://maggieappleton.com/home-cooked-software) on home-cooked software and barefoot developers, which was presented at this year's local-first conference in Berlin. It sparkled my interest because especially the first part focused on local-first software (which I agree on) and [apps as home-cooked meals](https://www.robinsloan.com/notes/home-cooked-app/) (which I firmly believe in).

But then it went off advocating leveraging LLMs as a way to empower more people (_barefoot developers_) to create their home-cooked apps, which made me cringe a little bit. 

But I don't want to talk about AI in this article, I want to focus on another passage from that article which talked about the _command-line wall_ as the barrier that people who possess just-enough coding skills hit:

> [...] But they never make it over what I call the command line wall.

> They never end up in the terminal, because that is a huge jump in complexity, usability, and frustration from using something like Airtable or Notion.

I should write another post about this category of people... some of which (my boss included) I really admire, but that's also not the point I want to make now.

The point is the _command line wall_. I immediately smiled when I read that. _"Hah! I am so much smarter, I love the command line and use it every day!"_

### On not being smart, and knowing your limits

But am I, really?

Everyone has barriers. Some people can't use  a computer, others can't use excel, indeed for some people the command line can be scary... but what are _my_ barriers?

Let's see. 

- I can code, and I still do, more or less daily and at least weekly, even though these days I am (supposed to be) a Technical Product Manager
- I know a few programming languages like Nim and JavaScript
- I have built quite a few tools that are listed in the [projects](/projects/) section of this site
- I maintain my own site on a VPS
- I implemented quite a few web apps that my family and I use every day, even if the rest of the world doesn't know about them

Well, that felt good didn't it? It did. 

So no barriers? Not quite. Here's some things don't know or I cannot do:

- I can't code in C or low-level programming languages. I did study it at uni but never really used in the real world, and forgot most of it.
- I am not able to do any manual memory management
- I never learnt assembly
- I can't do do any desktop UI programming 
- I was unable to learn [uxn](https://100r.co/site/uxn.html) even if I really, really wanted to

And you know what hurts? That because of various extremely important reasons like lack of time due to family and work, I will probably never be able to achieve any of the above. Well, I shouldn't say never, but at least not in the short or medium term.

And so where does that leave me? Even though I don't think, like the author of that article, that LLMs can come to the rescue, I would like a magic way to overcome my barriers. I can somewhat relate to the way the author feels.

I think everyone has barriers. And I guess the secret of happiness, or rather, of feeling happy about ourselves is to find the right compromise to overcome them.

This also somewhat feels selfish doesn't it? _"Heh! He should shut up, he can code! Or even, he doesn't even need to code for a living"_ some people may say. 

Still, the pain of not being able to do something is very real, at very different levels, for all of us probably.

### The _selfdogfooding_ disease  

But there's more! A normal person would just pick a tool or programming language and move on. Like I know if I really wanted to learn Uxn I probably could, and I could built some interesting things with it. 

That's not enough though, is it? That would be too easy. I suffer from a rare disease I call _extreme self-dogfooding_, i.e. I have to kinda... build my own ecosystem in order to be able to build my tools and apps. Like... I wanted to build my own web apps so I ended up building lower level programs to achieve that, like a [JavaScript microframework](/h3/) for the frontend, a [document store](/litestore/) for the backend, but also a [programming language](/min/) in case I need more freedom, and then there's the ancillary tools like a [tech-doc oriented markdown compiler](/hastyscribe/) (software needs documentation right?) which could then be used to power a [static-site generator](/hastysite/)... and the list goes on.

The problem? _It's never enough_

I have spent a lot of precious free _thinking_ time to try to come up with a new programming language or virtual machine to go even more low level. Like... I did implemented my own programming language, but I did so in [Nim](https://nim-lang.org), which is kinda high-level and also ended up pulling in a lot of third-party libraries that made it quite big and probably very similar to plenty of other languages...

That's when I hit the barriers. I would like to be smart enough to, say, implement my own system like Uxn using as little code as possible and build an ecosystem on top of it. Why? Probably just to feel accomplished,  because objectively I have no practical reason to do so.

Until... until there's an itch to scratch. Like implementing a todo list app that works just the way I want maybe, but is that a real need or just an excuse to accomplish something or be creative?

### The right way to prepare a home-cooked meal

I feel we live in a world where if you think of a new piece of software, it probably already exists. Most of the time I end up figuring that out _before_ I start a new project. Especially now that I can't afford and shouldn't really start new open source projects I know I cannot maintain.

Peer-pressure? Inferiority complex? Or just a need to be creative? Probably a bit of everything. 

Is this constant need to overcome barriers healthy? Maybe not, but it is a very powerful force to unleash creativity, if properly (and carefully) channeled.

The point? I guess **there is no "right way" to build your app-as-home-cooked-meal**. You can use a high-level programming language, you can use a low-code tool, and (sigh) you can probably use LLMs _if that works for you, and if you can achieve your goal_.

Extra points if your goal is practical and useful to someone, like creating a budgeting app your spouse can use, or a video game your daughter can play someway, when she gets older.
