// Fetch all the recent earthquakes and return the last one
// I know it's inefficient to fetch all, but it's the only way
const axios = require("axios");
const endpoint = "https://api.gael.cl/general/public/sismos"

module.exports = msg => {
    axios.get(endpoint)
        .then(r => msg.reply(`Terremoto en: ${r.data[0].RefGeografica} a las ${r.data[0].Fecha.substr(11,5)} con una magnitud de ${r.data[0].Magnitud}`))
        .catch(err => {
            console.error(err);
            msg.reply("Perdon, intenta mas tarde");
        });
}