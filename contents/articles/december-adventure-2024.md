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

### Day #8

Today I decided to enhance the comparison operators to support quotations as well. Not the most useful feature in the world, but for completeness' sake, we should also lexicographic comparison of quotations, also because `==` and `!=` already supported quotations anyway.

Another thing I added was support for splitting a string by character by specifying a blank string as separator:

```
"hello" "" split ; => ("h" "e" "l" "l" "o")
```

This feature is standard in most programming languages and could be quote useful to work on strings.

Last but not least, I also did some tidying in the repo and organized things neatly in sub-folders.

### Day #9

Today I added more tests and got past 100 (yay!). Checking for error conditions, mostly. I ended up changing the behavior of some of the symbols, like instead of having errors thrown in case of mismatching types, like in the following test:

```
(("0x2" (0x2) !=) (error) try "Symbol '!=' requires two integers, two strings, or two quotations" ==)
```

I am now just returning `0x0` (false) and be done with it. 

The other thing I did was updating the `web.hex` script to... generate the changelog based on files stored in a release folder. I am also generating a [CHAGELOG.md](https://github.com/h3rald/hex/blob/master/CHANGELOG.md) file so that GitHub is happy and can preview it, even though it is, in fact, an HTML file...

### Day #10

And so... Colors! Time for some proper syntax highlighting for hex! I feel like I am kinda cheating a little bit, because having already implemented Vim and VSCode syntax highlighting for [min](https://min-lang.org), doing the same for hex was a piece of cake.

Here's how hex syntax highlighting looks in Vim:

![Vim hex highlighting](/images/dec-adv-2024/hex-vim.png)

...and that's how it looks in Visual Studio Code:

![VSCode hex highlighting](/images/dec-adv-2024/hex-vscode.png)

Beyond that, I also quickly added support for:

* Scheme-style block comments delimited by `#|` and `#|` (like in min)
* Support for handling hashbang if present on the first line

### Day #11

The [spec](https://hex.2c.fyi/spec) is up! No, not quite: I just managed to add an outline and the signature of every native symbol. I also updated the [web.hex](https://github.com/h3rald/hex/blob/master/scripts/web.hex) script (the mini static site generator for the hex site) to handle placeholders like `\{\{sym-puts\}\}` and substitute them with links to the corresponding [definition](https://hex.2c.fyi/spec#puts-symbol) in the spec.

I also added more tests and fixed a problem with parsing escaped characters like backslashes and quotes in strings. Hopefully...

### Day #12

Today I decided to remove the `slice` and `insert` symbols (which are fairly complex and can be re-implemented with other symbols, if needed) and substituted them with `ord` and `chr`, to return the ASCII code or the character represented by an ASCII code respectively. I believe this functionality is totally missing from the language, and could potentially be used to implement advanced string matching (only of ASCII characters though, I'd like to keep things _very_ simple!).

I also started writing the [spec](https://hex.2c.fyi/spec)! All the 64 native symbols are now documented (could do with some examples but it's better than nothing), and I also completed the syntax section.

### Day #13

The official hex [specification](https://hex.2c.fyi/spec) is complete. Or better, at least the first draft of it is anyway. I also spent some time tweaking the CSS of the hex web site a little bit to make it more readable.

The other thing I decided to implement for fun was... a poor man's syntax highlighting markup for hex syntax. Now, hex of course doesn't have things like regular expressions, and creating a parser for the hex language in itself would be overkill maybe (although perhaps it could be done) so... well, I decided to go for a really crude (but working) method based on replacing unusual sequences of characters like `$"`, or `$$`. 

Here's the code for it, that is part of the [web.hex](https://github.com/h3rald/hex/blob/master/scripts/web.hex) script (the irony is that the following code will _not_ be highlighted on this site :P).

```
; Delimiters and replacements for syntax highlighting
(
    "$;" 
    "$#|" 
    "|#$" 
    "$\"" 
    "$0x" 
    "$:" 
    "$$"
) "highlight-delimiters" :

(
    "<span class=\"hex-comment\">;" 
    "<span class=\"hex-comment\">#|" 
    "|#</span>" 
    "<span class=\"hex-string\">\""
    "<span class=\"hex-integer\">0x"
    "<span class=\"hex-symbol\">"
    "</span>"
) "highlight-replacements" :

; Highlight syntax in text
(
    "t-text" :
    0x0 "t-count" :
    (t-count highlight-delimiters len <)
        (
            t-text highlight-delimiters t-count get "t-delimiter" :
            t-text highlight-replacements t-count get "t-replacement" :
            ; Find delimiter in text and replace it with the corresponding replacement
            (t-text t-delimiter index 0x0 >=)
                (
                    t-text t-delimiter t-replacement replace "t-text" :
                ) 
            while
            t-count 0x1 + "t-count" :
        )
    while
    ; Push highlighted text on the stack
    t-text
    ; Free temporary symbols
    "t-text" #
    "t-count" #
    "t-delimiter" #
    "t-replacement" #
) "highlight" :
```

Right... so the idea is to wrap _any_ hex token except for parenthesis with some `$` signs, which will be replaced with the corresponding html `<span>` tags. So a simple example like the following:

```
(0x1 0x2 0x3) (dup dup * *) map
```

...would have to be written as:

```
($0x1$$ $0x2$$ $0x3$$) ($:dup$$ $:dup$$ $:*$$ $:*$$) $:map$$
```

Yikes. Crude. I did say that, didn't I? But it does save some keystrokes at least!

### Day #14

It's out! I decided that it is finally time to release hex v0.1.0! You can go get it from the [/get](https://hex.2c.fyi/get) page. 

Oh of course I also managed to finish the whole site today, and published an [introductory tutorial](https://hex.2c.fyi/learn) on the language, which should hopefully help more folks get closer to the concatenative programming paradigm.

### Day #15

Today I spent more time with my family and took it easy a little bit. I did manage to add a [project page](/hex) for _hex_ here on this side, and thought a little bit about the next steps:

- I will obviously write a proper blog post about thus new project of mine, and explain the reasoning behind it a little bit better.
- I am thinking about reorganizing the source code into multiple .c files and generate an "amalgamation" file for compilation.
- I wouldn't mind implementing a simple virtual machine and a bytecode format for hex. I always wanted to do it, and this could be my chance as this project is simple enough.


### Day #16

I decided that I don't want to mamage a single .c file anymore, so it is finally time to split it. But! I still really like the idea that someone may find itt easier to embed if it's a single file (I know I do for things like SQLite!), so I created my own simple amalgamation script in Bash to concatenate all the files and preserve the original filenames and line numbers. For simplicity's sake I am using a single header file though (no need for more modular builds right now). Here goes:

```bash
#!/bin/bash

# Files to combine
header_file="src/hex.h"
source_files=(
    "src/stack.c" 
    "src/registry.c" 
    "src/error.c" 
    "src/help.c" 
    "src/stacktrace.c" 
    "src/parser.c" 
    "src/interpreter.c" 
    "src/helpers.c" 
    "src/symbols.c" 
    "src/main.c"
)
output_file="src/hex.c"

# Start with a clean output file
echo "/* *** hex amalgamation *** */" > "$output_file"

# Add the header file with a #line directive
echo "/* File: $header_file */" >> "$output_file"
echo "#line 1 \"$header_file\"" >> "$output_file"
cat "$header_file" >> "$output_file"
echo "" >> "$output_file"

# Add each source file with #line directives
for file in "${source_files[@]}"; do
    echo "/* File: $file */" >> "$output_file"
    echo "#line 1 \"$file\"" >> "$output_file"
    cat "$file" >> "$output_file"
    echo "" >> "$output_file"
done

echo "Amalgamation file created: $output_file"
```

This didn't take long... then I started working on a simple virtual machine, decided the opcodes and the bytecode format, and started the implementation. I didn't quite complete the generation part yet, but hopefully will be done soonish.

### Day #17

Perhaps I managed to implement a simple bytecode compiler for _hex_. It took a while, mostly due to my inexperience with C and pointers in particular, but I should have got the basics down.

Consider this example program that prints the numbers that can be divided by two:

```
(0x1 0x2 0x3 0x4)
    (
        "_n" :
        (_n 0x2 % 0x0 ==)
          (_n dec " is divisible by two." cat puts)
        when
    )
each
```

It is actually pretty comprehensive as far as syntax goes: you have integers, strings, quotations (even nested), native and user symbols.

The corresponding bytecode I am able to generate is this:

![hbx example](/images/dec-adv-2024/hbx-example.png)

Let's break it down:

```ruby
01          # Start header
68 65 78 01 # h e x 1
02          # End header
03          # PUSH quotation
00 00 00 04 # with four items
01          # PUSH integer
00 00 00 04 # of four bytes
01 00 00 00 # value: 1
01          # PUSH integer
00 00 00 04 # of four bytes
02 00 00 00 # value: 2
01          # PUSH integer
00 00 00 04 # of four bytes
03 00 00 00 # value: 3
01          # PUSH integer
00 00 00 04 # of four bytes
04 00 00 00 # value: 4
03          # PUSH quotation
00 00 00 05 # with five items
02          # PUSH string 
00 00 00 02 # of two bytes
5f 6e       # value: "_n"
10          # Symbol :
03          # PUSH quotation
00 00 00 05 # of five elements
00          # LOOKUP user symbol
00 00 00 02 # of two bytes
5f 6e       # value: _n 
01          # PUSH integer
00 00 00 04 # of four bytes
02 00 00 00 # value: 2
23          # Symbol %
01          # PUSH integer
00 00 00 04 # of four bytes
00 00 00 00 # value: 0
2a          # Symbol % 
03          # PUSH quotation
00 00 00 05 # of five elements
00          # LOOKUP user symbol
00 00 00 02 # of two bytes
5f 6e       # value: _n
36          # Symbol dec 
02          # PUSH string 
00 00 00 15 # of 21 bytes
20 69 73 20 # value: " is
64 69 76 69 # divi
73 69 62 6c # sibl
65 20 62 79 # e by
20 74 77 6f #  two
2e          # ."
3b          # Symbol cat
45          # Symbol puts
13          # Symbol when
42          # Symbol each
```

Phew... that's the whole lot. Again, this is my very first attempt at something like this. It doesn't look too bad: I am able to encode all types of tokens, and manage nested quotations, but there's still room for improvements:

- Every time I need to declare a size, I am taking up the full four bytes of an uint32_t number. In most cases one would be enough... I should implement variable-length encoding of some sort, but can live with it for now.
- Similarly, integers take up four bytes always, and the MSB is the first of the four (making it little-endian), which is a bit counter-intuitive maybe? Or perhaps it's fine.
- I am essentially encoding user symbols as strings. In similar cases, I noticed that folks tend to add a _symbol table_ after the header for lookups.

Despite these little things, it feels promising. Of course the next step is going to be the interpreter... more fun to come!

### Day #18

I managed to refine the bytecode generation algorithm a little bit *and* implement an interpreter that seems to work as expected!

So, for now:
- I implemented variable-length code using the [LEB128](https://en.wikipedia.org/wiki/LEB128) algorithm for sizes, and this makes storing sizes and integers more compact.
- Because this algorithm uses little-endian, I have decided to store all integers as little-endians.

The resulting bytecode for yesterday's example is now more compact:

```ruby
# Header
01 68 65 78 01 02 
# Quotation of four items
03 04 
   # 0x1
   01 01 01 
   # 0x2
   01 01 02 
   # 0x3
   01 01 03 
   # 0x4
   01 01 04 
# Quotation of five items
03 05 
   # "_n"
   02 02 5f 6e 
   10 # :
   # Quotation of five items
   03 05
      # _n
      00 02 5f 6e 
      # 0x2
      01 01 02 
      23 # %
      # 0x0
      01 01 00 
      2a # ==
   # Quotation of five items
   03 05 
      # _n
      00 02 5f 6e 
      36 # dec
      # " is divisible by two."
      02 15 20 69 73 20 64 69 76 69 73 69 62 6c 65 20 62 79 20 74 77 6f 2e 
      3b # cat
      45 # puts
   13 # when
42 #each
```
Not bad! Now I think I'll try to implement a symbol table next.
