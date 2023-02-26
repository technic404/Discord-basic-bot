const { Client, Intents } = require("discord.js");
const { loadEvents, loadCommands, loadUpdaters } = require("./handler");

const client = new Client({intents: new Intents(32767)});

loadEvents(client);
loadCommands(client);
loadUpdaters(client);

client.login("BOT_TOKEn");