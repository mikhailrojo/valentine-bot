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

const getUserByName = (name) => getRegisteredUsers().find(regUser => regUser.name === normalizeUser(name));

const addRegisteredUser = ({name, id}) => {
	log(`${name} присоединился`);
	const user = normalizeUser(name);

	const isAlreadyRegistered = getUserByName(user);
	log(`${name} -> isAlreadyResitered = ${isAlreadyRegistered}`);
	if (!isAlreadyRegistered) {
		db.get('registeredUsers')
			.push({name: user, id})
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

const saveMsg = ({forUser, textMsg, fromUser}) => {
	const user = normalizeUser(forUser);
	log(`Сохраняем сообщение ${forUser} от ${fromUser}. Само сообщение не сохраняется`);

	db.get('messages')
		.push({forUser: user, textMsg, fromUser})
		.write();
	console.log(db.getState());
};

const getMsgsForUser = (forUserName) => {
	const user = normalizeUser(forUserName);
	log(`Получаем сообщения по пользователю ${user}`);

	console.log(db.getState());
	return db.get('messages').value().filter(msg => msg.forUser === user);

};

module.exports = {
	saveMsg,
	getUserByName,
	getMsgsForUser,
	delMsgsForUser,
	addRegisteredUser,
	getRegisteredUsers
};
