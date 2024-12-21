-----
id: hex
title: "Introducing hex"
subtitle: "A tiny, minimalist, slightly-esoteric, concatenative programming language"
draft: true
content-type: article
timestamp: 1734263361
-----

I have a page on my personal wiki system (which is written in [min](/min) with a [h3](/h3) frontend, and *still* closed-source) titled _Use cases for a new programming language_. The first line I wrote is the following:

> A new programming language should only be created if it helps addressing a specific, practical use case

Right. That was meant to dissuade me to embark in endless quests for creating yet another (pointless?) little language that _probably_ doesn't really solve any practical purpose. I have a bunch of those lying around or even half-designed in my personal wiki, and of course [min](https://min-lang.org) has been my go-to personal project for many years, and I still enjoy tinkering with it.

But...

I still wanted to create a new language. The problem with min is that by emphasizing practicality more and more, it became more of a single-file, batteries-included programming language that can be used to create web servers, make HTTPS requests, process XML files, ...things like that.

The syntax also evolved quite a bit to support complex data types, it has sigils, and other oddities (bang-postfixed auto-popping symbols, anyone?). And it is also not that small anymore. Well over 1MB on some platforms. It statically links OpenSSL for Heaven's sake.

And it is written in Nim. Because I forgot how to program in C. Sometimes I wish I invested the same amount of time in re-learning C rather than having picked a new slightly non-mainstream language to build my ecosystem with. But it's fine, these are not regrets, everything helps shaping up the future, I suppose.

### Why _hex_?

I wanted to create a language that:

