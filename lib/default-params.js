
import { default as sorter, MIN, MAX} from './sort';

export default function (options) {
	options = options || {};
	let res = {};

	function extendWithDefault(key, def) {
		if (options.hasOwnProperty(key)) {
			res[key] = options[key];
		} else {
			res[key] = def;
		}
	}

	extendWithDefault('descending', false);

	if (res.descending) {
		extendWithDefault('endkey', MIN);
		extendWithDefault('endkey_docid', MIN);
		extendWithDefault('startkey', MAX);
		extendWithDefault('startkey_docid', MAX);
	} else {
		extendWithDefault('endkey', MAX);
		extendWithDefault('endkey_docid', MAX);
		extendWithDefault('startkey', MIN);
		extendWithDefault('startkey_docid', MIN);
	}

	extendWithDefault('group', false);
	extendWithDefault('group_level', null);
	extendWithDefault('include_docs', false);
	extendWithDefault('inclusive_end', true);
	extendWithDefault('keys', null);
	extendWithDefault('limit', null);
	extendWithDefault('reduce', true);
	extendWithDefault('skip', 0);

	extendWithDefault('conflicts', false);
	extendWithDefault('attachments', false);
	extendWithDefault('att_encoding_info', false);
	extendWithDefault('stale', null);
	extendWithDefault('update_seq', false);

	if (options.hasOwnProperty('key')) {
		res.keys = [options.key];
	}

	return res;
}

