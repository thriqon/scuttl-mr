
import { expect } from 'chai';
import defaultParams from '../../lib/default-params';

describe('default params', function () {
  it('gives an object when passed null', function () {
    expect(defaultParams(null)).to.be.an('object');
  });
});
