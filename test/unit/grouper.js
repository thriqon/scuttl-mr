
import { default as group, coerceValueByGroupLevel as coerce } from '../../lib/group';
import applyDefaultParams from '../../lib/default-params';
import { expect } from 'chai';

describe('unit/group', function () {
  beforeEach(function () {
    this.group = function (docs, group_level) {
      let params = applyDefaultParams({group_level});

      return group(params, docs);
    };
  });

  describe('level 0', function () {
    it('groups a list with level 0 to a single entry', function () {
      let docs = [
        {key: '0', value: 2, id: '6'},
        {key: ['0'], value: 3, id: '6'},
        {key: 2, value: 4, id: '6'}
      ];

      let expected = [
        {keys: [['0', '6'], [['0'], '6'], [2, '6']], values: [2,3,4]}
      ];

      expect(this.group(docs, 0))
        .to.be.eql(expected);
    });

    it('groups a one list doc with level 1 to one entry', function () {
      let docs = [
        {key: '0', value: 2, id: '3'}
      ];

      let expected = [
        {keys: [['0', '3']], values: [2]}
      ];

      expect(this.group(docs, 1))
        .to.be.eql(expected);
    });

    it('groups a list with level 1 to multiples entries', function () {
      let docs = [
        {key: '0', value: 2, id: '6'},
        {key: ['0', '1'], value: 3, id: '6'},
        {key: ['0', '2'], value: 4, id: '6'},
        {key: ['0', '2'], value: 5, id: '6'},
        {key: ['1', '2'], value: 9, id: '6'},
        {key: '0', value: 3, id: '7'},
        {key: 2, value: 4, id: '6'}
      ];

      let expected = [
        {keys: [['0', '6'], ['0', '7']], values: [2, 3]},
        {keys: [[['0', '1'], '6'], [['0', '2'], '6'],  [['0', '2'], '6']], values: [3, 4, 5]},
        {keys: [[['1', '2'], '6']], values: [9]},
        {keys: [[2, '6']], values: [4]}
      ];
      expect(this.group(docs, 1))
        .to.be.eql(expected);
    });
  });
  describe('#coerce', function () {
    it('coerces anything to null when group_level is zero', function () {
      expect(coerce('str', 0)).to.be.null;
      expect(coerce([2,3,4], 0)).to.be.null;
      expect(coerce({}, 0)).to.be.null;
    });
    it('coerces anything expect an array to itself when group_level is one', function () {
      expect(coerce('str', 1)).to.be.eql('str');
      expect(coerce([2,3,4], 1)).to.be.eql([2]);
      expect(coerce({}, 1)).to.be.eql({});
    });
    it('coerces an array to the correct number of entries', function () {
      expect(coerce(new Array(100), 50)).to.be.eql(new Array(50));
    });
  });
});
