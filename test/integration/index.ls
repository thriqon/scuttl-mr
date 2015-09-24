
require! {
  pouchdb: PouchDB
  chai: { expect }
  '../../lib/execute': execute
  './specification': specifications
}


describe 'pouchdb vs hoppel' ->
  specifications.forEach (spec) ->
    describe "with testcase: #{spec.tag}" ->
      before ->
        @pouchdb = new PouchDB 'db', db: require('memdown')
        @docs = spec.docs
        @pouchdb.bulkDocs docs: this.docs
      after ->
        @pouchdb.destroy!
      spec.maps.forEach (mapObj) ->
        describe "using map tagged #{mapObj.tag}" ->

          parametersLists = []
          function appendParams paramNames, prevObj
            if paramNames.length is 0
              parametersLists.push prevObj if spec.isValidParameterCombo prevObj
            else
              k = paramNames[0]
              spec.parameters[k].forEach (parameterValues) ->
                nO = clone prevObj
                nO[k] = parameterValues
                appendParams paramNames.slice(1), nO
              appendParams paramNames.slice(1), clone(prevObj)

          appendParams Object.keys(spec.parameters), {}

          parametersLists.forEach (parameters) ->
            specify "with parameters #{JSON.stringify parameters} is the same answer" ->
              pouchDBMapObj = clone mapObj
              pouchDBMapObj.map = pouchDBMapObj.map.toString!
              if pouchDBMapObj.reduce
                pouchDBMapObj.reduce = pouchDBMapObj.reduce.toString!
              pouchdbAnswer = @pouchdb.query mapObj, parameters

              hoppelMap = "{map: #{mapObj.map.toString!}"
              if mapObj.reduce?
                hoppelMap += ", reduce: #{typeof mapObj.reduce is 'string' ? '"' + mapObj.reduce + '"' : mapObj.reduce.toString!}"
              hoppelMap += '}'
              hoppelAnswer = execute @docs, parameters, hoppelMap

              pouchdbAnswer
                .catch(-> rows: [])
                .then ->
                  expect(hoppelAnswer).to.be.deep.eql it.rows

function clone obj
  o = {}
  Object.keys(obj).forEach ->
    o[it] = obj[it]
  o

