
module.exports =
  * tag: 'simple key-value docs'
    isValidParameterCombo: ->
      true
    parameters:
      startkey: [false, 0, 'zzz', 3]
      endkey: [false, 1, 3, 'zzz']
      skip: [0, 1, 2]
      inclusive_end: [false]
      limit: [0, 1, 2]
      descending: [true]
    docs:
      * _id: "foo"
        a: 1
      * _id: "bar"
        a: 2
      * _id: "baz"
        a: 3
    maps:
      * tag: "[a, _id]"
        map: (doc) ->
          emit(doc.a, doc._id)
      ...
  * tag: 'docs with tags'
    isValidParameterCombo: -> true
    parameters:
      startkey: ['a', 'test1', 'test2', 'zzz'],
      endkey: ['a', 'test1', 'test2', 'zzz'],
      inclusive_end: [false],
      limit: [3, 10],
      descending: [true],
    docs:
      * _id: "asd", akey: 1, tags: ['test1', 'test2']
      * _id: "bsd", akey: 2, tags: ['test1']
      * _id: "csd", akey: 3
    maps:
      * tag: "[tags, 1] summed",
        map: (doc) ->
          if doc.tags?
            doc.tags.forEach(-> emit(it, 1))
      ...


# vim: set expandtab:
