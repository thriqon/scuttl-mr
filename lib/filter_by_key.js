
import sorter from './sort';
const FORWARD = 1;

export default function filterByKey(params, items) {
	const { inclusive_end, limit, skip,  descending } = params;
	const runDirection = descending ? -1 : 1;

	const a = params.startkey;
	const b = params.endkey;

	let res = [];
	let startIdx = descending ? items.length - 1 : 0;
	let endIdx = descending ? 0 : items.length - 1;

	let toSkip = skip || 0;

	for (let i = startIdx; i != endIdx + runDirection; i += runDirection) {
		let item = items[i];

		if (limit != null && res.length >= limit) {
			break;
		}

		if (!isBetween(a, item, b, inclusive_end, runDirection)) {
			continue;
		}
		if (toSkip > 0) {
			toSkip--;
			continue;
		}
		res.push(item);
	}
	return res;
}

export function isBetween(a, obj, b, inclusive, direction) {
	let x = obj.key;

	if (direction === FORWARD) {
		return sorter(a, x) <= 0 && sorter(x, b) <= (inclusive ? 0 : -1);
	} else {
		return sorter(a, x) >= 0 && sorter(x, b) >= (inclusive ? 0 : 1);
	}
}


