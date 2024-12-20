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

I decided to put this into practice when creating hex. And that's why, hex:

- supports only integers, strings, and lists (quotations). It doesn't have floats or dictionaries, even.
- it comes with 64 native symbol for basic stuff, and lets you define your own (global) symbols, to store data and also define the equivalent of functions.
- _everything_ and I mean, literally everything from flow control to error handling, and I/O is done by applying symbols on the stack.




