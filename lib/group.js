
import equaller from './sort';

export function coerceValueByGroupLevel(key, group_level) {
  if (group_level === 0) {
    return null;
  } else if (group_level !== null && key instanceof Array) {
    return key.slice(0, group_level);
  } else {
    return key;
  }
}

export function isDeeplyEqual(a, b) {
  return equaller(a,b) === 0;
}

export function pushNewEntryAndReturn(entries, gkey) {
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

function findByOrAppendEmpty(entries, gkey) {
  for (let x of entries) {
    if (isDeeplyEqual(x.gkey, gkey)) {
      return x;
    }
  }
  return pushNewEntryAndReturn(entries, gkey);
}

function addDocToEntry(entry, doc) {
  entry.keys.push([doc.key, doc.id]);
  entry.values.push(doc.value);
}

export default function (params, entries) {
  let toNull = () => null;
  let keyCoercer = (params.group ? coerceValueByGroupLevel : toNull);

  return entries
    .reduce((acc, cur) => {
      let key = keyCoercer(cur.key, params.group_level)
      addDocToEntry(findByOrAppendEmpty(acc, key), cur);

      return acc;
    }, []);
}
