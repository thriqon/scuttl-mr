
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
});
