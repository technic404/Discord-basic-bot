const prefix = "!";

module.exports = {
    name: "messageCreate",
    async execute(client, msg) {
        if(msg.author.bot) return;

        const content = msg.content;

        if(!content.startsWith(prefix)) return;

        /* args[0] => command name */
        const args = content.slice(prefix.length).split(" ");

        if(!client.commands.has(args[0])) return;

        const command = client.commands.get(args[0]);

        try {
            command.execute(client, msg, args);
        } catch(e) {  }
    }
}