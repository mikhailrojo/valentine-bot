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

const getUserByName = (name) => getRegisteredUsers()
	.find(regUser => regUser.name.toLowerCase() === normalizeUser(name).toLowerCase());

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
};

const delMsgsForUser = (forUserName) => {
	const user = normalizeUser(forUserName);

	log(`Удаляем все сообщения для пользователя ${user}`);

	db.get('messages')
		.remove({forUser: user})
		.write();
};

const getRegisteredUsers = () => {
	return db.get('registeredUsers').value();
};

const saveMsg = ({forUser, textMsg, fromUser}) => {
	const user = normalizeUser(forUser);
	const userWhoSends = getUserNameById(fromUser)

	log(`Сохраняем сообщение для ${forUser} от ${userWhoSends}. Само сообщение не сохраняется`);

	db.get('messages')
		.push({forUser: user, textMsg, fromUser})
		.write();
};

const getMsgsForUser = (forUserName) => {
	const user = normalizeUser(forUserName);
	log(`Получаем сообщения по пользователю ${user}`);

	return db.get('messages').value().filter(msg => msg.forUser.toLowerCase() === user.toLowerCase());
};

const getUserNameById = (id) => {
	const user = getRegisteredUsers().find(user => user.id === id) || {};
	return user.name || id;
};

module.exports = {
	saveMsg,
	getUserByName,
	getMsgsForUser,
	delMsgsForUser,
	getUserNameById,
	addRegisteredUser,
	getRegisteredUsers
};
