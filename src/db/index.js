const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {log} = require('../logger');

const adapter = new FileSync(__dirname + '/db.json');
const db = low(adapter);
const normalizeUser = (user) => user.startsWith('@') ? user : `@${user}`;

db.defaults({
		registeredUsers: [{name: '@mmstepanov', id: 273238679}], // {name: @mmstepanov, id: 999}
		messages: [{forUser: '@mmstepanov', textMsg: 'прям', fromUser: 273238679}] // {forUser: '@mmstepanov', textMsg: 'прям', fromId: '123'}
	})
	.write();


const addRegisteredUser = ({name, id}) => {
	log(`${username} присоединился`);
	const user = normalizeUser(name);

	const isAlreadyResitered = getRegisteredUsers().includes(user);
	if (!isAlreadyResitered) {
		db.get('registeredUsers')
			.push({user, id})
			.write();
	}
	console.log(db.getState());
};

const delMsgsForUser = (forUserName) => {
	const user = normalizeUser(forUserName);

	log(`Удаляем все сообщения для пользователя ${user}`);

	db.get('messages')
		.remove({forUser: user})
		.write();
	console.log(db.getState());
};

const getRegisteredUsers = () => {
	return db.get('registeredUsers').value();
};

const saveMsg = ({forUser, textMsg, fromId}) => {
	const user = normalizeUser(forUser);
	log(`Сохраняем сообщение ${forUser}`);

	db.get('messages')
		.push({forUser: user, textMsg, fromId})
		.write();
	console.log(db.getState());
};

const getMsgsForUser = (forUserName) => {
	const user = normalizeUser(forUserName);
	log(`Получаем данные по пользователю ${user}`);

	console.log(db.getState());
	return db.get('messages').value().filter(msg => msg.forUser === user);

};

module.exports = {
	saveMsg,
	getMsgsForUser,
	delMsgsForUser,
	addRegisteredUser,
	getRegisteredUsers
};
