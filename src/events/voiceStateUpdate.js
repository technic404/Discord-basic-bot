// <userId, privateChannelId>
const userChannels = new Map();

const CREATE_CHANNEL_ID = "995614717001343039";
const DELETE_PRIVATE_CHANNEL_TIMEOUT = 10; // in seconds

module.exports = {
    name: "voiceStateUpdate",
    async execute(client, oldState, newState) {
        //if(getMember(newState.id).user.bot) return;

        const userId = newState.id;
        const member = newState.guild.members.cache.get(userId)

        // user moved to another voice channel
        if(oldState.channelId != null && newState.channelId != null && newState.channelId != oldState.channelId) {
            if(newState.channelId == CREATE_CHANNEL_ID) {
                createPrivateChannel(newState.guild, newState.channel.parent, member, member.user.tag);
            }

            // if old channel was private and wasn't empty change ownership to first member on that channel
            const updatedChannel = member.guild.channels.cache.get(oldState.channelId);
            if(isChannelPrivate(updatedChannel.id) && updatedChannel.members.size > 0) {
                const firstMember = updatedChannel.members.first();

                if(hasPrivateChannel(firstMember)) {
                    deleteMemberPrivateChannel(firstMember);
                }

                changePrivateChannelOwnership(member.guild, updatedChannel.id, firstMember.id);
            }

            // if new channel is private and is empty change ownership to new member
            if(isChannelPrivate(newState.channelId) && newState.channel.members.size == 1) {
                changePrivateChannelOwnership(member.guild, newState.channelId, member.id);
            }

            if(userChannels.has(userId)) {
                applyChannelDeleteTimeout(member);
            }
        }

        // user joined to voice channel
        if(oldState.channelId === null) {
            if(isChannelPrivate(newState.channelId) && newState.channel.members.size == 1) {
                changePrivateChannelOwnership(member.guild, newState.channelId, member.id);
            }

            if(newState.channelId == CREATE_CHANNEL_ID) {
                createPrivateChannel(newState.guild, newState.channel.parent, member, member.user.tag);
            }

            
        }

        // user left a voice channel
        if(newState.channelId === null) {
            const updatedChannel = member.guild.channels.cache.get(oldState.channelId);
            if(isChannelPrivate(updatedChannel.id) && updatedChannel.members.size > 0) {
                const firstMember = updatedChannel.members.first();

                if(hasPrivateChannel(firstMember)) {
                    deleteMemberPrivateChannel(firstMember);
                }

                changePrivateChannelOwnership(member.guild, updatedChannel.id, firstMember.id);
            }

            if(userChannels.has(userId)) {
                applyChannelDeleteTimeout(member);
            }
        }
    }
}

function changePrivateChannelOwnership(guild, channelId, newOwnerId) {
    for(const [key, value] of userChannels.entries()) {
        if(value == channelId) {
            userChannels.delete(key);
            guild.channels.cache.get(channelId).permissionOverwrites.delete(key);
        }
    }

    userChannels.set(newOwnerId, channelId);
    guild.channels.cache.get(channelId).permissionOverwrites.edit(newOwnerId, { 0x0000000000000010: true })
}

function isChannelPrivate(channelId) {
    for(const [key, value] of userChannels.entries()) {
        if(value == channelId) return true;
    }

    return false;
}

function hasPrivateChannel(userId) {
    return userChannels.has(userId);
}

function deleteMemberPrivateChannel(member) {
    const userChannel = userChannels.get(member.id);

    // check if channel has been manually deleted already
    if(member.guild.channels.cache.get(userChannel) != null) {
        member.guild.channels.cache.get(userChannel).delete();
    }

    userChannels.delete(member.id);
}

function applyChannelDeleteTimeout(member) {
    setTimeout(() => {
        const userChannel = userChannels.get(member.id);

        // owner came back to channel, so cancel delete timeout
        if(member.voice != null && userChannels.has(member.id) && member.voice.channelId == userChannels.get(member.id)) return;

        // owner isn't in the channel, but other users are, so cancel delete timeout
        if(member.guild.channels.cache.get(userChannel) != null && member.guild.channels.cache.get(userChannel).members.size > 0) return;

        deleteMemberPrivateChannel(member);
    }, DELETE_PRIVATE_CHANNEL_TIMEOUT * 1000);
}

async function createPrivateChannel(guild, newChannelParent, member, channelName) {
    if(userChannels.has(member.id)) return;

    const newChannel = await guild.channels.create(`${channelName}`, 
        { 
            type: "GUILD_VOICE",
            parent: newChannelParent
        }
    );

    // set MANAGE_CHANNEL permission for user
    newChannel.permissionOverwrites.edit(member.id, { 0x0000000000000010: true });

    member.voice.setChannel(newChannel);

    userChannels.set(member.id, newChannel.id);
}