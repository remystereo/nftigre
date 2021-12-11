'use strict'

const Discord = require("discord.js");
const fs = require('fs');

var model = require('./func_sql');

var TOKEN = "OTE5MjE3MTY1ODIxOTU2MDk2.YbSlsg.Ge3THtNMFsh63ERpI8kO5viVLRE";




const Client = new Discord.Client;
Client.on("ready", () => {
	console.log("Le bot a démarré");
});

Client.on("message", message => {
	if(message.author.bot) return;
	if(message.content == "/getTC"){
		let tigreCoin = model.getTigreCoin(message.author.id);
		message.reply("tu as : " + tigreCoin + " TigreCoin.");
	}
	else{
			model.addTigreCoin(message.author.id);
	}

});

Client.on('messageReactionAdd', (reaction, user) => {
	if(user.bot) return;

  

});

Client.on('messageReactionRemove', (reaction, user) => {
    

});


Client.login(process.env.TOKEN);