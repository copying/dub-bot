'use strict';

var roles = {
	possibleRights: [
		'update-room',
		'set-roles',
		'set-managers',
		'skip',
		'queue-order',
		'kick',
		'ban',
		'mute',
		'set-dj',
		'lock-queue',
		'delete-chat',
		'chat-mention'
		]
};

roles['co-owner'] = roles['5615fa9ae596154a5c000000'] = {
	id: '5615fa9ae596154a5c000000',
	type: 'co-owner',
	rights: [
		'update-room',
		'set-roles',
		'set-managers',
		'skip',
		'queue-order',
		'kick',
		'ban',
		'mute',
		'set-dj',
		'lock-queue',
		'delete-chat',
		'chat-mention'
	]
};

roles['manager'] = roles['5615fd84e596150061000003'] = {
	id: '5615fd84e596150061000003',
	type: 'manager',
	rights: [
		'set-roles',
		'skip',
		'queue-order',
		'kick',
		'ban',
		'mute',
		'set-dj',
		'lock-queue',
		'delete-chat',
		'chat-mention'
	]
};

roles['mod'] = roles['52d1ce33c38a06510c000001'] = {
	id: '52d1ce33c38a06510c000001',
	type: 'mod',
	rights: [
		'skip',
		'queue-order',
		'kick',
		'ban',
		'mute',
		'set-dj',
		'lock-queue',
		'delete-chat',
		'chat-mention'
	]
};

roles['vip'] = roles['5615fe1ee596154fc2000001'] = {
	id: '5615fe1ee596154fc2000001',
	type: 'vip',
	rights: [
		'skip',
		'set-dj'
	]
};

roles['resident-dj'] = roles['5615feb8e596154fc2000002'] = {
	id: '5615feb8e596154fc2000002',
	type: 'resident-dj',
	rights: [
		'set-dj'
	]
};

roles['user'] = roles[undefined] = roles[''] = {
	id: undefined,
	type: 'user',
	rights: []
};

module.exports = roles;