const terremoto = require('./earthquake.js');
const ping = require('./ping')
const exchange = require('./currency_exchange_rate');

const commands = {
    terremoto,
    ping,
    heart: msg => msg.reply("<#732960182459695194>"),
    exchange
}

module.exports = msg => {
    const command = msg.content.substr(1).split(" ")[0];
    const parameters = msg.content.replace(`!${command} `, '');

    if (command && commands[command]) {
        commands[command](msg, parameters);
    } else {
        msg.reply("Blip blop, no command available");
    }
}