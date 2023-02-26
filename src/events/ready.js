const { connection } = require("../apis/mysqlAPI");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = {
    name: "ready",
    async execute(client) {
        client.user.setActivity(
            "Status bota",
            {
                type: "WATCHING"
            }
        );
    
        console.log(`Logged as ${client.user.tag}`);

        connection.connect((err) => {
            if(err) throw err;

            console.log(`Connected to database`);
        });

        /* Slash commands register */
        const commands = [
            {
                name: "slash",
                description: "Slash command!"
            },
            {
                name: "test",
                description: "Test command!"
            }
        ];

        const rest = new REST({version: '10'}).setToken(client.token);

        try {
            await rest.put(Routes.applicationCommands(client.user.id), {body: commands});

            console.log(`Loaded ${commands.length} slash commands`)
        } catch(e) { }
    }
}