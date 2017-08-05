-----
title: Introducing LiteStore
content-type: article
subtitle: A tiny, lightweight, self-contained, RESTful document store
timestamp: 1442779305
tags: webdevelopment|databases|litestore|opensource
-----
Lately I have become more and more interested in client-side single-page applications. Nowadays you can write your web apps in Javascript using your favorite framework, without any server-side logic, but you obviously still need:
   
   * some web service to retrieve and persist your application data.
   * a web server to serve the source code and the static assets of your web application.
  
NodeJS is probably one of the easiest backend to setup for prototyping SPAs. It is very easy to create a simple web server in Node and to implement a simple REST API using Express or a similar framework, but you still need to install node and write some code to wire up your backend.

I wanted something even more lazy then that. I wanted a fully _self-contained_ program able to:

  * Serve static files
  * Act as a simple JSON document store
  * Provide a simple REST API to work with
  * (bonus!) provide a way to pack web apps for easy distribution

...and that's how I ended up developing _LiteStore_.

[LiteStore](/litestore) is a lightweight, self-contained, RESTful, searchable, multi-format, NoSQL document store and web server. That sounds pretentious, but it is essentially an accurate description of what LiteStore is and does. 

It is built using the [Nim](http://nim-lang.org/) programming language and its Administration App (see below) is built using [Mithril](https://lhorie.github.io/mithril/), two relatively less-known projects, both of which I highly recommend if you want to take a break from more mainstream programming languages like C# or Java and Javascript frameworks like AngularJS or React.


### Downloading LiteStore

The easiest way to understand what LiteStore does, is to try it out. Simply download a release package from the [GitHub repo](https://github.com/h3rald/litestore) (or from [here](/litestore) for your convenience) that is suitable for your operating system and architecture.

The release package contains the following files:

* **litestore** / **litestore.exe** &mdash; The LiteStore executable.
* **LiteStore_UserGuide.html** &mdash; The official user guide describing the program, its usage, architecture, API, etc.
* **data.db** &mdash; The default data store file, containing the LiteStore Administration App.

That's all. No libraries to download, no installers, just an executable file. I love self-contained programs.

### Running LiteStore

To start a LiteStore server with the default settings:

1. Open a command prompt in the directory containing the LiteStore executable and the data.db data store file.
2. Enter **litestore** in the command prompt.

_or_ (on Windows):

1. Double-click **litestore.exe**

You should get a message similar to the following:

<samp>2015-09-20 @ 05:03:36    INFO: LiteStore v1.0.0 started on 127.0.0.1:9500.</samp>

...meaning that LiteStore is running on the specified address.

If you open a browser and type <http://localhost:9500> you should get the following JSON response:

```
{
    "version": "LiteStore v1.0.0",
    "datastore_version": 1,
    "size": "4.83 MB",
    "read_only": false,
    "log_level": "info",
    "directory": null,
    "mount": false,
    "total_documents": 77,
    "total_tags": 18,
    "tags": [
        { "$dir:admin": 77 },
        { "$format:binary": 14 },
        { "$format:text": 63 },
        { "$subtype:css": 3 },
        { "$subtype:html": 1 },
        { "$subtype:javascript": 36 },
        { "$subtype:octet-stream": 2 },
        { "$subtype:png": 8 },
        { "$subtype:svg+xml": 1 },
        { "$subtype:vnd.ms-fontobject": 1 },
        { "$subtype:x-font-otf": 1 },
        { "$subtype:x-font-ttf": 1 },
        { "$subtype:x-icon": 1 },
        { "$subtype:x-less": 10 },
        { "$subtype:x-markdown": 12 },
        { "$type:application": 41 },
        { "$type:image": 10 },
        { "$type:text": 26 }
    ]
}
```

Congrats, LiteStore is up and running!

### Digging Deeper...

LiteStore is, first and foremost, a RESTful document store. Think CouchDb or MongoDb, but smaller, much smaller. Here's basically what happens when you run the **litestore** command:

1. LiteStore checks for a file named **data.db** within the current directory and creates one if it doesn't exists.
2. LiteStore assumes that such file is a properly-formatted LiteStore data store file and tries to connect to it.
3. If all goes well, LiteStore starts a simple HTTP server on port 9500, ready to receive HTTP requests.

(The path of the data store file, the port, etc. are all configurable settings &mdash; run [litestore -h](class:cmd) for more details)

Now, if you access <http://localhost:9500> while LiteStore is running, you'll get JSON response listing some stats about the currently-loaded data store file, and some information on stored documents and tags, if any. The **data.db** file that ships with LiteStore already contains some documents. Well, actually it contains _a web application to administer LiteStore itself_.

### The LiteStore Administration App

Now try accessing the following URL:

<http://localhost:9500/docs/admin/index.html>

If all goes well, you should see the following page:

![Info](/images/litestore/litestore_info.png)

You are now viewing the LiteStore Administration App, a simple single-page application implemented on top of the [Mithril](https://lhorie.github.io/mithril/) Javascript framework. The cool part is that this application is stored within the **data.db** file and is being served by LiteStore itself.

The LiteStore Administration App is an example of single-page application developed for LiteStore: it uses pretty much all LiteStore functionalities that are exposes by the LiteStore REST API. 

On the home page you can see the same stats displayed on LiteStore root URL (<http://localhost:9500>), but you can also click any of the tag links to view documents by tag:

![Tag](/images/litestore/litestore_tag.png)

...and clicking a document title will display the document content and tags:

![Document](/images/litestore/litestore_doc.png)

Note that it is also possible to create, upload, edit or delete documents and manage tags:

![Document Operations](/images/litestore/litestore_doc_ops.png)

But perhaps the best feature of this web app (and of LiteStore itself) is the full-text search capability:

![Document Search](/images/litestore/litestore_search.png)

By leveraging LiteStore search API (which in turn leverages SQLite exceptional [FTS4 extension](https://www.sqlite.org/fts3.html)), it is pretty easy to build fast search-oriented web applications.

### Under the Hood

By now you are probably wonder how this whole thing can work. This is best explained with a simple exercise: let's export and re-import the Administration App!

First of all, stop the LiteStore instance by pressing <kbd>CTRL+C</kbd> within the prompt window.

Now execute the following command, from the same directory where you started LiteStore:

> %terminal%
>
> litestore -d:admin export

LiteStore will create a directory called [admin](class:dir). If you browse its contents, you will find the full source code and assets of the LiteStore Administration App (also available in the LiteStore [Github repo](https://github.com/h3rald/litestore/)).

Now delete the [data.db](class:file) file. Don't worry, you can always get a new one from a release package, at worst.

Run LiteStore again, with no parameters:

> %terminal%
>
> litestore 

If you access <http://localhost:9500> in your browser, you'll get the following response:

```
{
  version: "LiteStore v1.0.0",
  datastore_version: 1,
  size: "0.02 MB",
  read_only: false,
  log_level: "info",
  directory: null,
  mount: false,
  total_documents: 0,
  total_tags: 0,
  tags: [ ]
}
```

This is basically saying that the datastore file is empty. And indeed LiteStore just created a new data.db file. If you try accessing the URL of the Administration App (<http://localhost:9500/docs/admin/index.html>) you won't go very far:

```
{
  error: "Document 'admin/index.html' not found."
}
```

As expected, because the datastore file is empty.

Now stop LiteStore and execute the following command:

> %terminal%
>
> litestore -d:admin import

This command will import the contents of the [admin](class:dir) folder into the datastore file, creating documents and tags automatically.

If you run LiteStore again, you'll see that everything is back in order, and you can access the Administration App again.

### The HTTP REST API

The HTTP REST API exposed by LiteStore allows you to retrieve documents in their original content type, so for example:

* <http://localhost:9500/docs/admin/index.html> retrieves the contents of the [admin/index.html](class:kwd) document in HTML format.
* <http://localhost:9500/docs/admin/index.html?raw=true> retrieves the [admin/index.html](class:kwd) document in raw (JSON) format.

This is why when you access the first URL you are able to see the app.

Queries that return a list of documents, on the other hand, always return a JSON response. For example, <http://localhost:9500/docs?tags=$subtype:css&contents=false> returns all the documents whose subtype is set to [css](class:kwd) (without displaying their contents in this case):

```
{
    "tags": [
        "$subtype:css"
    ],
    "total": 3,
    "execution_time": 0.0005269999999999997,
    "results": [
        {
            "id": "admin/styles/bootstrap-theme.min.css",
            "created": "2015-09-20T06:23:10Z",
            "modified": null,
            "tags": [
                "$type:text",
                "$subtype:css",
                "$format:text",
                "$dir:admin"
            ]
        },
        {
            "id": "admin/styles/bootstrap.min.css",
            "created": "2015-09-20T06:23:10Z",
            "modified": null,
            "tags": [
                "$type:text",
                "$subtype:css",
                "$format:text",
                "$dir:admin"
            ]
        },
        {
            "id": "admin/styles/litestore.css",
            "created": "2015-09-20T06:23:10Z",
            "modified": null,
            "tags": [
                "$type:text",
                "$subtype:css",
                "$format:text",
                "$dir:admin"
            ]
        }
    ]
}
```

For all the details on the HTTP REST API, see [the guide](/litestore/LiteStore_UserGuide.htm#HTTP.API.Reference).

### Conclusion

LiteStore does not aim to be the _next big thing_ in the NoSQL document store landscape, but it shines when used as a simple and smart way to prototype single-page applications, or implement personal apps like a local Wiki. 

Personally, I use it whenever I have to prepare a quick demo for a proof-of-concept SPA, and I don't want to have to worry about the backend. The Administration App is a great starting point to see how to use the LiteStore API to build an application. Even if you don't have any experience with the Mithril framework (neither did I until I built this!), you can have a look at the [models.js](https://github.com/h3rald/litestore/blob/master/admin/js/models.js) file to see how to access pretty much every functionality exposed by the API. I also managed to wire up a quick and dirty AngularJS service to do something similar, and it wasn't too hard.

I hope some of you will find LiteStore useful and will give it a shot. If you want to contribute, feel free to fork the [repo](https://github.com/h3rald/litestore/) and send me a pull request. It would be great to have some [Mithril](https://lhorie.github.io/mithril/) or [Nim](http://nim-lang.org/) expert to have a look at this and improve it!


### Credits

Special thanks to the following individuals, communities and organizations that made LiteStore possible:

* Dwayne Richard Hipp and all the contributors to [SQLite](http://www.sqlite.org/), the true gem that powers LiteStore.
* Andreas Rumpf and all the contributors to the [Nim Programming Language](http://nim-lang.org/), used to develop LiteStore.
* Leo Horie, for creating the [Mithril Javascript Framework](https://lhorie.github.io/mithril/), used to develop the LiteStore Administration App.
* The creators and contributors to the [Bootstrap](http://getbootstrap.com/) CSS and Javascript framework, used by the LiteStore Administration App.
* The creators and contributors to the [Ace Editor](http://ace.c9.io/), used by the LiteStore Administration App.
* Cristopher Jeffrey and all the contributors to the [Marked Javascript Library](https://github.com/chjj/marked) used by the LiteStore Administration App.


