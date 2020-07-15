const axios = require("axios");
const terremoto = require("./earthquake.js")

const commands = {
    terremoto
};

module.exports = msg => {
    const command = msg.content.substr(1).toLowerCase();

    if (command && commands[command]) {
        commands[command](msg);
    } else {
        msg.reply("Blip blop, no command available");
    }
}