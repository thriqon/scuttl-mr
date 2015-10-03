
function addOrThrow(acc, x) {
  if (typeof x === 'number') {
    return acc + x;
  } else {
    throw new TypeError("Items should be numeric");
  }
}

export function sum(keys, values) {
  return values.reduce(addOrThrow, 0);
}

export function count(keys, values, rereduce) {
  if (rereduce) {
    return sum(keys, values);
  } else {
    return values.length;
  }
}

