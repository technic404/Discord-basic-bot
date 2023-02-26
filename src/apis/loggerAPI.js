const { MessageEmbed } = require("discord.js");

const logChannelId = "995988337905111051";

module.exports = {
    logDeletedMessage,
    logEditedMessage
}

function logDeletedMessage(client, msg) {
    if(msg.author.bot) return;

    if(logChannelId == msg.channel.id) return;

    const embed = new MessageEmbed()
    .setTitle("🗑 Usunięta wiadomość")
    .setDescription(
        `**Użytkownik:** <@${msg.author.id}>\n` +
        `**Kanał:** <#${msg.channel.id}>\n` +
        `**Wiadomość:**\n` +
        `${msg.content}`
    )
    .setColor("RED");

    client.channels.cache.get(logChannelId).send({embeds: [embed]});
}


function logEditedMessage(client, msg1, msg2) {
    if(msg1.author.bot) return;

    if(logChannelId == msg1.channel.id) return;

    const embed = new MessageEmbed()
    .setTitle("🗑 Zedytowana wiadomość")
    .setDescription(
        `**Użytkownik:** <@${msg1.author.id}>\n` +
        `**Kanał:** <#${msg1.channel.id}>\n` +
        `**Stara wiadomość:**\n` +
        `${msg1.content}\n` +
        `**Nowa wiadomość:**\n` +
        `${msg2.content}`
    )
    .setColor("YELLOW");

    client.channels.cache.get(logChannelId).send({embeds: [embed]});
}