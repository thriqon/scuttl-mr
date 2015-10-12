
import sorter from './sort';

export default function filterByKey(params, items) {
  return params.keys
    .map(key => items.filter(item => sorter(item.key, key) === 0))
    .reduce((acc, x) => acc.concat(x), []);
}
