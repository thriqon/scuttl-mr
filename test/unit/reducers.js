
import { sum, count } from '../../lib/reduce/builtins';
import { expect } from 'chai';

describe('unit/reducers', function () {
  describe('#sum', function () {
    it('calculates the sum of an empty array to 0', function () {
      expect(sum(null, [])).to.be.equal(0);
    });
    it('calculates the sum of a single item array to that value', function () {
      expect(sum(null, [2])).to.be.equal(2);
    });
    it('calculates the sum of a multi element array to the correct sum', function () {
      expect(sum(null, [1,2,3,4,5,6])).to.be.equal(1+2+3+4+5+6);
    });
    it('throws if one of the values is not a number', function () {
      expect(() => sum(null, [2,3, "str", 6])).to.throw();
    });
  });

  describe('#count', function () {
    it('calculates the number of elements correctly', function () {
      expect(count(null, [1,2,2,2], false)).to.be.equal(4);
      expect(count(null, [], false)).to.be.equal(0);
    });
    it('rereduces correctly', function () {
      expect(count(null, [2, 3], true)).to.be.equal(5);
    });
  });
});
