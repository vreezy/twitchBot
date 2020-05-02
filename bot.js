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

function rollDice(min, max) {
	return min + Math.floor(Math.random() * (max-min + 1))
}

function coinToss() {
	return rollDice(1, 2) > 1 ? "Kopf" : "Zahl";
}

function slotValues() {
	return [rollDice(1,9), rollDice(1,9), rollDice(1,9)];
}

function slotView(slotValues) {
	return slotValues.map(value => {
		switch(value) {
			case 1:
				return "🌞";
			case 2:
				return "🎱";
			case 3:
				return "🧻";
			case 4:
				return "💎";
			case 5:
				return "🔔";
			case 6:
				return "🎵";
			case 7:
				return "💲";
			case 8:
				return "🎠";
			default:
			case 9:
				return "🧊";				
		}
	}).join("");
}

function slotMachine(slotValues, name) {
	if(slotValues[0] === 9 && slotValues[1] === 9 && slotValues[2] === 9) {
		return `🎰 @${name}, zieht am Hebel und erhält ${slotView(slotValues)}. Ice Ice Baby!`
	}

	if(slotValues[0] === 5 && slotValues[1] === 5 && slotValues[2] === 5) {
		return `🎰 @${name}, zieht am Hebel und erhält ${slotView(slotValues)} und läßt die Glocken leuten!`
	}

	if(slotValues[0] === 7 && slotValues[1] === 7 && slotValues[2] === 7) {
		return `🎰 @${name}, zieht am Hebel und erhält ${slotView(slotValues)} und hat damit den 💲JACKPOT💲 geknackt!`
	}

	return `🎰 @${name}, zieht am Hebel und erhält ${slotView(slotValues)}.`
}
const arr = [];

function getDummy() {
	
	return {
		"badge-info": null,
		"badges": {
			"broadcaster": "1"
		},
		"color": null,
		"display-name": "bot" + rollDice(100, 999),
		"emotes": null,
		"flags": null,
		"id": "000",
		"mod": false,
		"room-id": "191308898",
		"subscriber": false,
		"tmi-sent-ts": "1588447795179",
		"turbo": false,
		"user-id": "191308898",
		"user-type": null,
		"emotes-raw": null,
		"badge-info-raw": null,
		"badges-raw": "broadcaster/1",
		"username": "bot",
		"message-type": "chat"
	}
}

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
	
	if(message.toLowerCase() === '!dice' || message.toLowerCase() === '!dice6') {
		client.say(channel, `🎲 @${tags.username}, würfelt eine ${rollDice(1, 6)}`);
	}
	
	if(message.toLowerCase() === '!dice20') {
		client.say(channel, `🎲 @${tags.username}, würfelt eine ${rollDice(1, 20)}`);
	}
	
	if(message.toLowerCase() === '!coin') {
		client.say(channel, `🎲 @${tags.username}, wirft ${coinToss()}`);
	}

	if(message.toLowerCase() === '!slot') {
		client.say(channel, slotMachine(slotValues(), tags.username));
	}

	if(message.toLowerCase() === '!fight') {
		arr.push(tags);
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		arr.push(getDummy());
		console.log(tags)
	}
	

});
	

var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "*");
  	res.json(arr);
});

app.listen(8080, function () {
 
});