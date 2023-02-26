const { getMemberFromArg } = require("../../utils/mentionsUtil");
const { MessageEmbed } = require("discord.js");

const months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia"
]
const status = {
    "online": "🟢",
    "idle": "🟡",
    "dnd": "🔴",
    "offline": "⚪"
}

module.exports = {
    name: ["userinfo"],
    async execute(client, msg, args) {
        let member = getMemberFromArg(msg, args[1]);

        if(!member) member = msg.member;

        const presence = (member.presence == null ? "offline" : member.presence.status);

        const joinedDate = new Date(Math.floor(member.joinedTimestamp));
        const joinedDateParsed = `${joinedDate.getDate()} ${months[joinedDate.getMonth()]} ${joinedDate.getFullYear()} o ${joinedDate.getHours()}:${joinedDate.getMinutes()}:${joinedDate.getSeconds()}`;

        const createdDate = new Date(Math.floor(member.user.createdTimestamp));
        let createdDateParsed = `${createdDate.getDate()} ${months[createdDate.getMonth()]} ${createdDate.getFullYear()} o ${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`;

        if(isNaN(createdDate.getDate())) {
            createdDateParsed = "-";
        }

        const embed = new MessageEmbed()
        .setTitle("Informacje o użytkowniku")
        .setDescription(
            "```ID: " + member.user.id + "```" +
            "```Status użytkownika: " + status[presence] + " (" + presence + ")```" +
            "```Liczba ról: " + (member.roles.cache.size - 1) + "```" +
            "```Dołączył na serwer: " + joinedDateParsed + "```" +
            "```Stworzył konto: " + createdDateParsed + "```"
        )
        .setColor(member.displayHexColor)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}));

        msg.channel.send({embeds: [embed]});
    }
}