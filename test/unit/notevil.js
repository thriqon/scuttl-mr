
import { Function as F } from 'notevil';
import { expect } from 'chai';

describe('vendor/notevil', function () {
  it('executes a function', function () {
    let f = F("return 5");

    expect(f()).to.be.equal(5);
  });

  it('does not allow eval-ling other functions', function () {
    let f = F("eval('return 6;');");

    expect(f).to.be.throw();
  });

  it('passes arguments to the function', function () {
    let f = F('x', "return x * x;");

    expect(f(10)).to.be.equal(100);
  });
});
