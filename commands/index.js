const terremoto = require('./earthquake');
const ping = require('./ping')
const exchange = require('./currency_exchange_rate');
const wikisearch = require('./wikipedia');
const response = require('./responses');


const commands = {
    terremoto,
    ping,
    exchange,
    wikisearch,
    response
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