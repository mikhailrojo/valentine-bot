const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
	registeredUsers: [{name: '@mmm', id: 273238679}], // {name: @mmstepanov, id: 999}
	messages: [{forUser: '@mmstepanov', textMsg: 'прям', fromId: 273238679}] // {forUser: '@mmstepanov', textMsg: 'прям', fromId: '123'}
	})
	.write();


const getRegisteredUsers = () => {
	return db.get('registeredUsers').value();
};

const saveMsg = ({forUser, textMsg, fromId}) => {
	db.get('messages')
		.push({forUser, textMsg, fromId})
		.write();
};

const getMsgs = (forUserName) => {
	return db.get('messages').value().filter(msg => msg.forUser === forUserName);
};


module.exports = {
	getMsgs,
	saveMsg,
	getRegisteredUsers
};
