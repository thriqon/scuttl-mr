
import { default as filter, isBetween } from '../../lib/filter_by_interval';
import { expect } from 'chai';

describe("unit/filter_by_interval", function () {
  beforeEach(function () {
    this.nonTrivialTestCase = [
    {"id":"1","key":1},
    {"id":"2","key":1},
    {"id":"3","key":2},
    {"id":"4","key":2}
    ];
  });
  it('filters nothing when relevant parameters are not set', function () {
    var arr = [{key: 2, id: "1"}, {key: 3, id: "1"}];
    expect(filter({}, arr)).to.deep.eql(arr);
  });
  it('omits values with a key after 5', function () {
    var arr = [{key: 4, id: "1"}, {key: 6, id: "1"}];
    expect(filter({endkey: 5}, arr)).to.deep.eql([{key: 4, id: "1"}]);
  });
  it('omits values with a key before 5', function () {
    var arr = [{key: 4, id: "1"}, {key: 6, id: "1"}];
    expect(filter({startkey: 5}, arr)).to.deep.eql([{key: 6, id: "1"}]);
  });
  it('omits values with a key not within [5..7]', function () {
    var arr = [{key: 4, id: "1"}, {key: 6, id: "1"}, {key: 8, id: "1"}];
    expect(filter({startkey: 5, endkey: 7}, arr)).to.deep.eql([{key: 6, id: "1"}]);
  });
  it('honors inclusive end', function () {
    var arr = [{key: 4, id: "1"}, {key: 5, id: "1"}];
    expect(filter({endkey: 5, inclusive_end: true}, arr)).to.deep.eql(arr);
  });
  it('honors exclude end', function () {
    var arr = [{key: 4, id: "1"}, {key: 5, id: "1"}];
    expect(filter({endkey: 5, inclusive_end: false}, arr)).to.deep.eql([{key: 4, id: "1"}]);
  });
  it('includes keys equal to startkey', function () {
    var arr = [{key: 4, id: "1"}, {key: 6, id: "1"}];
    expect(filter({startkey: 4}, arr)).to.deep.eql([{key: 4, id: "1"}, {key: 6, id: "1"}]);
  });
  it('skips the given number of rows', function () {
    expect(filter({skip: 2}, this.nonTrivialTestCase)).to.deep.eql([{id: "3", key: 2}, {id: "4", key: 2}]);
  });
  it('limits the results to the given nmber', function () {
    expect(filter({limit: 2}, this.nonTrivialTestCase))
      .to.deep.eql([
          {id: "1", key: 1},
          {id: "2", key: 1}
      ]);
  });
  describe('when compared with CouchDB', function () {
    it('gives the same results when queried without options', function() {
      expect(filter({}, this.nonTrivialTestCase)).to.deep.eql(this.nonTrivialTestCase);
    });
    it('gives the same results when queried with startkey 2', function () {
      expect(filter({startkey: 2}, this.nonTrivialTestCase)).to.deep.eql(this.nonTrivialTestCase.filter(function (x) { return x.key === 2; }));
    });
  });

  describe('isBetween', function () {
    it('asserts that {key: 5} is between [3] and [10]', function () {
      expect(isBetween(3, {key: 5}, 10, false, 1)).to.be.true;
    });
    it('asserts that {key: 5} is not between [1] and [2]', function () {
      expect(isBetween(1, {key: 5}, 2, false, 1)).to.be.false;
    });
  });
});
