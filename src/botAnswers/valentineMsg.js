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
			id: fromUser
		}
	} = msg;

	const splitted = text.split(' ');
	const forUser = splitted[0];
	const textMsg = splitted.slice(1).join(' ').trim();

	if (!forUser.startsWith('@')) {
		return bot.sendMessage(fromUser, 'Первым словом должен идти телеграмм-логин пользователя, начинающийся с @');
	}

	if(!textMsg) {
		return bot.sendMessage(fromUser, 'Валентинка не может быть пустой');
	}

	const registeredUser = db.getUserByName(forUser);

	if (registeredUser) {
		bot.sendMessage(registeredUser.id, `Вам пришла Валентинка :) -> "${textMsg}"`);
		return bot.sendMessage(fromUser, `Пользователь ${forUser} только что получил вашу валентинку :)`);
	} else {
		db.saveMsg({forUser, textMsg, fromUser});

		return bot.sendMessage(fromUser, `
		Этот пользователь еще не активировал бота и поэтому сообщение ему не может быть доставлено.
		Намекните ему что его что-то ожидает t.me/ya_valentin_bot. Как только он подключится - ваша валентинка будет ему доставлена`);
	}
};

