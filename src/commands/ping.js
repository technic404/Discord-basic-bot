module.exports = {
    name: ["ping"],
    async execute(client, msg, args) {
        msg.channel.send("ping command")
    }
}