## H3RALD Web Site

H3RALD.com was created in 2004 by Fabio Cevasco, a technical writer, programmer and IT enthusiast. It features over a hundred [articles](/articles/) covering a wide range of topics, from programming to writing, productivity and even traveling.

Currently, this site is fully static (minus a few AJAX calls) and is powered by the [HastySite](https://h3rald.com/hastysite/) static site generator.


### Licensing

Unless stated otherwise, all the content published on this web site is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 

The source code of this web site, such as its layout, stylesheets, custom min rules and code is licensed under the terms of the MIT License.

### How to generate and run this site locally

1. Download and install [Nim](https://nim-lang.org).
2. Clone [Nifty](https://github.com/h3rald/nifty/), compile it and place the **nifty** executable in your $PATH.
3. Clone [nimhttpd](https://github.com/h3rald/nimhttpd/), compile it and place the **nimhttpd** executable in your $PATH.
4. Clone [HastySite](https://github.com/h3rald/hastysite/).
5. Run `nifty install` in the hastysite repository folder.
6. Compile hastysite and place its executable in your $PATH.
7. Clone this repository.
8. In the h3rald repository folder, run `hastysite build`.
9. Start LiteStore by running **litestore** in the h3rald repository folder.
10. Start the NimHTTPd server by running **nimhttpd** in the output folder of the h3rald repository (create automatically when running `hastysite build`).


### Credits

* [David J. Perry](http://scholarsfonts.net/), who designed the [Cardo](http://scholarsfonts.net/cardofnt.html) font used for the H3RALD logo.
* [Matt McInerney](https://www.theleagueofmoveabletype.com/members/matt), who designed the [Raleway](https://www.theleagueofmoveabletype.com/raleway) font, used throughout this web site.
* [atypo](http://atipo.es/en/), who designed the [Noway](http://atipofoundry.com/fonts/noway) font, used throughout this web site.
* [Daniel Bruce](http://www.danielbruce.se/), designer of the [Entypo](http://www.entypo.com/) font, used for the icons on this web site.

