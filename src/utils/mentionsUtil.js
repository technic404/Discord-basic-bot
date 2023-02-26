module.exports = {
    getMemberFromArg
}

function getMemberFromArg(msg, argument) {
    return (msg.mentions.members.size == 1 ? msg.mentions.members.first() : (argument == null || argument == undefined ? null : msg.guild.members.cache.get(argument)));
}