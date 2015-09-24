
var executor = require('../../lib/execute');
var expect = require('chai').expect;

describe('worker/execute', function () {
  beforeEach(function () {
    this.docs = [
    {_id: "foo", a: 0}, {_id: "bar", a: 1}, {_id: "baz", a: 2}
    ];
    this.viewCode = "{map: function (doc) { emit(doc.a, doc._id); }}";
    this.params = {
      inclusive_end: true
    };
  });

  describe('with default parameters', function () {
    it('returns all documents transformed', function () {
      var res = executor(this.docs, this.params, this.viewCode);
      expect(res).to.be.an('array').and.to.have.length(3);
      expect(res[0]).to.be.deep.eql({key: 0, value: "foo", id: "foo"});
      expect(res[1]).to.be.deep.eql({key: 1, value: "bar", id: "bar"});
      expect(res[2]).to.be.deep.eql({key: 2, value: "baz", id: "baz"});
    });
  });

  describe('with startkey and descending', function () {
    beforeEach(function () {
      this.params.startkey = 1;
      this.params.descending = true;
    });
    it('returns documents as documented', function () {
      var res = executor(this.docs, this.params, this.viewCode);
      expect(res).to.be.an('array').and.to.have.length(2);
      expect(res[0]).to.be.deep.eql({key: 1, value: "bar", id: "bar"});
      expect(res[1]).to.be.deep.eql({key: 0, value: "foo", id: "foo"});
    });
  });

  describe('with endkey and descending', function () {
    beforeEach(function () {
      this.params.endkey = 1;
      this.params.descending = true;
    });
    it('returns documents as documented', function () {
      var res = executor(this.docs, this.params, this.viewCode);
      expect(res).to.be.an('array').and.to.have.length(2);
      expect(res[0]).to.be.deep.eql({key: 2, value: "baz", id: "baz"});
      expect(res[1]).to.be.deep.eql({key: 1, value: "bar", id: "bar"});
    });
  });
});
