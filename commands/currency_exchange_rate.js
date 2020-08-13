// Get exchange rate for two different currencies
const axios = require("axios");
const endpoint = "https://free.currconv.com/api/v7/convert";

const Cache = require("../utils/cache");
const cache = new Cache(1000*60*30);

module.exports = async (msg, params) => {
    const currencies = params.toUpperCase().split(" ");

    if (currencies.length != 2)
        return msg.reply("Wrong parameters for command");

    const [from, to] = currencies;

    const cachedData = cache.get(currencies.join(" "));
    if(cachedData){
        msg.reply(cachedData);
    }else{
        try {
            const response = await axios.get(endpoint, {
                params: {
                    q: `${from}_${to}`,
                    compact: "ultra",
                    apiKey: process.env.exchange_rate_api_key
                }
            })

            const exchangeRate = response.data[`${from}_${to}`];
            const reply = `The exchange rate is ${exchangeRate}`;

            // Cache response
            cache.cache(currencies.join(" "), reply);

            msg.reply(reply);
        } catch (error) {
            console.error("Error with currency command", error)
            msg.reply("Perdon, intenta mas tarde");
        }
    }
}