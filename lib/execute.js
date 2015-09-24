
import filterByKey from './filter_by_key';
import sorter from './sort';
import defaultParams from './default-params';

export default function (data, params, viewCode) {
	let res = [];
	let curId = null;

	function emit(key, val) {
		res.push({key: key, value: val, id: curId});
	}

	params = defaultParams(params);

	function view(obj) {
		let map = obj.map;
		//var reduce = obj.reduce;

		data
			.filter(x => !!x)
			.map((doc) => { curId = doc._id; return map(doc); });

		res = res.sort(sorter);
		res = filterByKey(params, res);

		return res;
	}


	viewCode = "(function (window, global, XMLHttpRequest) { \"use strict\"; return view(" + viewCode + "); })();";

	return eval(viewCode);
}
