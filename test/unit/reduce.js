
import reduce from '../../lib/reduce';
import applyDefaultParams from '../../lib/default-params';
import { expect } from 'chai';

describe('unit/reduce', function () {
  beforeEach(function () {
    this.params = applyDefaultParams({});
  });
  describe('with custom functions', function () {
    it('reduces to an empty array when no documents are given', function () {
      expect(reduce(this.params, function () {}, []))
        .to.be.eql([]);
    });

    it('reduces a one document array to a null key and value 1', function () {
      expect(reduce(this.params, function () {return 1;}, [{key: 0, value: 2, id: "3"}]))
        .to.be.eql([{key: null, value: 1}]);
    });
  });
  describe('with built-ins', function () {
    beforeEach(function () {
      this.docs = [
        {key: 0, value: 2, id: "3"},
        {key: 0, value: 3, id: "3"},
        {key: 0, value: 4, id: "3"}
      ];
    });
    it('reduces docs via _sum', function () {
      expect(reduce(this.params, '_sum', this.docs))
        .to.eql([{key: null, value: 9}]);
    });

    it('reduces docs via _count', function () {
      expect(reduce(this.params, '_count', this.docs))
        .to.eql([{key: null, value: 3}]);
    });

    it('reduces docs via _stats', function () {
      expect(reduce(this.params, '_stats', this.docs)[0].value.sumsqr)
        .to.equal(4 + 9 + 16);
    });
  });
});
