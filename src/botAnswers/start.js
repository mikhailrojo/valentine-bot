module.exports = (bot, msg) => {
	const fromId = msg.chat.id;
	bot.sendMessage(fromId, 'Привет. Это Валентин-бот, который отправляет анонимные телеграмм сообщения');
};
