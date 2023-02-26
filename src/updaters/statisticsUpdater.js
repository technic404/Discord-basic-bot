module.exports = {
    interval: 60 * 1000,
    async execute(client) {
        const guild = client.guilds.cache.get("995614716418347108");
        const serverUsers = await guild.members.fetch();

        const onlineUsers = serverUsers.filter(member => member.presence != null && member.presence.status != "offline");

        const channels = {
            ALL_MEMBERS_CHANNEL: client.channels.cache.get("1018214677114798091"),
            ONLINE_MEMBERS_CHANNEL: client.channels.cache.get("1018214644420194404")
        }

        channels.ALL_MEMBERS_CHANNEL.setName(`Wszyscy: ${serverUsers.size}`);
        channels.ONLINE_MEMBERS_CHANNEL.setName(`Online: ${onlineUsers.size}`);
    }
}