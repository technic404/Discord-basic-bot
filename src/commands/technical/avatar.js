const { getMemberFromArg } = require("../../utils/mentionsUtil")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: ["avatar"],
    async execute(client, msg, args) {
        // !avatar [@user]

        let member = getMemberFromArg(msg, args[1]);

        if(!member) member = msg.member;

        if(!member.user.avatar) return msg.reply("Ten użytkownik nie ma ustawionego avatara");

        const embed = new MessageEmbed()
        .setTitle(`Avatar użytkowniika ${member.user.username}`)
        .setImage(member.user.avatarURL({dynamic: true, size: 512}))
        .setColor(member.displayHexColor);

        msg.channel.send({embeds: [embed]});
    }
}