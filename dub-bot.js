'use strict';

const EventEmitter = require('events');
const RoomList = require('./lib/roomlist.js');
//const Protocol = require('./protocol.js'); //set dynamically at constructor

const checkArgs = require('./lib/utils/typecheck.js');

class DubBot extends EventEmitter {
	constructor(username, password, callback, Protocol) {
		checkArgs(arguments, ['String', 'String', 'Function'], "[DubBot] constructor", 2);

		if (Protocol == undefined) Protocol = require('./lib/protocol/protocol.js');

		super();

		this.protocol = new Protocol();
		this.rooms = new RoomList(this);
		this.connected = false;
		this.id = '';

		var that = this;
		this.protocol.account.login(username, password, function(){
			that.protocol.account.info(function(body){
				that.id = body.data._id;
				that.connected = true;
				that.emit('log in');
				that.rooms._joinRooms();
			});
		});
	}

	join(room) {
		checkArgs(arguments, ['String'], "[DubBot] join", 1);
		
		return this.rooms.add(room);
	}
}

module.exports = DubBot;