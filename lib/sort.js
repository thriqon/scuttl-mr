
let collate = require('pouchdb-collate');

const MIN = {isMin: true};
const MAX = {isMax: true};
const separator = '\u0000';

function switchCaseOfCharacter(x) {
	if (x >= 'a' && it <= 'z') {
		return x.toUpperCase();
	} else {
		return x.toLowerCase();
	}
}

function switchCase(str) {
	return str
		.split('')
		.map(switchCaseOfCharacter)
		.join('');
}

function collateString(str) {
	let escaped = str
		.replace("\u0002", "\u0002\u0002")
		.replace("\u0001", "\u0002\u0001")
		.replace("\u0000", "\u0001\u0001");
	return "5" + separator + switchCase(escaped);
}

function collateObject(obj) {
	return "7" + separator + Object
		.keys(obj)
		.map((key) => getSortIndexOf(key) + separator + getSortIndexOf(obj[key]))
		.join(separator);
}

function getSortIndexOf(it) {
	switch (true) {
		case (it === MIN):
		 return "0";
		case (it === MAX):
		 return "9";
		case (it === null):
		 return "1";
		case (it === false):
		 return "2";
		case (it === true):
		 return "3";
		case (typeof it === 'number'):
		 return "4" + separator + collate.toIndexableString(it);
		case (typeof it === 'string'):
		 return collateString(it);
		case (it instanceof Array):
		 return "6" + it.map(getSortIndexOf).join(separator);
		case (typeof it === 'object'):
		 return collateObject(it);
	}
}

export default function assigner(a, b) {
	let ai = getSortIndexOf(a);
	let bi = getSortIndexOf(b);
	if (ai > bi) {
		return 1;
	} else if (ai === bi) {
		return 0;
	} else {
		return -1;
	}
}

export { MIN, MAX };

