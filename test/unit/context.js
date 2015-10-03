
import { contextWith, sum } from '../../lib/context';
import { expect } from 'chai';

describe('unit/context', function () {
  describe('#contextWith', function () {
    it('gives an object providing parseInt and sum', function () {
      let context = contextWith({});
      expect(context.parseInt).to.be.a('function');
      expect(context.sum).to.be.a('function');
    });
    it('includes additional properties into the context', function () {
      let context = contextWith({id: 333});
      expect(context.id).to.be.equal(333);
    });
  });
});
