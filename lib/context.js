
import sum from './reduce/builtins/sum-array';

const DEFAULT_CONTEXT = {
  parseInt,
  sum
};

export function contextWith (additionals) {
  let context = Object.create(DEFAULT_CONTEXT);
  Object
    .getOwnPropertyNames(additionals)
    .forEach(k => context[k] = additionals[k]);
  return context;
}
