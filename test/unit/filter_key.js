
import { default as filter } from '../../lib/filter_by_key';
import { expect } from 'chai';

describe("unit/filter_by_key", function () {
  beforeEach(function () {
    this.nonTrivialTestCase = [
    {"id":"1","key":1},
    {"id":"2","key":4},
    {"id":"3","key":3},
    {"id":"4","key":4}
    ];
  });
  it('gives the documents with the given keys', function () {
    let arr = [{key: 3, id: "3"}, {key: 1, id: "1"}];
    expect(filter({keys: [3, 1]}, this.nonTrivialTestCase)).to.deep.eql(arr);
  });

  it('gives the documents with the given key', function () {
    let arr = [{key: 4, id: "2"}, {key: 4, id: "4"}];
    expect(filter({keys: [4]}, this.nonTrivialTestCase)).to.deep.eql(arr);
  });
});
