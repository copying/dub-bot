# DubBot
DubBot is a library which is being thought to be used to make bots. It also contains a custom API that allows to make direct calls to the Dubtrack's servers (read more at the end of this file).

I struggled so hard trying to find what calls are actually done and its usage. Because of that I decided to make a refference in the wiki, allowing any other person a easier way of making projects. This reference is a reference of the calls so it's language free.

# Get started

### Install DubBot
BubBot is an `npm` package. Simply use:
```
npm install dub-bot
```
**Note:** `dubbot` was taken. Don't forget the dash (-).

### Requiring the package
```js
const DubBot = require('dub-bot');
```

### Logging in
```js
var bot = new DubBot('username', 'password');
```
The DubBot logs in asynchronously. You sould only register events (see below) and/or use `join`, which is prepared to wait.

You can also use a bot as a guest (without logging in). Doing this will restrict the functions you can call (like happens in the web).
```js
var bot = new DubBot();
```

### Joining a room
```js
var room = bot.join('room url or id');
```
The most common thing is to have the url (if the url were "url" the link would be `https://www.dubtrack.fm/room/url`).


### Registring events
Both the bot and the room emit events. They extend `events` npm package, so they are osed like so:
```js
bot.on('log-in', function(){
	console.log("Logged in correctly as " + bot);
});
```
Here we log with who we logged in (see implicit conversation to see why we can use bot directly).

They have mutiple events and may send objects as arguments of the callback. Here the current list:

**DubBot**
 - `log-in` Called when the bot has logged in correctly. No arguments are sent.
 - `private-message` Called when the bot recives a private message. The only argument is the `Conversation` object.

**Room**
 - `connect` Called when the bot has succesfully connected to the room. No arguments.
 - `chat-message` Called when the it recived a in chat message. The only argument is a `Message` object.
 - `song-change` Called when the played song in the room is changed. Sends a `Song` object as argument.

### Adding commands
A command is an intruction from in-chat messages to the bot. This library supports detecting commands without making a huge conditional chain.
```js
room.onCommand('!command', cooldown, function(args, message){
	console.log("command triggered");
});
```
Let's start noticing that a command MUST start with an exclamation mark (!) and will only be triggered if the command is at the start of the message.

`cooldown` is a cooldown timer for the command, avoiding to be triggered again before that period of time. This helps avoiding spam as well as preventing multiple triggers for the same function. A good example of this last one is a !skip command, which skips the song. If multiple people trigger this command they may skip more than a single song which was not the intention.

The arguments of the callback are two (2):
 - `args` An array of the message splitted by the sapces (pretty similar to `argc` and `argv` in C when working with console parameters). `args[0]` is always the command.
 - `message` The `Message` object (the same as the `chat-message` event).

Even if a command is succesfully triggered, it will call (after executing teh callback) the `chat-message` event.

### Private messages
TODO

### Objects
 - `DubBot` Base class of the bot.
 - `Room` Room (returned when joining into one).
 - `Message` Message sended via room chat.
 - `User` A dubtrack user.
 - `Conversation` A private conversation. Used to send PM.
 - `Song` A song.

They all have their own properties and methods. Take a look to the wiki for more information.

### Implicit conversation
Every single object can implicitly convert into string. They conver into something they are represented.
 - `DubBot` implicit converts to its username.
 - `Room` implicit converts to its name.
 - `Message` implicit converts to its content.
 - `User` implicit converts to its username.
 - `Conversation` implicit converts to its last message (this is the wierdest one).
 - `Song` implicit converts to the video/song's name.

This implicitly conversations help making a cleaner code. See the following example:
```js
room.on('chat-message', function(message){
	console.log(message.sender + ": " + message);
});
```
Here there are two implicit conversations. The first is `message.sender`, which is a `User`, to its username. The second one is `message` to its content. I find this more readable than the same code without using them:
```js
room.on('chat-message', function(message){
	console.log(message.sender.username + ": " + message.content);
});
```
You can use whichever you prefer. Both work exactly the same way.

### Multiple accounts and join multiple rooms
There is no limit (at least that i know) in how many accounts you can log in and rooms you can join from the same computer/server. This library allows to use multiple accounts and join multiple rooms simultaneously. Let's take a look at the following example:
```js
var bot1 = new DubBot('username', 'password');
var bot2 = new DubBot(); //this one is a guest

var room11 = bot1.join('room1');
var room12 = bot1.join('room2');
var room21 = bot2.join('room1');
```
As you can see it's possible to make two bots connect to the same room even though they are controlled by the same application.
