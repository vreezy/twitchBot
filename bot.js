const tmi = require('tmi.js');
const dotenv = require('dotenv');
dotenv.config();

// docu
// https://dev.twitch.tv/docs/irc
// get auth token:
// https://twitchapps.com/tmi/

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
		username: process.env.XUSERNAME,
		password: process.env.XPASSWORD
	},
	channels: [ process.env.XCHANNEL ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	// if(message.toLowerCase() === '!hello') {
	// 	client.say(channel, `@${tags.username}, heya!`);
    // }
    
    if(message.toLowerCase() === '!discord') {
		client.say(channel, `Hallo @${tags.username}, meinen Discord Server findest Du unter https://discord.gg/uat7ZSe`);
    }

    if(message.toLowerCase() === '!twitter') {
		client.say(channel, `Hallo @${tags.username}, hier ist mein Twitter Account:  https://twitter.com/vreezyDE`);
    }

    if(message.toLowerCase() === '!git' || message.toLowerCase() === '!github') {
		client.say(channel, `Hallo @${tags.username}, hier ist mein Github Account: https://github.com/vreezy/`);
    }

    if(message.toLowerCase() === '!webseite' || message.toLowerCase() === '!website' || message.toLowerCase() === '!web') {
		client.say(channel, `Hallo @${tags.username}, meine Webseite findest Du hier: https://vreezy.de/`);
    }

    if(message.toLowerCase() === '!instagram' || message.toLowerCase() === '!insta') {
		client.say(channel, `Hallo @${tags.username}, hier ist mein Instagram Account : https://www.instagram.com/vreezy.de/`);
    }

});
	