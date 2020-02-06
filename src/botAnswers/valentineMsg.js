const db = require('../db');

module.exports = (bot, msg) => {
	const {
		from: {
			id: userId,
			first_name: name,
			last_name: surname,
			username
		},
		text,
		chat: {
			id: fromId
		}
	} = msg;

	const splitted = text.split(' ');
	const forUser = splitted[0];
	const textMsg = splitted.slice(1).join(' ').trim();

	if (!forUser.startsWith('@')) {
		return bot.sendMessage(fromId, 'Первым словом должен идти телеграмм-логин пользователя, начинающийся с @');
	}

	if(!textMsg) {
		return bot.sendMessage(fromId, 'Валентинка не может быть пустой');
	}

	const registeredUser = db.getUserByName(forUser);

	if (registeredUser) {
		console.log('userToSend', registeredUser);

		bot.sendMessage(registeredUser.id, `Вам пришла Валентинка :) -> "${textMsg}"`);
		return bot.sendMessage(fromId, 'Пользователь только что получил вашу валентинку :)');
	} else {
		db.saveMsg({forUser, textMsg, fromUser: fromId});

		return bot.sendMessage(fromId, `
		Этот пользователь еще не активировал бота и поэтому сообщение ему не может быть доставлено.
		Намекните ему что его что-то ожидает t.me/ya_valentin_bot. Как только он подключится - ваша валентинка будет ему доставлена`);
	}
};

