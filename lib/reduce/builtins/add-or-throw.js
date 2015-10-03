
export default function (acc, x) {
  if (typeof x === 'number') {
    return acc + x;
  } else {
    throw new TypeError("Items should be numeric");
  }
}
