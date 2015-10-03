
import grouper from './group';

export default function (parameters, reducer, docs) {
  return grouper(parameters, docs)
    .map(spec => ({
      key: spec.gkey,
      value: reducer(spec.keys, spec.values, false)
    }));
}
