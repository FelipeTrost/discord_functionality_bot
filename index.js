const Discord = require('discord.js');
const handleCommand = require("./commands");
const {
    listenWelcomeReactions,
    checkAllReactions
} = require("./manage_roles/enter")
require('dotenv').config();

// Discord bot client
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.find(g => g.id == process.env.guild_id)

    // Here I don't await it, because it can just run in the background
    checkAllReactions(guild);

    listenWelcomeReactions(guild);
});

client.on('message', message => {
    // Ignore DMs
    // If the message doesnt come from the server we're trying to manage we just ignore it
    if (message.channel.type = "dm" && message.guild && message.guild.id != process.env.guild_id) return;

    if (message.content.charAt(0) === "!")
        handleCommand(message)
});

// Greet new members
client.on('guildMemberAdd', async member => {
    const guild = member.guild;

    if (guild && guild.id != process.env.guild_id) return;

    const greetingChannel = guild.channels.cache.get(process.env.greeting_channel_id);

    greetingChannel.send(
        `Bienvenido <@${member.id}>, para obtener acceso, dirígete al canal "welcome", y reacciona a las reglas del servidor`
    )
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

client.login(process.env.token);