const { MessageEmbed } = require("discord.js");
const { getChannelDetails } = require("../../apis/youtubeAPI");

module.exports = {
    name: ["youtube"],
    async execute(client, msg, args) {
        // !youtube [channel ID]

        if(args.length != 2) return msg.reply("!youtube [channel ID]");

        const channelId = args[1];

        getChannelDetails(channelId).then(data => {
            const embed = new MessageEmbed()
            .setTitle("YouTube")
            .setColor("RED")
            .setDescription(
                `Suby: \`${data.subscribers}\`\n` +
                `Wyświetlenia: \`${data.views}\`\n` +
                `Liczba filmów: \`${data.videos}\``
            );

            msg.channel.send({embeds: [embed]});
        })
    }
}