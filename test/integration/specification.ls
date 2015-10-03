
module.exports =
  * tag: 'simple key-value docs'
    isValidParameterCombo: ->
      true
    parameters:
      startkey: [false, 0, 'zzz', 3]
      endkey: [false, 1, 3, 'zzz']
      skip: [0, 1, 2]
      inclusive_end: [false]
      include_docs: [true]
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
  * tag: 'summing numbers'
    isValidParameterCombo: (x) ->
      if x.group_level?
        x.reduce && x.group
      else if x.group?
        x.reduce
      else
        true
    parameters:
      reduce: [false]
      startkey: [1]
      endkey: [1]
      group_level: [0,1]
      group: [true]
      reduce_fun: ["_sum", "_count", "_stats"]
    docs:
      * _id: "asd", key: 0, n: 1
      * _id: "bsd", key: 2, n: 3
      * _id: "csd", key: 0, n: 5
    maps:
      * tag: "[summing n]"
        map: (doc) -> emit(doc.key, doc.n)
        reduce: (keys, values) ->
          sum = 0
          for x of values
            sum += parseInt x, 10
          sum
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

