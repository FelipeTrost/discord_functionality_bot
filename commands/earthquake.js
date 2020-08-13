// Fetch all the recent earthquakes and return the last one
// I know it's inefficient to fetch all, but it's the only way
const axios = require("axios");
const endpoint = "https://api.gael.cl/general/public/sismos"

const Cache = require("../utils/cache");
const cache = new Cache(1000*60);

module.exports = async msg => {
    try{
        const cachedData = cache.get("earthquake");
        if(cachedData){
            msg.reply(cachedData);
        }
        else{
            const apiResonse = await axios.get(endpoint);
            const message = `Terremoto en: ${apiResonse.data[0].RefGeografica} a las ${apiResonse.data[0].Fecha.substr(11,5)} con una magnitud de ${apiResonse.data[0].Magnitud}`

            cache.cache("earthquake", message)
            msg.reply(message);
        }

    }catch(error){
        msg.reply("Perdon, intenta mas tarde");
        console.error(error);
    }
}