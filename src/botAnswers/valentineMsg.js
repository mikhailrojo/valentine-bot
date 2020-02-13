const db = require('../db');
const {log} = require('../logger');
const fileMsg = require('./filesMsgs');

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
		},
		document,
		photo,
		caption
	} = msg;

	// if (document || photo) {
	// 	return fileMsg(bot, msg);
	// }
	//
	// if(!text) {
	// 	return bot.sendMessage(fromUser, 'Принимаем только текстовые поздравления');
	// }

	const forWhomMessage = text || caption;

	if (!forWhomMessage) {
		return bot.sendMessage(fromUser, 'К Валентинке нужно нужна подпись для кого и текст, пустые Валентинки не принимаются');
	}

	const splitted = forWhomMessage.split(' ');
	const forUser = splitted[0];
	const textMsg = splitted.slice(1).join(' ').trim();

	if (!forUser.startsWith('@')) {
		return bot.sendMessage(fromUser, 'Первым словом должен идти телеграмм-логин пользователя, начинающийся с @');
	}

	if (!textMsg) {
		return bot.sendMessage(fromUser, 'Валентинка не может быть пустой');
	}

	const registeredUser = db.getUserByName(forUser);

	if (registeredUser) {
		log(`${username} отправляем валентинку -> ${forUser}`);

		if (photo || document) {
			return fileMsg(bot, msg, textMsg, registeredUser.id, forUser);
		}

		bot.sendMessage(registeredUser.id, `Вам пришла Валентинка :) -> "${textMsg}"`);
		return bot.sendMessage(fromUser, `Пользователь ${forUser} только что получил вашу валентинку :)`);
	} else {
		const fileId = document && document.file_id;
		const photoId = photo && photo.length && photo.slice(-1)[0].file_id;

		db.saveMsg({forUser, textMsg, fromUser, photoId, fileId});

		return bot.sendMessage(fromUser, 'Этот пользователь еще не активировал бота и поэтому сообщение ему не может быть доставлено. Намекните ему что его что-то ожидает t.me/ya_valentin_bot. Как только он подключится - ваша валентинка будет ему доставлена');
	}
};

