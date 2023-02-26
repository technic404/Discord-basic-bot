const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        const user = member.user;
        const channel = client.channels.cache.get("995614717001343038"); // general

        //channel.send(`Witaj <@${user.id}>!`);

        const embed = new MessageEmbed()
        .setTitle("Wiadomość powitalna")
        .setDescription(`Witaj <@${user.id}>!`)
        .setColor("AQUA")
        .setTimestamp();

        channel.send({embeds: [embed]});
    }
}