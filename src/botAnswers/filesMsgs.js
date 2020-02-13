const {log} = require('../logger');

module.exports = (bot, msg, textMsg, forWhomId, forUser) => {
	const {
		chat: {
			id,
			username
		},
		caption,
		document,
		photo
	} = msg;

	const fileId = document && document.file_id;

	if (fileId) {
		log(`${username} отправляем валентинку файлик -> ${forUser}`);
		bot.sendDocument(forWhomId, fileId);
		bot.sendMessage(forWhomId, `Вам пришла Валентинка с файликом :) -> "${textMsg}"`);
		return bot.sendMessage(id, `Пользователь ${forUser} только что получил вашу валентинку :)`);
		return;
	}

	const photoId = photo && photo.length && photo.slice(-1)[0].file_id;

	if (photoId) {
		log(`${username} отправляем фото-валентинку -> ${forUser}`);
		bot.sendPhoto(forWhomId, photoId);
		bot.sendMessage(forWhomId, `Вам пришла Валентинка с фото :) -> "${textMsg}"`);
		return bot.sendMessage(id, `Пользователь ${forUser} только что получил вашу валентинку :)`);

	}
};
