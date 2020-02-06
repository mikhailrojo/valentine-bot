const start = require('./start');
const help = require('./help');
const valentineMsg = require('./valentineMsg');

module.exports = function(msg) {
	const bot = this;

	if (text === '/start') {
		return start(bot, msg);
	}
	if (text === '/help') {
		return help(bot, msg);
	}
	return valentineMsg(bot, msg);
};
