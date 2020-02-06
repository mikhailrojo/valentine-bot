const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(__dirname + '/db-test.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
		registeredUsers: [{name: '@mmstepanov', id: 273238679}], // {name: @mmstepanov, id: 999}
		messages: [
			{forUser: '@stepanovm', textMsg: 'прям', fromUser: 273238679},
			{forUser: '@mmstepanov1', textMsg: 'прям', fromUser: 273238679},

		]
	})
	.write();


const addRegisteredUser = ({name, id}) => {
	log(`${username} присоединился`);

	const isAlreadyResitered = getRegisteredUsers().includes(name);
	if (!isAlreadyResitered) {
		db.get('registeredUsers')
			.push({name, id})
			.write();
	}
};

const delMsgsForUser = (forUserName) => {
	db.get('messages')
		.remove({forUser: forUserName})
		.write();
};

const getRegisteredUsers = () => {
	return db.get('registeredUsers').value();
};

const saveMsg = ({forUser, textMsg, fromId}) => {
	db.get('messages')
		.push({forUser, textMsg, fromId})
		.write();
};

const getMsgsForUser = (user) => {
	return db.get('messages').value().filter(msg => msg.forUser === user);
};


module.exports = {
	saveMsg,
	delMsgsForUser,
	getMsgsForUser,
	addRegisteredUser,
	getRegisteredUsers
};
