// если есть document/image
module.exports = (bot, msg) => {
	const {
		chat: {
			id
		},
		caption,
		document,
		photo
	} = msg;

	const fileId = document && document.file_id;

	if (fileId) {
		bot.sendDocument(id, fileId);
		bot.sendMessage(id, caption);
		return;
	}

	const photoId = photo && photo.length && photo.slice(-1)[0].file_id;

	if (photoId) {
		bot.sendPhoto(id, photoId);
		bot.sendMessage(id, caption);
	}
};
