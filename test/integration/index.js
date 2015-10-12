

function buildParametersList(parameters, spec) {
  let parametersLists = []

  function appendParams(paramNames, prevObj) {
    if (paramNames.length === 0) {
      if (spec.isValidParameterCombo(prevObj)) {
        parametersLists.push(prevObj);
      }
    } else {
      let k = paramNames[0];
      spec.parameters[k].forEach(function(parameterValues) {
        let nO = clone(prevObj);
        nO[k] = parameterValues;
        appendParams(paramNames.slice(1), nO);
      });
      appendParams(paramNames.slice(1), clone(prevObj));
    }
  }

  appendParams(Object.keys(parameters), {});
  return parametersLists;
}

function buildPouchdbQuery(parameters, mapObj) {
  let pouchDBMapObj = clone(mapObj);
  pouchDBMapObj.map = pouchDBMapObj.map.toString();

  let reducer = parameters.reduce_fun || mapObj.reduce;
  if (reducer) {
    pouchDBMapObj.reduce = reducer.toString();
  }
  return pouchDBMapObj;
}

function buildHoppelQuery(parameters, mapObj) {
  let hoppelMap = "{map: " + mapObj.map.toString();
  let reducer = parameters.reduce_fun || mapObj.reduce;
  if (reducer) {
    if (typeof reducer === 'string') {
      hoppelMap += ', reduce: "' + reducer + '"';
    } else {
      hoppelMap += ', reduce: ' + reducer.toString();
    }
  }
  hoppelMap += '}';
  return hoppelMap;
}

function simplifyPouchdbDocs(docs) {
  docs.rows
    .filter(x => x.doc)
    .forEach(row => delete row.doc._rev);
  return docs;
}

function clone(obj) {
  let o = {};
  Object.keys(obj).forEach(k => o[k] = obj[k]);
  return o;
}

import PouchDB from 'pouchdb';
import { expect } from 'chai';
import execute from '../../lib/execute';
import specifications from './specification';

describe('pouchdb vs hoppel', function () {
  specifications.forEach(function (spec) {
    describe("with testcase: " + spec.tag, function () {
      before(function () {
        this.pouchdb = new PouchDB('db', {db: require('memdown')});
        this.docs = spec.docs;
        return this.pouchdb.bulkDocs({docs: this.docs});
      });
      after(function () {
        return this.pouchdb.destroy();
      });
      spec.maps.forEach(function (mapObj) {
        describe("using map tagged " + mapObj.tag, function () {
          buildParametersList(spec.parameters, spec)
            .forEach(function (parameters) {
              describe("with parameters " + JSON.stringify(parameters), function () {
                it("gives the same answer", function () {
                  let pouchdbQuery = buildPouchdbQuery(parameters, mapObj);
                  let hoppelQuery = buildHoppelQuery(parameters, mapObj);

                  return Promise.all([
                    execute(this.docs, parameters, hoppelQuery),
                    this.pouchdb.query(pouchdbQuery, parameters)
                      .catch(() => ({rows: []}))
                      .then(simplifyPouchdbDocs)
                      .then(docs => docs.rows)
                  ]).then(([hoppel, pouchdb]) => expect(hoppel).to.be.deep.eql(pouchdb));
                });
              });
            });
        });
      });
    });
  });
});
