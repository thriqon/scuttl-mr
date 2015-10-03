
import grouper from './group';

import { sum, count, stats } from './builtins';

function coerceReducer(f) {
  switch (f) {
    case '_sum':
      return sum;
    case '_count':
      return count;
    case '_stats':
      return stats;
    default:
      return f;
  }
}

export default function (parameters, reducerSpec, docs) {
  let reducer = coerceReducer(reducerSpec);

  return grouper(parameters, docs)
    .map(spec => ({
      key: spec.gkey,
      value: reducer(spec.keys, spec.values, false)
    }));
}
