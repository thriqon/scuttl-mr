
import filterByKey from './filter_by_key';
import filterByInterval from './filter_by_interval';
import sorter from './sort';
import defaultParams from './default-params';
import reduce from './reduce/index';
import safeEval from 'notevil';
import { contextWith } from './context';

export default function (data, params, viewCode) {
  let res = [];
  let curDoc = null;
  params = defaultParams(params);

  function emit(key, value) {
    /* istanbul ignore next */
    if (curDoc === null) {
      throw new Error("Emit called out of order");
    }
    let o = {
      key,
      value,
      id: curDoc._id
    };
    if (params.include_docs) {
      o.doc = curDoc;
    }
    res.push(o);
  }


  let context = contextWith({emit});
  let obj = safeEval("(" + viewCode + ")", context);
  let map;
  if (typeof obj.map === 'string') {
    map = safeEval("(" + obj.map + ")", context);
  } else {
    map = obj.map;
  }

  data
    .filter(x => !!x)
    .forEach((doc) => { curDoc = doc; map(doc); });

  curDoc = null;

  res = res.sort(sorter);
  if (params.keys) {
    res = filterByKey(params, res);
  } else {
    res = filterByInterval(params, res);
  }

  if (params.reduce && obj.reduce) {
    res = reduce(params, obj.reduce, res);
  }

  return res;
}
