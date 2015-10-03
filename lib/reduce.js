
import grouper from './group';

import { sum, count } from './reducers';

function coerceReducer(f) {
  switch (f) {
    case '_sum':
      return sum;
    case '_count':
      return count;
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
