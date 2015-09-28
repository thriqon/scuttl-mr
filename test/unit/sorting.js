
import { default as sort, MIN, MAX} from '../../lib/sort';

var chai = require('chai');
var couchdbDocFixture = require('./sorting-fixture');

// adapted from http://stackoverflow.com/a/12646864
function shuffleArray(array) {
  array = array.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

describe("unit/sort", function () {
  beforeEach(function () {
    this.testCase = shuffleArray(couchdbDocFixture.docs);
    this.simpleCase = [{}, [], "", 4, 5, true, false, null];
    this.stringCase = ["AAA", "aaa", "aab"];
  });
  it('sorts the array correctly', function () {
    chai.expect(this.testCase.sort(sort)).to.deep.eql(couchdbDocFixture.docs);
  });
  it('sorts the array correctly once more', function () {
    chai.expect(this.testCase.sort(sort)).to.deep.eql(couchdbDocFixture.docs);
  });

  it('sorts null before everything', function () {
    chai.expect(this.simpleCase.sort(sort)[0]).to.be.eql(null);
  });
  it('sorts false after null', function () {
    chai.expect(this.simpleCase.sort(sort)[1]).to.be.eql(false);
  });
  it('sorts true after false', function () {
    chai.expect(this.simpleCase.sort(sort)[2]).to.be.eql(true);
  });
  it('sorts 4 after true', function () {
    chai.expect(this.simpleCase.sort(sort)[3]).to.be.eql(4);
  });
  it('sorts 5 after 4', function () {
    chai.expect(this.simpleCase.sort(sort)[4]).to.be.eql(5);
  });
  it('sorts strings lowercase first', function () {
    chai.expect(this.stringCase.sort(sort)).to.be.eql(["aaa", "aab", "AAA"]);
  });
  it('sorts arrays', function () {
    var array = [[2], [1,2,3], []];
    chai.expect(array.sort(sort)).to.be.eql([
        [], [1,2,3], [2]
    ]);
  });
  it('sorts empty objects before other objects with more keys', function () {
    var array = [
    {b: 1, a: 1}, {a: 2},
    {}, {a: 3}, {b: 4}
    ];
    var expectedRes = [
    {},
    {"a":2},
    {"a":3},
    {"b":1,"a":1},
    {"b":4}
    ];
    chai.expect(array.sort(sort)).to.be.eql(expectedRes);
  });
  it('sorts objects regardless of the position of their keys', function () {
    var array = [
    {key: {b: 2, a: 1}}, {key: {a: 1, b: 1}}
    ];
    chai.expect(array.sort(sort)).to.be.eql([
        {key: {a: 1, b: 1}}, {key: {a: 1, b: 2}}
    ]);
  });
  it('sorts strange unicode strings correctly', function () {
    var array = [
    {key: "\u2830"}, {key: "\u2230"}
    ];
    chai.expect(array.sort(sort)).to.be.eql([{key: "\u2230"}, {key: "\u2830"}]);
  });
  it('sorts numbers correctly', function () {
    var array = [
    {key: 1E-20}, {key: 0.01}
    ];
    chai.expect(array.sort(sort)).to.be.eql([{key: 1E-20}, {key: 0.01}]);
  });
  it('sorts MAX after objects', function () {
    var array = [{key: MAX}, {key: {}}];
    chai.expect(array.sort(sort)[1].key).to.be.equal(MAX);
  });
  it('sorts MIN before null', function () {
    var array = [{key: null}, {key: MIN}];
    chai.expect(array.sort(sort)[0].key).to.be.equal(MIN);
  });
  it('sorts arrays correctly', function () {
    chai.expect([[1, "2"], [1, "0"]].sort(sort)).to.be.eql([[1, "0"], [1, "2"]]);
  });
});
