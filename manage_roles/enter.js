require("dotenv").config();

const listenWelcomeReactions = async guild => {
    const welcomeChannel = guild.channels.cache.find(ch => ch.id === process.env.welcome_channel_id);
    const welcomeMessage = await welcomeChannel.messages.fetch(process.env.welcome_message_id);
    const collector = welcomeMessage.createReactionCollector(() => true);

    collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        const actualUser = guild.members.cache.find(u => u.id == user.id)
        addToRole(actualUser);
    });
}

const addToRole = async user => {
    console.log(`Adding ${user.user.username} to basic group`)

    if (await user.roles.cache.has(process.env.basic_user_role_id)) {
        console.log(`${user.user.username} already has role`)
        return false;
    }

    await user.roles.add(process.env.basic_user_role_id);
    console.log(`${user.username} is now part of the family`)
}

module.exports = {
    listenWelcomeReactions
}