
import filterByKey from './filter_by_key';
import sorter from './sort';
import defaultParams from './default-params';

export default function (data, params, viewCode) {
  let res = [];
  let curDoc = null;
  params = defaultParams(params);

  function emit(key, val) {
    let o = {
      key: key,
      value: val,
      id: curDoc._id
    };
    if (params.include_docs) {
      o.doc = curDoc;
    }
    res.push(o);
  }


  function view(obj) {
    let map = obj.map;
    //var reduce = obj.reduce;

    data
      .filter(x => !!x)
      .map((doc) => { curDoc = doc; return map(doc); });

    res = res.sort(sorter);
    res = filterByKey(params, res);

    return res;
  }


  viewCode = "(function (window, global, XMLHttpRequest) { \"use strict\"; return view(" + viewCode + "); })();";

  return eval(viewCode);
}
