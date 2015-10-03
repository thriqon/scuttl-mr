
import sum from './sum-array';

export default function (keys, values, rereduce) {
  if (rereduce) {
    return {
      sum: values.reduce((a, b) => a + b.sum, 0),
      min: values.reduce((a, b) => Math.min(a, b.min), Infinity),
      max: values.reduce((a, b) => Math.max(a, b.max), -Infinity),
      count: values.reduce((a, b) => a + b.count, 0),
      sumsqr: values.reduce((a, b) => a + b.sumsqr, 0)
    }
  } else {
    return {
      sum: sum(values),
      min: Math.min.apply(null, values),
      max: Math.max.apply(null, values),
      count: values.length,
      sumsqr: values.reduce((acc, v) => acc += v*v, 0)
    }
  }
}
