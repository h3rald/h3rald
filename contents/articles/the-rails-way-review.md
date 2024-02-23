-----
title: "Book Review: The Rails Way"
content-type: article
timestamp: 1231056180
tags: "rails|books|review"
-----
> "Programming books are pointless: you buy them, you read them and you chuck them because they're already out-of-date!"

This is a quote from my fiancée, who always pointed out the ephemeral nature of programming books and therefore _highly discouraged me_ from buying any more. The sad thing is that this is partly true: if you buy a new programming book it _will_ eventually become outdated pretty quickly, especially if it's about newish technologies like [Ruby on Rails](http://rubyonrails.org/).  

_[The Rails Way](http://www.informit.com/store/product.aspx?isbn=0321445619)_ is no exception: Rails 2.2 has been out for a while and introduced a few new features &ndash; most notably Internationalization support &ndash; which are not mentioned neither in this book nor in others.


That being said, _The Rails Way_ by [Obie Fernandez](http://obiefernandez.com/) is still the best and most comprehensive book on Rails v2 currently on the market. It's the book you simply cannot afford to ignore, if you are using (or are planning to use) this popular Ruby web framework.

### Contents

<div style="float:right"><img src="/files/therailsway.jpeg" alt="cover" /></div>

Before proceeding any further, I'd like to point out that is probably one of the longest programming books I've ever come across. With its 910 pages, _The Rails Way_ definitely cannot fit in your pocket and you cannot take it around with you easily. It's a book made to sit on your desk constantly and remain there, ready to be accessed at the right time, when needed. 
Unlike with other books I reviewed, this time I won't even attempt to go through every chapter and every section: it would not be meaningful for the review and it will probably bore you to death. For completeness' sake, however, here's a very trimmed-down table of contents listing _only_ the first level headings:

* Introduction
* Chapter 1 - Rails Environment and Configurations  
* Chapter 2 - Working with Controllers  
* Chapter 3 - Routing  
* Chapter 4 - REST, Resources, and Rails  
* Chapter 5 - Reflecting on Rails Routing  
* Chapter 6 - Working with ActiveRecord  
* Chapter 7 - ActiveRecord Associations  
* Chapter 8 - ActiveRecord Validations  
* Chapter 9 - Advanced ActiveRecord  
* Chapter 10 - ActionView  
* Chapter 11 - All About Helpers  
* Chapter 12 - Ajax on Rails  
* Chapter 13 - Session Management  
* Chapter 14 - Login and Authentication  
* Chapter 15 - XML and ActiveResource  
* Chapter 16 - ActionMailer  
* Chapter 17 - Testing  
* Chapter 18 - RSpec on Rails  
* Chapter 19 - Extending Rails with Plugins  
* Chapter 20 - Rails Production Configurations  
* Chapter 21 - Capistrano  
* Chapter 22 - Background Processing  
* Appendix A ActiveSupport API Reference
* Appendix B Rails Essentials
* Afterword What Is the Rails Way (To You)?

If you already know _Rails_, these titles will be self-explanatory to you. If not, you'll just have to trust my words when I say that this book covers every possible aspect of the framework, and 99% of the notions you need to know to start developing almost any Rails-powered web application.

What really pleased me were chapters 17 through 22, i.e. something _not_ strictly related to Rails Core. Normally, books about Ruby and Ruby on Rails don't deal with anything even a little bit outside their scope: as a result, topics such as Rubygems, RSpec and Capistrano are often not mentioned at all, or if they are, they are relegated to one or two pages at maximum, leaving the reader to look on the Internet for more information. 
By contrast, _The Rails Way_ covers these ancillary but still very important topics very in-depth. Sure, you won't know the inside-out of RSpec after reading this book (although a whole chapter is devoted to it), but you will certanly know your way around it _enough_ to use it properly.

What's missing in this book then? Maybe a _Chapter 0_ to guide the absolute beginner through the very basics of Rails and Ruby. Probably this goes beyond the scope of the book though, as the author clearly states that the book _"[...] is not a tutorial or basic introduction to Ruby or Rails. It is meant as a day-to-day
reference for the full-time Rails developer. "_. 
Still, 100 pages about the Magic of Scaffolding & other tricks to astonish the children wouldn't have damaged the book, especially considering that Chapter 1 starts at page _60_ after a lot of _pages intentionally left blank_, Introduction, Foreward, Acknowledgements and similar padding material.

### Organization and writing style

> "Before going on, I should mention that part of what makes Rails exceptional is that it is opinionated software, written by opinionated programmers. Likewise, this is an opinionated book, written by opinionated writers."

This sentence in the _Introduction_ sounded very familiar. Almost an echo of Zed Shaw's own words in the _[Mongrel Digital Shortcut](/articles/mongrel-shortcut-review)_. After all this book is part of the _[Addison-Wesley Professional Ruby Series](http://www.informit.com/imprint/series_detail.aspx?ser=2124042)_, of which Obie is the Series Editor.
Like the other books in the series, this book contains all the stylistic conventions and distinctive features which make them very enjoyable to read:

* *Informal, almost personal style* &ndash; reading this book is almost like hearing Obie telling you what _he_ thinks about Rails, and sharing with you his own tips and tricks.
* *Honest, even humble at times* &ndash; This book doesn't glorify Rails or Ruby: on the contrary, pitfalls are acknowledged and dealt with. Rails lacks an inbuilt authentication system? No problem, a whole chapter is devoted to the _act\_as\_authenticated_ plugin. You almost feel it's part of the core itself.
* _"[Person] says" sidebars_ &ndash; The book's co-authors occasionally have their saying in special sidebars, all throughout the book. A way to evaluate different opinions and take a break from the book's main flow.
* _Code snippets_ &ndash; Not too many, not too few, just about the right amount. Granted, you won't find any sample application in this book, but the snippets provided are more than enough to get to the point.

Although this book is meant to be a reference, this doesn't mean it only contains reference material, it means that if you don't know about a particular feature of Rails or its satellites (Capistrano, RSpec, testing in general, etc.) you can open the book at any chapter and read through an in-depth discussion which will, most likely, answer all your questions.  

Even if what you're looking for is not strictly related to Rails but can just _be used with it_, you'll find it in the book. Some examples include a 23-page-long exhaustive dissertation on [Prototype](http://www.prototypejs.org/), a whole Chapter on RSpec, another on Capistrano and even information on XML parsing through REXML.

What you won't find in the book, unfortunately, is how to get something which was not meant to be seamless integrated with Rails to work, like [JQuery](http://jquery.com/), for example. But again, this is understandable, as such topics would have made the book three times longer, at least.

### Some constructive criticism

As a technical writer, I was somehow unhappy of the way reference material was presented in the book, i.e. more or less as ordinary chunks of text:

><code>execute(sql_statement)</code>  
Executes the SQL statement provided in the context of this connection. This method is abstract in the DatabaseStatements module and is overridden by specific database adapter implementations. As such, the return type is a result set object cor-
responding to the adapter in use.

><code>insert(sql_statement)</code>  
Executes an SQL INSERT statement and returns the last autogenerated ID from the affected table.

You'll find plenty of pages like this in the book. Although all essential the information about each specific method is there, it is not organized properly. When I'm coding and I want to look up something quick, chances are that I can just hop over to [APIdock](http://apidock.com/rails) or other similar services and query Rails documentation in a much more efficient way.  
On the other end, if reference material was added for completeness' sake, it would have been much better included at the end of the book, more succinctly, through some carefully constructed reference tables. If the aim was instead to help the reader memorize all the method he _must_ know to work productively with Rails everyday, the author should have included some diagrams or any other type of visual aid.

Similarly, the _Stack Checklist_ included in Chapter 20 is not actually a list at all, but rather a sequence of titled paragraphs which is definitely a good read _the first time_, but it won't be as useful when you need to just refresh your memory.

I admit, I noticed these things because part of my daily job as Technical Writer consists in making sure that reference material is well presented in the most minimalist, direct and useful way to the reader. Maybe a year ago I wouldn't have thought anything of it, but now I felt compelled to point this out hoping the next edition of the book will deal also with this aspect of the book. 

Since the book came out in 2007, the organization and presentation of Rails Documentation has been significantly improved by third-party services: I hope the authors and editors will try to make sure, next time, that the reference material is more _usable_ by the readers.

### Conclusion

Overall, the book is a good read. It's even possible to read it sequentially (even if the author discourages this practice) and still get the most out of it &ndash; a rare trait in programming books nowadays.  
No other book will go so in-depth about Rails or about everything you need to know to get your site up and running in a_real_ production environment. That's the reason why _The Rails Way_is the perfect companion for web development professionals who must ensure their applications are tuned up to perform and scale well.

This doesn't mean that beginners should be discouraged from reading this book, quite the opposite. This is actually the only book newcomers to Rails need once they are done reading all those awesome beginner-oriented tutorials freely available on the Internet. Everyone interested in Rails, at some point, has to follow _The Rails Way_.


