"use strict"

const fs = require('fs');
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

db.prepare('DROP TABLE IF EXISTS user').run();


db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, idUserDiscord INTEGER, tigreCoin INTEGER, lastMessageDate TEXT)').run();

