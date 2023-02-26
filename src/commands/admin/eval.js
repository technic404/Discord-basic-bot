module.exports = {
    name: ["eval"],
    async execute(client, msg, args) {
        // !eval [code]

        const code = eval(msg.content.replace("!eval", ""));

        if(typeof code == "string") {
            msg.channel.send(code);
        }
    }
}