const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const botAnswers = require('./botAnswers');

bot.on('message', botAnswers);
