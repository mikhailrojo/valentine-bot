const db = require('../db');

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

	bot.sendMessage(fromId, 'Привет. Это Валентин-бот, который отправляет анонимные телеграмм сообщения');

	// проверяем базу данных
	const areMsgs = db.getMsg(`@${username}`);

	console.log('areMsgs', areMsgs);
	if (areMsgs) {
		bot.sendMessage(fromId, 'В вашем почтовом ящике есть валентинки:');
		areMsgs.forEach(msg => {
			bot.sendMessage(fromId, `Вам пришла Валентинка :) -> "${msg.text}"`);
			bot.sendMessage(msg.fromUser, `Ваша Валентинка доставлена для @${username}`);
		});
	}


};
