const Discord = require('discord.js');
const handleCommand = require("./commands");
const {
    listenWelcomeReactions
} = require("./manage_roles/enter")
require('dotenv').config();

// Discord bot client
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.find(g => g.id == process.env.guild_id)

    listenWelcomeReactions(guild)
});

client.on('message', message => {
    // Ignore DMs
    // If the message doesnt come from the server we're trying to manage we just ignore it
    if (message.channel.type = "dm" && message.guild && message.guild.id != process.env.guild_id)
        return null;

    else if (message.content.charAt(0) === "!")
        handleCommand(message)
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

client.login(process.env.token);