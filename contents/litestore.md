-----
title: "LiteStore"
content-type: project
github: litestore
home: /litestore/
active: true
docs: /litestore/LiteStore_UserGuide.htm
ci: true
version: 1.11.0
subtitle: "A tiny NoSQL database for rapid prototyping"
summary: "A lightweight, self-contained, RESTful, multi-format NoSQL document store server written in Nim and powered by a SQLite backend for storage."
download: "https://github.com/h3rald/litestore/releases/download/"
-----

LiteStore is a lightweight, self-contained, RESTful, multi-format NoSQL document store server written in [Nim](http://nim-lang.org) and powered by a [SQLite](http://www.sqlite.org) backend for storage. It aims to be a very simple and lightweight backend ideal for prototyping and testing REST APIs and client-side, single-page applications and web apps. 

### Key Features

Despite being fairly small and self-contained, LiteStore comes with many useful features that are essential for many use cases.

#### Multi-format Documents

LiteStore can be used to store documents in virtually any format, as long as you specify an appropriate content type for them. Textual documents are stored as-is, while binary documents are base64-encoded (not the best thing in the world, but definitely the easiest and most portal option).

#### Document Tagging

You can add custom tags to documents to easily categorize them and retrieve them. Some system tags are also added automatically to identify the document content type, format and collection.

#### Enhanced Querying of JSON documents

By leveraging the [SQLite JSON1 extension](https://www.sqlite.org/json1.html) and implementing custom query string parsing, LiteStore provides enhanced filtering, ordering, and custom field selection of JSON documents. Additionally, you can also configure custom indexes specifying JSON fields for extra speed!

#### Full-text Search

By leveraging [SQLite FTS4 extension](http://www.sqlite.org/fts3.html) and implementing an enhanced algorithm for result rankings, LiteStore provides full-text search for all textual documents out-of-the-box.

#### RESTful HTTP API

Every operation can be performed on the data store using a simple but powerful RESTful HTTP API, perfect for client-side, single-page applications.

#### JWT-based Authorization

LiteStore can be configured to validate [JWT](https://jwt.io/) tokens and configure access to specific resources based on specific [OAuth2 scopes](https://oauth.net/2/scope/).

#### Middleware

By leveraging the [duktape](https://duktape.org/) library, you can create your own middleware functions in JavaScript to perform additional tasks (validation, logging, data aggregation...) before accessing data.

#### Multiple Data Stores

LiteStore can be configured to manage more than one SQLite file through the same process. At run time, it will be possible to access data stored in each store but also add and remove stores.

#### Nim API

If you want, you can use LiteStore as a [Nim](https://nim-lang.org/) library and perform data store operations from your own Nim program.

#### Command-line API

Every operation can also be performed from command line, using the `litestore execute` command.

#### Directory Bulk Import/Export

To make serving a single-page application from LiteStore even easier and faster, you can automatically import (and export) the contents of a directory recursively.

#### Directory Mounting and Mirroring

After importing the contents of a directory into a LiteStore data store, you can mount it on LiteStore and mirror all data store changes to the filesystem. Incidentally, that’s how most of the LiteStore Admin test app was built .


Wanna know more? [&rarr; read the User Guide](/litestore/LiteStore_UserGuide.htm)!

### Downloads

* [macOS (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_macosx_x64.zip)
* [Linux (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_linux_x64.zip)
* [Windows (x64)]({{$download}}v{{$version}}/{{$github}}_v{{$version}}_windows_x64.zip)

### Resources

* [Introducing LiteStore](/articles/litestore/)
