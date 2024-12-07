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

### Day #1

Today I made some improvements to reporting parsing errors (I had line and column counters already there, why on Earth shouldn't I use them for parsing errors?), and then focused on getting the [playground](https://hex.2c.fyi/play) to work. I read about WASM and Emscripten, and managed to actually compile with minor modifications but... it turns out that if you want to have something other than browser prompts to handle standard import, is a ([nearly](https://github.com/emscripten-core/emscripten/issues/10545)) impossible task.


### Day #2

I finally got STDIN to work properly, and you are now able to input into the hex REPL via a standard textbox that blends in with the rest of the pseudo-terminal I quickly hacked together.

Here's a picture for posterity, in case the design changes:

![hex playground](/images/dec-adv-2024/hex-playground.png)

How I did it, you ask? I basically had to implement an alternative `fgets` implementation using one of the (ugh!) Emscripten macros to actually call JavaScript code, and it works beautifully!

```c
#ifdef EMSCRIPTEN
#include <emscripten.h>

EM_ASYNC_JS(char *, em_fgets, (const char *buf, size_t bufsize), {
    return await new Promise(function(resolve, reject) {
               if (Module.pending_lines.length > 0)
               {
                   resolve(Module.pending_lines.shift());
               }
               else
               {
                   Module.pending_fgets.push(resolve);
               }
           })
        .then(function(s) {
            // convert JS string to WASM string
            let l = s.length + 1;
            if (l >= bufsize)
            {
                // truncate
                l = bufsize - 1;
            }
            Module.stringToUTF8(s.slice(0, l), buf, l);
            return buf;
        });
});
```

Erhm. Alright. It feels kinda ugly to have JS code in your C file but if that's what it takes... this is the simplest option I found by far. Kudos to [Tomasz Wisniewski](https://twdev.blog/2024/02/wasm_cpp_06/).

Excited with this breakthrough (which happened at around 6am while still in bed, for the record), I tried to raise the stakes. Let's see if I can get an [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html) for hex...

```bash
cosmocc -Wall -Wextra -g hex.c -o hex
```

BOOOM! It worked. I mean, of course it did, hex is not exactly complexity incarnate, but still, good going. One thing I needed to change was adding some extra instruction to flush stdout more often (some implementation of libc differ on this... like [musl libc](https://www.musl-libc.org) and [cosmopolitan libc](https://justine.lol/cosmopolitan/), some background [here](https://www.reddit.com/r/C_Programming/comments/lbjhx4/when_to_fflush_stdout/)), but that was it.

### Day #3

Today I created a semi-decent [about page](https://hex.2c.fyi/about) for hex, improved the static site generator to include different html `<title>` tags for each page, and started refactoring the Makefile a little bit. Not sure I am getting the task dependencies to work correctly, i.e. when compiling to WASM etc. though.

### Day #4

I actually wrote this page. Up to here, to be precise, to catch up. And made the conscious decision to actually say that this is a #DecemberAdventure thing. So that's quite a lot, and so very meta of me.

### Day #5

Implemented the [Github workflow](https://github.com/h3rald/hex/blob/master/.github/workflows/release.yml) to be able to prebuild hex binaries for:

* Linux (x86_64)
* MacOS (ARM64)
* MacOS (x86_64)
* Windows (x86_64)
* [αcτµαlly pδrταblε εxεcµταblε](https://justine.lol/ape.html)
* [WebAssembly](https://webassembly.org)

I also created the [/get](https://hex.2c.fyi/get/) page for the hex web site, which called for improving a little bit the bare-bones [static site generator](https://github.com/h3rald/hex/blob/master/web.hex) script that I wrote in hex itself. Essentially, I added a general way to replace tags like `\{\{release\}\}` or `\{\{title\}\}` with some values. 

First, a helper symbol that expects a strings on the stack, and wraps it in double curly brackets:

```
; Generate tag placeholder
(
    "{{" swap "}}" cat cat
) "tag" store
```

Then, another symbol to do all the replacements;
```
; Replace tag
(
    "pt_repl" store
    "pt_tag" store
    "pt_content" store
    (pt_content pt_tag tag i index 0x0 >)
        (pt_content pt_tag tag i pt_repl replace "pt_content" store)
    while 
    pt_content
) "process-tag" store
```

...this is then used in the main loop to process contents:

```
; Read the template page
 t_page read
; Replace tags
"content" content process-tag i
"title" id_content process-tag i
"release" meta_release process-tag i
"year" meta_year process-tag i
"new_content" store
```

Not bad, even though it feels a bit verbose. I am actually considering using `.` instead of `i` to dequote quotations and maybe even `:` instead of `store`, although it may become less readable. At present, non-alphanumeric symbols are only used for well-known mathematical operators like `>` or `+`.

Oh, and I also fixed a buffer overflow issue in the `read` symbol.

### Day #6

I decided to give it a try, and changed a few commonly-used symbols to use a single non-alphanumeric character:

* `store` &rarr; `:`
* `free` &rarr; `#`
* `i` &rarr; `.`
* `eval` &rarr; `!`
* `q` &rarr;  `'`

So yesterday's code snippet becomes this:

```
t_page read
"content" content process-tag .
"title" id_content process-tag .
"release" meta_release process-tag .
"year" meta_year process-tag .
"new_content" :
```

Out of all, I am particularly fond of `.`, `'`, and `:`. The last two come straight from [min](http://min-lang.org), while the dot I shamelessly "borrowed" from [Lobo](https://gts.quiltro.org/@lobo)'s [kojote](https://git.quiltro.org/lobo/kojote) (thanks!).

### Day #7

Today I bashed my head against the wall trying to get hex to work *properly* when compiled to WASM and run via NodeJS.

The thing is, basically, because of NodeJS's asynchronous nature, people have been doing all sort of things trying to get something like `fgets` to work. In the end I ended up re-using the `em_fgets` function I wrote on Day #2, and then have some NodeJS glue code to actually capture the input via [readline](https://nodejs.org/api/readline.html)'s on event, like this:

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

Module.pending_fgets = [];
Module.pending_lines = [];

rl.on('line', (line) => {
    Module.pending_lines.push(line);
    if (Module.pending_fgets.length > 0 && Module.pending_lines.length > 0) {
        const resolver = Module.pending_fgets.shift();
        resolver(Module.pending_lines.shift());
    }
});
```

So... well that worked.  Still, I was wondering why I couldn't see my nice `> ` character in my REPL's prompt... Well, it turns out that [it is basically impossible](https://github.com/emscripten-core/emscripten/issues/20622) to get stdout flushing to work in Emscripten. Also calling `process.stdout.write` on print doesn't work either so... Meh, there's a quick fix, can't be bothered anymore, for now:

```c
if defined(BROWSER)
static void prompt()
{
    // no prompt needed on browser
}
#elif !defined(BROWSER) && defined(__EMSCRIPTEN__)
static void prompt()
{
    printf(">\n");
}
#else
static void prompt()
{
    printf("> ");
    fflush(stdout);
}
#endif
```

Anyhow, for now I am going to mark the WASM build as *experimental*, and be done with it. In other news, I also added support for all platforms and for αcτµαlly pδrταblε εxεcµταblε in the [CI workflow](https://github.com/h3rald/hex/blob/master/.github/workflows/ci.yml) that builds hex and runs the tests.
