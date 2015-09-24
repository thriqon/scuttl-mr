
Hoppel
======

[![Build Status](https://travis-ci.org/thriqon/hoppel.svg)](https://travis-ci.org/thriqon/hoppel)

Pretty CouchDB-compliant MapReducer implemented in JS.

Installation
------------

```shell
npm install --save hoppel
```

API
---

```javascript
//var hoppel = require('hoppel');
var hoppel = require('./dist/hoppel');

var docs = [
  {
    _id: "i1",
    a: 2
  },
  {
    _id: "i2",
    a: 3
  },
  {
    _id: "i3",
    a: 4
  }
];

var params = {
  startkey: 3
};

var view = "{map: function (doc) {emit(doc.a, [doc._id]);}}";

var results = hoppel(docs, params, view);

var assert = require('assert');
assert.deepEqual(results, [
  {key: 3, value: ["i2"], id: "i2"},
  {key: 4, value: ["i3"], id: "i3"}
]);

```

License
-------

Copyright (c) 2015, Jonas Weber

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.


