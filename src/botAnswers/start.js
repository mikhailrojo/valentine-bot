const db = require('../db');
const {log} = require('../logger');

module.exports = (bot, msg) => {
	const {
		from: {
			id: userId,
			first_name: name,
			last_name: surname,
			username // mmstepanov
		},
		text,
		chat: {
			id: fromId
		}
	} = msg;

	bot.sendMessage(fromId, `
		Привет. Это Валентин-бот, который отправляет анонимные телеграмм сообщения.
		Для отправки сообщения пользователю напишите его телеграмм логин и сообщение.
		Например для отправки сообщение Мише Степанову:
		
		@stepanovm Миша - красавчик, с праздником тебя
	`);

	db.addRegisteredUser({name: username, id: fromId});

	// проверяем базу данных
	const areMsgs = db.getMsgsForUser(username);

	if (areMsgs.length) {
		areMsgs.forEach(msg => {
			bot.sendMessage(fromId, `Вам пришла Валентинка :) -> "${msg.textMsg}"`);
			bot.sendMessage(msg.fromUser, `Ваша Валентинка доставлена для @${username}`);
		});

		db.delMsgsForUser(username);
	}
};
