
import executor from '../../lib/execute';
import {expect} from 'chai';

describe('unit/execute', function () {
  beforeEach(function () {
    this.docs = [
    {_id: "foo", a: 0}, {_id: "bar", a: 1}, {_id: "baz", a: 2}
    ];
    this.params = {
      inclusive_end: true
    };
  });

  describe('with sum reducer', function () {
    beforeEach(function () {
      this.viewCode = "{map: function (doc) { emit(null, doc.a); }, reduce: \"_sum\"}";
    });

    it('returns the sum as requested', function () {
      var res = executor(this.docs, this.params, this.viewCode);
      expect(res).to.be.deep.eql([
          {
            key: null,
            value: 3
          }
      ]);
    });
  });

  [{
    title: 'with plain map function',
    viewCode: "{map: function (doc) { emit(doc.a, doc._id); }}"
  }, {
    title: 'with stringified map function',
    viewCode: "{map: \"function (doc) { emit(doc.a, doc._id); }\"}"
  }].forEach(function (o) {

    describe(o.title, function () {
      beforeEach(function () {
        this.viewCode = o.viewCode;
      });

      describe('with include_docs and specific key', function () {
        it('returns a document as requested', function () {
          this.params.include_docs = true;
          this.params.key = 1;
          var res = executor(this.docs, this.params, this.viewCode);
          expect(res).to.be.an('array').and.to.have.length(1);
          expect(res[0]).to.be.deep.eql({
            key: 1,
            id: "bar",
            value: "bar",
            doc: {
              _id: "bar",
              a: 1
            }
          });
        });
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
        it('returns documents as document (exclusive end)', function () {
          this.params.inclusive_end = false;
          var res = executor(this.docs, this.params, this.viewCode);
          expect(res).to.be.an('array').and.to.have.length(1);
          expect(res[0]).to.be.deep.eql({key: 2, value: "baz", id: "baz"});
        });
      });

      describe('with key', function () {
        beforeEach(function () {
          this.params.key = 1;
        });
        it('returns documents as documented', function () {
          var res = executor(this.docs, this.params, this.viewCode);
          expect(res).to.be.an('array').and.to.have.length(1);
          expect(res[0]).to.be.deep.eql({key: 1, value: "bar", id: "bar"});
        });
      });
    });
  });
});
