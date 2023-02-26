const { getRecursivelyDirectoryFiles } = require("./src/utils/filesUtil");
const { Collection } = require('discord.js');

module.exports = {
    loadEvents,
    loadCommands,
    loadUpdaters
}

function loadEvents(client) {
    const events = getRecursivelyDirectoryFiles("./src/events", ".js");

    for(const event of events) {
        const object = require(`./${event}`);

        if(!object.name) { continue; }

        client.on(object.name, (...args) => { object.execute(client, ...args); })
    }

    console.log(`Loaded ${events.length} events`);
}

function loadCommands(client) {
    client.commands = new Collection();

    const commands = getRecursivelyDirectoryFiles("./src/commands", ".js");

    for(const command of commands) {
        const object = require(`./${command}`);

        if(!object.name) { continue; }

        for(const alias of object.name) {
            client.commands.set(alias, object);
        }
    }

    console.log(`Loaded ${commands.length} commands`);
}

function loadUpdaters(client) {
    const updaters = getRecursivelyDirectoryFiles("./src/updaters", ".js");

    for(const updater of updaters) {
        const object = require(`./${updater}`);

        if(!object.interval) continue;

        setInterval(() => {
            object.execute(client);
        }, object.interval);
    }
}