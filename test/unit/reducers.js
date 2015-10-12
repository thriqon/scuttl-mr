
import { sum, count, stats } from '../../lib/reduce/builtins';
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

  describe('#stats', function () {
    before(function () {
      this.result = stats(null, [1, 2, 6, 4], false);
      this.result2 = stats(null, [0, 5], false);
      this.reresult = stats(null, [this.result, this.result2], true);
    });
    it('calculates the sum', function () {
      expect(this.result.sum).to.be.equal(13);
      expect(this.reresult.sum).to.be.equal(18);
    });
    it('calculates the min', function () {
      expect(this.result.min).to.be.equal(1);
      expect(this.reresult.min).to.be.equal(0);
    });
    it('calculates the max', function () {
      expect(this.result.max).to.be.equal(6);
      expect(this.reresult.max).to.be.equal(6);
    });
    it('calculates the count', function () {
      expect(this.result.count).to.be.equal(4);
      expect(this.reresult.count).to.be.equal(6);
    });
    it('calculates the sumsqr', function () {
      expect(this.result.sumsqr).to.be.equal(1 + 4 + 36 + 16);
      expect(this.reresult.sumsqr).to.be.equal(1 + 4 + 36 + 16 + 25);
    });
  });
});
