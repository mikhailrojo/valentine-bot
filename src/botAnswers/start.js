const db = require('../db');
const {log} = require('../logger');

module.exports = (bot, msg) => {
	const {
		from: {
			username // mmstepanov
		},
		text,
		chat: {
			id: fromUser
		}
	} = msg;

	bot.sendMessage(fromUser, `Привет. Это Валентин-бот, который отправляет АНОНИМНЫЕ(!) телеграмм сообщения. Для отправки сообщения пользователю напишите его телеграмм логин и сообщение. Например для отправки сообщение Мише Степанову: 

	@stepanovm Миша - красавчик, с праздником тебя!
	`);

	db.addRegisteredUser({name: username, id: fromUser});

	const areMsgs = db.getMsgsForUser(username);

	if (areMsgs.length) {

		areMsgs.forEach(msg => {
			const userWhoSent = db.getUserNameById(msg.fromUser);
			log(`Достаем сохраненную валентинку от ${userWhoSent} -> ${username}`);

			bot.sendMessage(fromUser, `Вам пришла Валентинка :) -> "${msg.textMsg}"`);
			bot.sendMessage(msg.fromUser, `Ваша Валентинка доставлена для @${username}`);
		});

		db.delMsgsForUser(username);
	}
};
