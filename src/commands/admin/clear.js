module.exports = {
    name: ["clear", "cc"],
    async execute(client, msg, args) {
        // !clear [liczba wiadomosci]

        if(isNaN(args[1])) return msg.react("❌");

        const clearCount = parseInt(args[1]);

        if(clearCount < 2 || clearCount > 100) return msg.react("❌");

        msg.channel.bulkDelete(clearCount);
    }
}