- had a really minimalist syntax
- was small in size
- was cross-platform (compiling to WebAssembly and also [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html))
- was implemented in C (that was more of a personal thing than anything else, but C ain't going anywhere as a language, at least)
- was concatenative (I am still fascinated by the concatenative programming paradigm)
- was able to do basic operations on strings and numbers, and delegate everything else to external programs
- was able to be used to create shell scripts, used as glue code, etc.
- had some quirks. Not many, but _some_ to make it interesting and fun to play with
- was easy to understand and useful to learn more about concatenative programming

Then the name. It took me weeks to come up with a good name. I then settled with _hex_ because:

- It's short and memorable
- It has not really been used for a popular programming language yet (go try find 1-3 letter words that are not, you'd be surprised)
- It has something magical about it (besides thinking about hexadecimal numbers, it also means _spell_ or curse)

### MVPL (Minimum Viable Programming Language)

Another page of my personal wiki aims at defining what constitutes a _minimum viable programming language_. 

Here's a list of things that I consider _mandatory_:

- integers
- strings
- arrays 
- exec external processes
- variables
- define functions 
- flow control: conditionals, loops
- error handling
- file management
- std io

...and here's a list of things that are _nice to have_:

- floats
- objects
- booleans
- lexical scoping
- serialization/deserialization
- regex
- networking
- xml
- json

I hope that _lexical scoping_ in the _nice to have_ made you chuckle. I know it would be bad, but _technically_ you wouldn't really need lexical scoping, really, especially in case of a concatenative programming language where you don't necessarily need variables, global symbols would probably be OK.

I decided to put this into practice when designing hex. And that's why, hex:

- supports only integers, strings, and lists (quotations). It doesn't have floats or dictionaries, even.
- comes with 64 native symbol for basic stuff, and lets you define your own (global) symbols, to store data and also define the equivalent of functions.
- uses symbols applied on the stack for _everything_ and I mean, literally everything from flow control to error handling and I/O.

And that's it. It doesn't implement _any_ of the nice-to-haves. I am also planning of keeping the number of native symbols fixed as well, and maybe implement a sort of standard library in hex itself.

### Artificial Inception

But but but... last time I checked, I didn't know how to program in C anymore, right? It's not that I can magically start writing decent C code from a day to the next, certainly not enough to write a parser, and interpreter, and things like that.

Or, maybe...

I cheated a little bit. Everyone is always talking about AI, how it is changing the world, how it can do X and how there won't be a need for Y anymore. There is definitely an element of hype in all that, but undeniably Large Language Models have been quite a breakthrough. Now, it's not that ChatGPT is really intelligent or 100% reliable, but I hadn't been using it for a few weeks and I was surprised to notice the improvements.

I started off innocently, expecting just some pointers and some pseudocode:

> Implement a simple parser for a really simple stack-based concatenative programming language an able to process integer numbers and common arithmetic operations, for example:
> 1 3 4 * + 2 -
> Should result in 11 being pushed on the stack.

It blurted out a Python implementation (no matter what, ChatGPT will *always* go to Python if you ask it to code something without specifying the language).

> Provide a C implementation 

And it did... I didn't try the code, but continued asking it to add support for strings and kept asking. I was surprised that it could _keep the context_ for as long as it could. Then it started hallucinating more frequently, but at the end of the day, I was left with a good enough implementation of a basic interpreted concatenative programming language. Which _actually compiled_ and worked, for the most part!

&rarr; [hex's artificial inception (ChatGPT chat)](https://chatgpt.com/share/6765d6b6-d2bc-8013-b91b-297f4d1c3b14)

I kept tinkering with it for a while, and then decided to create a new [repo](https://github.com/h3rald/hex) for it. 

After a few days, I found myself reading a lot of C code. Timidly, I started writing more and more myself... when I didn't remember something (memory allocation, pointer arithmetic), I decided to ask ChatGPT for explanations, summaries, cheat sheets... I was re-learning C!

Now, earlier I said that _I cheated a little bit_. Using AI to write code still feels a little bit like cheating, sure, but it is important to remember that _it is nothing more than a tool_.

There are plenty of issues with it, a lot of ethical ones as well, but at the end of the day, AI is here to stay, and we'd better get the most out of it. 

I think getting my little project bootstrapped with AI was an interesting experience, and it was very useful for two things, mainly:

- Take care of the boring, mechanical parts of the project
- Act as a personal tutor for learning more about C

Again, not an infallible tutor, but still better than nothing. And faster than skimming through a book or Stack Overflow for an answer for a question.

Using AI for programming is not cheating, no more than using Stack Overflow is. 

At any rate, overall positive experience. The best thing I got out of it was a better knowledge of the C programming language: I am now more confident and I can actually program in C a bit, and understand it. Better than I did in a long time, anyway.

### #DecemberAdventure 

It took me about 15 days of sporadic ChatGPT interactions alternated with also sporadic (and short) coding sessions to get the basics of the language implemented. At the beginning of December, I then decided to take part in [#DecemberAdventure](/https://eli.li/december-adventure) and work on hex of course! You can read more about it [here](/articles/dec-adv-2024).

The funny thing is that most of the design (and implementation) of the language was kinda there already, and still I managed to create more of an ecosystem around it.

Today, hex:

- Has its own web site at <https://hex.2c.fyi>, with its own browser-based [playground](https://hex.2c.fyi/play), a [tutorial](https://hex.2c.fyi/learn), and even a [specification](https://hex.2c.fyi/spec).
- It runs on different platforms, and can be compiled to WebAssembly to an  [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html)
- Has a virtual machine, comprised of a simple but fully-functional bytecode compiler and interpreter

The thing is... I have never achieved a lot of these things with min. But with hex I started (and remained) small, and that was the key.

### Minimalism, distilled

Syntactically speaking, the language is very similar to min. I always quite liked min's distinctive lispy flavor without actually being a lisp, its simple way of doing things without many special forms.

Take this program for example:

```
; Print a list of squares!
(0x1 0x2 0x3)
  (
    "i" :
    "The square of " i str " is " i i * str
    cat cat cat puts
    "i" #
  )
each
```

Sure, it is a bit verbose, but if i tell you that:

- ; is used to start line comments 
- Things are pushed on the stack from left to right 
- Things within parenthesis are quotations (lists) of other things
- Strings are delimited by double quotes
- Integers are prefixed with 0x
- Everything else is a symbol, and unlike other things, when they are not inside a quotation they disappear from the stack and manipulate it in some way

You basically already know the language syntax and how it works. 

You basically have literals that get pushed on the stack, or symbols that manipulate it, just that.

You may want to know that the `:` symbol is used to define other symbols and that the `#` destroys them, and that the `cat` symbol pops two strings from the stack and pushes back a concatenation of the two... sure, you can learn all of hex [64 native symbols](https://hex.2c.fyi/spec#native-symbols), but as I mentioned earlier, there are no statements or expressions or special forms: everything is either a literal that gets pushed on the stack, or a symbol that manipulates it.

Well, there you have it. Yet another programming language that you'll never use.

Everyone is creating programming language these days, and now with AI even people that normally wouldn't will be able to, imagine that.

Still, this has been, and it will continue to be, a very rewarding experience. And maybe, just maybe, this new little thing called hex can teach someone something new (concatenative programming) or even be used to write some very cryptic shell script.
