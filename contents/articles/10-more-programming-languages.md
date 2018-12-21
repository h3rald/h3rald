-----
id: 10-more-programming-languages
title: "10 more programming languages worth checking out"
subtitle: "Another look at 10 non-mainstream programming languages, 10 years later"
content-type: article
timestamp: 1545358888
-----
It has been exactly 10 years today since I published my [10 programming languages worth checking out](/articles/10-programming-languages) article on this web site. 

Over the last 10 years I thought about writing another non-mainstream programming language roundup, but I never got around to it, until I looked at the date of the original article a few months ago, and I thought about publishing its sequel exactly 10 yearns afterwards.

The following 10 sections are devoted to 10 different programming languages. They are not numbered and they are presented in alphabetical order, because there's no winner in this list. Also, the number of people actively using these languages varies quite a lot, but none of these can be considered, at the time of writing, a _mainstream_ programming language like JavaScript, C, C++, Python or Ruby.

For each language, I included a brief overview, an example implementation of the _FizzBuzz_ problem (in most cases adapted from [RosettaCode](https://rosettacode.org/wiki/FizzBuzz)), and a collection of links to get started.

<hr />

### Crystal

_Fast as C, slick as Ruby_ &mdash; it pretty much sums it up. Crystal was first released in 2014, it is a Ruby-like programming that compiles to native code using [LLVM](https://llvm.org/), so it is faster than its popular, more-colorful ancestor.

If you already know Ruby and love its syntax, then you'll fall in love with Crystal and its metaprogramming capabilities, but you'll also like its dedicated syntax to integrate with native C code and the possibility to create standalone executable files just by running `crystal build myprogram.cr`

While no 1.0 version has been released yet, the language is quite popular. It comes with a [web framework](https://amberframework.org/), it has been used to create [games](https://medium.com/@alanwillms/you-should-write-your-next-game-with-crystal-f27306b63e3d), and someone even calls it [the most promising programming language of 2018](https://medium.com/@DuroSoft/why-crystal-is-the-most-promising-programming-language-of-2018-aad669d8344f). It is not backed by a big companies like some of the languages on this list, but this could be a good thing, after all.

#### Example FizzBuzz Implementation

```
1.upto(100) do |v|
  p fizz_buzz(v)
end
 
def fizz_buzz(value)
  word = ""
  word += "fizz" if value % 3 == 0
  word += "buzz" if value % 5 == 0
  word += value.to_s if word.empty?
  word
end
```

#### To get you started...

* [Official Web Site](https://crystal-lang.org/)
* [Official Forum](https://forum.crystal-lang.org/)
* [Wikipedia Page][wiki-crystal]
* [Awesome Crystal](https://github.com/veelenga/awesome-crystal)
* [Crystal Shards - a collection of awesome Crystal libraries](https://crystalshards.xyz/)

[wiki-crystal]:https://en.wikipedia.org/wiki/Crystal_(programming_language)

### Elixir

Elixir came about in 2011 as an effort to bring more extensibility, metaprogramming and a more [Ruby](https://www.ruby-lang.org/en/)-esque syntax to the [Erlang](https://www.erlang.org/) world. If you are already in love Ruby, but you'd like a little bit more oomph, you'll love Elixir: it runs on top of the Erlang virtual machine but it looks and feels like Ruby. 

Over the years Elixir steadily grew in popularity, reached a version 1.0, and it now provides really comprehensive documentation, a friendly community and a rich ecosystem of packages. Also, if you are looking for a Rails/Django/Express equivalent, the [Phoenix](https://phoenixframework.org/) framework has been used successfully in [many projects](https://medium.com/aviabird/10-amazing-open-source-elixir-phoenix-apps-e2c52ee25053).

Elixir is also considered a first-class citizen within the Erlang community: if you visit [hex.pm](https://hex.pm/), the title says _the package manager for the Erlang ecosystem_ and it tells you right away how to specify dependencies with Elixir and Erlang. 

If you always wanted to try out Erlang but never did because its syntax scared you, then Elixir can definitely help.

#### Example FizzBuzz Implementation

```
1..100 |> Enum.map(fn i ->
  cond do
    rem(i,3*5) == 0 -> "FizzBuzz"
    rem(i,3) == 0   -> "Fizz"
    rem(i,5) == 0   -> "Buzz"
    true            -> i
  end
end) |> Enum.each(fn i -> IO.puts i end)
```

#### To get you started...

* [Official Web Site](https://elixir-lang.org/)
* [Official Forum](https://elixirforum.com/)
* [Wikipedia Page][wiki-elixir]
* [Awesome Elixir](https://github.com/h4cc/awesome-elixir)
* [The hex package manager](https://hex.pm/)

[wiki-elixir]:https://en.wikipedia.org/wiki/Elixir_(programming_language)

### Elm

Elm was the last language I picked last for this list. I wasn't going to include it because it's not as general purpose as the other languages, as it is focused solely on web development and it transpiles to JavaScript, and there are [an awful lot of languages that do this](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS) nowadays.

The reason why I picked Elm in the end is because, unlike most of the languages that transpile to JavaScript (hey, I said _most_!), Elm has its own very distinct flavor and ecosystem. Also, it is very much a _batteries-included_ solution to develop web applications: there's no need for a JavaScript framework if you are using Elm, and if you embrace its philosophy and take full advantage of its extensive tooling, you won't suffer from [JavaScript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) anymore.

Elm offers static typing, [type inference](https://guide.elm-lang.org/types/), [pattern matching](https://guide.elm-lang.org/types/pattern_matching.html), [functors, applicative and monads](https://medium.com/@l.mugnaini/functors-applicatives-and-monads-in-pictures-784c2b5786f7). It kinda feels a bit like Haskell, but perhaps less daunting and more to-the-point: you are going to use it to build web applications after all.

#### Example FizzBuzz Implementation

```
import Graphics.Element exposing (show)
import List exposing (map)
 
main =
  map getWordForNum [1..100] |> show
 
getWordForNum num =
  if num % 15 == 0 then
    "FizzBuzz"
  else if num % 3 == 0 then
    "Fizz"
  else if num % 5 == 0 then
    "Buzz"
  else
    toString num
```

#### To get you started...

* [Official Web Site](https://elm-lang.org/)
* [Official Forum](https://discourse.elm-lang.org/)
* [Wikipedia Page][wiki-elm]
* [Awesome Elm](https://github.com/isRuslan/awesome-elm)
* [Elm packages](https://package.elm-lang.org/)

[wiki-elm]:https://en.wikipedia.org/wiki/Elm_(programming_language)

### Go

One of the most significant trends in the last 10 years is big companies creating and sponsoring their own programming languages. In 2009, Google created Go as a more modern substitute to C and C++. It provides [structural typing](https://en.wikipedia.org/wiki/Structural_type_system), memory safety, support for different programming paradigms, high performance and concurrency, and of course a friendlier syntax than C or C++.

One example of a successful application written in Go? [Docker](https://www.docker.com/) of course. Over the years Go has been used successfully to build almost anything, from web frameworks like [Revel](http://revel.github.io/), data stores like [InfluxDb](https://github.com/influxdata/influxdb) and very popular static site generators like [Hugo](https://gohugo.io/). 

If you want a fairly stable and well-rounded programming language for your next project, Go is a safe and powerful choice.

#### Example FizzBuzz Implementation

```
package main
 
import "fmt"
 
func main() {
    for i := 1; i <= 100; i++ {
        switch {
        case i%15==0:
            fmt.Println("FizzBuzz")
        case i%3==0:
            fmt.Println("Fizz")
        case i%5==0:
            fmt.Println("Buzz")
        default: 
            fmt.Println(i)
        }
    }
}
```

#### To get you started...

* [Official Web Site](https://golang.org/)
* [Official Forum](https://forum.golangbridge.org/)
* [Wikipedia Page][wiki-go]
* [Awesome Go](https://awesome-go.com/)
* [dep - Dependency Management for Go](https://golang.github.io/dep/)

[wiki-go]:https://en.wikipedia.org/wiki/Go_(programming_language)

### Julia

Julia started out in 2009 and reached its 1.0 release just a few months ago. It is written mainly in C except for its parser that is written in [FemtoLisp](https://github.com/JeffBezanson/femtolisp), a Scheme implementation developed by Julia's creator, Jeff Bezanson.

Perhaps among the most specialized programming languages in this list, Julia excels in scientific computing, data analysis and machine learning although it can still be used for more ordinary things like web development (thanks to its [Genie](http://genieframework.com/) framework). The first thing that comes to mind when people approach this language is why would you use it when [Python](https://www.python.org/) and [R](https://www.r-project.org/) already exist and are more mainstream (in the world of scientific computing). The answer seems to be predominantly performance, when compared to its direct competitors in the same space.

Sure, it's less mature and tooling probably is not quite on-par with Python, but over the years it is slowly gaining some momentum, especially after its recent 1.0 release. Also, the fact that it has FFIs to C, Fortran, Python, R and Java could probably tempt more scientists into a more step-by-step adoption.

#### Example FizzBuzz Implementation

```
for i in 1:100
    if i % 15 == 0
        println("FizzBuzz")
    elseif i % 3 == 0
        println("Fizz")
    elseif i % 5 == 0
        println("Buzz")
    else
        println(i)
    end
end
```

#### To get you started...

* [Official Web Site](https://julialang.org/)
* [Official Forum](https://discourse.julialang.org/)
* [Wikipedia Page][wiki-julia]
* [Awesome Julia](https://github.com/greister/Awesome-Julia)
* [Pkg - Julia Package Manager](https://pkg.julialang.org/)

[wiki-julia]:https://en.wikipedia.org/wiki/Julia_(programming_language)

### Kotlin

Born in 2011, Kotlin was originally JetBrains' attempt to create a language with cool features like functional programming support, extension methods, etc. but still compile very quickly compared to other JVM languages like Scala. As a bonus, Kotlin can also be compiled to JavaScript code.

Quite a few high-profile Android apps [have been migrated to Kotlin](https://appinventiv.com/blog/apps-migrated-from-java-to-kotlin) over the years, reporting various benefits ranging from being much more concise, safer and overall leading to more maintainable code than Java. Besides JetBrains, a few startups and companies are reportedly using Kotlin in production, such as Basecamp, Square, and Pinterest.

Although I have never been a big fan of the JVM, Kotlin is definitely one of the most innovative and trending languages running on it nowadays, and perhaps more well-known than its comparable contenders, like [Ceylon](https://ceylon-lang.org/) and [Xtend](https://www.eclipse.org/xtend/) &mdash; the so-called _second generation_ JVM languages.

#### Example FizzBuzz Implementation

```
fun fizzBuzz() {
    for (i in 1..100) {
        when {
            i % 15 == 0 -> println("FizzBuzz")
            i % 3 == 0 -> println("Fizz")
            i % 5 == 0 -> println("Buzz")
            else -> println(i)
        }
    }
}
```

#### To get you started...

* [Official Web Site](https://kotlinlang.org/)
* [Official Forum](https://discuss.kotlinlang.org/)
* [Wikipedia Page][wiki-kotlin]
* [Awesome Kotlin](https://github.com/KotlinBy/awesome-kotlin)

[wiki-kotlin]:https://en.wikipedia.org/wiki/Kotlin_(programming_language)

### Nim

Nim is the oldest language on this list, as it was born in 2008, so exactly 10 years ago, under the name of _Nimrod_. The intent of the author, Andreas Rumpf, was to name it after a [biblical king](https://en.wikipedia.org/wiki/Nimrod), little did he know that in the US the word is also a synonym for _idiot_ or similar, so the language was later renamed to _Nim_.

Anyhow, after 10 years, the Nim programming language hasn't reached version 1.0 yet, but according to the core team we are apparently _very close_.

Currently at version 0.19.0, Nim is quite stable and can be used in production as quite an efficient system programming language that compiles to C, but it looks and feels like Python. You may want to watch out for deprecations between one release and the other, but I've been using it for the last... _10 years_ and it has been a remarkable experience. I use Nim in my spare time in quite a few pet [projects](/projects/), including the [static site generator](https://hastysite.h3rald.com/) that currently powers this web site.

Want to know something else really cool written in Nim? The open source [Nim forum engine](https://github.com/nim-lang/nimforum) which is based on the [Karax](https://github.com/pragmagic/karax) SPA framework and the [Jester](https://github.com/dom96/jester) web server, both also written in Nim.

#### Example FizzBuzz Implementation

```
for i in 1..100:
  if i mod 15 == 0:
    echo("FizzBuzz")
  elif i mod 3 == 0:
    echo("Fizz")
  elif i mod 5 == 0:
    echo("Buzz")
  else:
    echo(i)
```

#### To get you started...

* [Official Web Site](https://nim-lang.org)
* [Official Forum](https://forum.nim-lang.org/)
* [Wikipedia Page][wiki-nim]
* [Awesome Nim](https://github.com/VPashkov/awesome-nim)
* [Nim Package Directory](https://nimble.directory/)

[wiki-nim]:https://en.wikipedia.org/wiki/Nim_(programming_language)


### Rust

Mozilla unveiled Rust in 2010, as an effort to create a high-performance system programming language comparable to C and C++ for performance, but easier to use and with more modern features common to high-level programming language.

After 8 years, portions of Firefox, Dropbox and Cloudflare are written in Rust, the [Piston](https://www.piston.rs/) open source game engine is written in Rust, and of course Mozilla's [Servo](https://servo.org/), a new browser engine that will probably make its way into Firefox in the near future.

There are quite a few articles online comparing Rust to Nim and Go. These three language are somewhat in the same space, being all born as system programming languages and addressing similar concerns. If you read these articles you'll see an almost equal percentage of wins and losses... there are pros and cons as in everything: Nim has the smallest community, Go probably the biggest; Nim syntax is practically Python, Go's is pretty easy as well, while Rust seems syntactically the closes to C/C++, and also arguably the most complex. But again, your mileage may vary.

#### Example FizzBuzz Implementation

```
use std::borrow::Cow;
fn main() {
    for i in 1..101 {
        println!("{}", match (i % 3, i % 5) {
            (0, 0) => "FizzBuzz".into(),
            (0, _) => "Fizz".into(),
            (_, 0) => "Buzz".into(),
            _ => Cow::from(i.to_string()),
        });
    }
}
```

#### To get you started...

* [Official Web Site](https://www.rust-lang.org/)
* [Official Forum](https://users.rust-lang.org/)
* [Wikipedia Page](https://en.wikipedia.org/wiki/Rust_(programming_language))
* [Awesome Rust](https://github.com/rust-unofficial/awesome-rust)
* [Crates - Rust Package Registry](https://crates.io/)


### Swift

Swift is Apple's answer to the prayers of many iOS app developers complaining that Objective-C was too hard to program with. It was first released in 2014 and it became very popular especially among iOS developers... in fact I don't believe it's used for anything else really.

Similarly, it doesn't run on Windows but only on Unixes (Darwin/Linux/FreeBSD), but typically 90% of its users are going to program in Swift using XCode on their macOS machine anyway.

While definitely a step up from Objective-C from a syntax and high-level features point of view, unlike most of the other languages on this list its niche is pretty much mobile apps, or better, _iOS_ apps. If I were to develop an iOS app today, I'd probably pick Swift as well.

#### Example FizzBuzz Implementation

```
for i in 1...100{
    var s:String?
    if i%3==0{s="Fizz"}
    if i%5==0{s=(s ?? "")+"Buzz"}
    print(s ?? i)
}
```

#### To get you started...

* [Official Web Site](https://swift.org/)
* [Official Forum](https://forums.swift.org/)
* [Wikipedia Page][wiki-swift]
* [Awesome Swift](https://github.com/matteocrippa/awesome-swift)

[wiki-swift]:https://en.wikipedia.org/wiki/Swift_(programming_language)

### Zig

Zig was born in 2016 and it hit its 0.3.0 release just a few months ago. The language positions itself in the already-crowded space of the next generation system programming languages, but there's a [rationale](https://github.com/ziglang/zig/wiki/Why-Zig-When-There-is-Already-CPP,-D,-and-Rust%3F) for it. 

It is essentially a much smaller, more minimalist alternative to Rust, C++, and D. Its syntax doesn't look as user-friendly as other languages on this list, but Zig seems to have a particular focus on being _safer_ than its competitors. It provides easy interoperability with C (_[...] Compatible with C libraries with no wrapper necessary. Directly include C .h files and get access to the functions and symbols therein._) and aims at targeting as many platforms as possible.

Could this be the holy grail, the true replacement of C? Only time will tell. It's way too soon to judge, but this new kid on the block is the last on this list, but one of the most promising.

#### Example FizzBuzz Implementation

```
fn fizzbuzz(n: usize) -> []u8 {
    var result: var = []u8{};
    {var i: usize = 1; while (i <= 100; i += 1) {
        if (i % 3 == 0 && i % 5 == 0) {
            result = result ++ "FizzBuzz\n";
        } else if (i % 3 == 0) {
            result = result ++ "Fizz\n";
        } else if (i % 5 == 0) {
            result = result ++ "Buzz\n";
        } else {
            var buf: [20]u8 = undefined;
            const len = io.buf_print_unsigned(usize, buf[0...], i);
            result = result ++ buf[0...len] ++ "\n";
        }
    }}
    return result;
}
```
_(adapted from [this gist](https://gist.github.com/andrewrk/6780fa252b693169897686e907c9da2a) by Andrew Kelly)_

#### To get you started...

* [Official Web Site](https://ziglang.org/)

### Epilogue

...And that's all, folks! Sorry if I missed your favorite language, I really am. But this is not really a competition, it's just a very opinionated article.

The one thing to take away from this article, along with a bunch of hopefully useful links, is that _none of these languages existed_ when I wrote [the original article](/articles/10-programming-languages) 10 years ago (except for Nim of course that already existed as _Nimrod_). This is remarkable. 10 years ago people were already going crazy on the then-just-launched Hacker News and Reddit every time a new programming language popped up. 

_Why bother?_ &mdash;They said. _Why did you create X when Y and Z already do the same thing?_

The answer is that creating a new programming language is sometimes the best strategy to solve a problem. Apple had a problem with Objective-C and created Swift, Mozilla needed something better than C++ to create their next generation browser, some people really loved Ruby but hated its inherent slowness and created Crystal and Elixir. All these extraordinary people and companies were bold enough to bet on something _completely new_ and be (relatively) successful.

We are living a new Golden Age of programming language design, and we should be grateful for this diversity, not pissed off. Learning a new programming language may feel pointless sometimes, but it is always rewarding to some level... so pick one of these and try it out, you won't be disappointed!
