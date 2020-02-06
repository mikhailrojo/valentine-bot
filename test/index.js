const assert = require('assert');
const db = require('./db');

assert.deepEqual(1, 1, 'Один равен одному');

assert.deepEqual(
	db.getMsgsForUser(),
	[],
	'Дефолтные сообщения пустые'
);

assert.deepEqual(
	db.getMsgsForUser('@mmstepanov'),
	[{forUser: '@mmstepanov', textMsg: 'прям', fromUser: 273238679}],
	'Дефолтные сообщения открываются'
);


db.delMsgsForUser('@mmstepanov');
console.log(db.getMsgsForUser('@mmstepanov'));

assert.deepEqual(
	db.getMsgsForUser('@mmstepanov'),
	[],
	'Сообщения удалены'
);
