var fs = require('fs');
var Sqlite = require('better-sqlite3');

var db = new Sqlite('db.sqlite');

exports.addTigreCoin = function(idUserDiscord){
	const d = new Date ();
	let	date = d.toISOString();
	date = date.substring(0,date.length-5);
	var select = db.prepare('SELECT * FROM user WHERE idUserDiscord = ?');
	var userExist = select.get(idUserDiscord);
	if(userExist == undefined){
		let insert = db.prepare('INSERT INTO user (idUserDiscord, tigreCoin, lastMessageDate) VALUES (?, ?, ?)');
		let run = insert.run(idUserDiscord, 1, date);
	}
	else{
		let lastMessageDate = userExist['lastMessageDate'];
		let result = exports.compareDate(lastMessageDate, date);
		if(result == true){
			let tigreCoin = userExist['tigreCoin'] + 1;
			let update = db.prepare('UPDATE user set tigreCoin = ?, lastMessageDate = ? WHERE idUserDiscord = ?');
			let run = update.run(tigreCoin, date, idUserDiscord);
	  }
	}
	return -1;
}

exports.compareDate = function(lastMessageDate, newDate){
		lastMessageDate = lastMessageDate.split("T");
		newDate = newDate.split("T");
		if(newDate[0] != lastMessageDate[0]){
			return true;
		}
		else{
			lastMessageDate = lastMessageDate[1];
			newDate = newDate[1];
			lastMessageDate = lastMessageDate.split(":");
			newDate = newDate.split(":");
			if(lastMessageDate[0] != newDate[0]){
				return true;
			}
			else if(lastMessageDate[1] != newDate[1]){
				let intA = parseInt(newDate[2]) + 60;
				let intB = parseInt(lastMessageDate[2]);
				let result = intA - intB;
				if(result >=10){
					return true;
				}
				else{
					return false;
				}
			}
			else{
				let intA = parseInt(newDate[2]);
				let intB = parseInt(lastMessageDate[2]);
				let result = intA - intB;
				if(result >=10){
					return true;
				}
				else{
					return false;
				}
			}
		}
}

exports.getTigreCoin = function(idUserDiscord){
	var select = db.prepare('SELECT * FROM user WHERE idUserDiscord = ?');
	var userExist = select.get(idUserDiscord);
	if(userExist == undefined){
		return 0;
	}
	else{
		let tigreCoin = userExist['tigreCoin'];
		return tigreCoin;
	}
}