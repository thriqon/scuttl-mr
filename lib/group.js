
import equaller from './sort';

export function coerceValueByGroupLevel(key, group_level) {
  if (group_level === 0) {
    return null;
  }

  if (key instanceof Array) {
    return key.slice(0, group_level);
  }


  return key;
}

function isDeeplyEqual(a, b) {
  return equaller(a,b) === 0;
}

function findByOrAppendEmpty(entries, gkey) {
  for (let x of entries) {
    if (isDeeplyEqual(x.gkey, gkey)) {
      return x;
    }
  }

  let newEntry = {
    keys: [],
    values: []
  };
  Object.defineProperty(newEntry, 'gkey', {
    enumerable: false,
    writable: false,
    value: gkey
  });
  entries.push(newEntry);
  return newEntry;
}

export default function (params, entries) {
  return entries
    .reduce((acc, cur) => {
      let e = findByOrAppendEmpty(acc, coerceValueByGroupLevel(cur.key, params.group_level));

      e.keys.push([cur.key, cur.id]);
      e.values.push(cur.value);

      return acc;
    }, []);
}
