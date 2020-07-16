// Get exchange rate for two different currencies
const axios = require("axios");
const endpoint = "https://free.currconv.com/api/v7/convert"

module.exports = async (msg, params) => {
    const currencies = params.toUpperCase().split(" ");

    if (currencies.length != 2)
        return msg.reply("Wrong parameters for command");

    const [from, to] = currencies;

    try {
        const response = await axios.get(endpoint, {
            params: {
                q: `${from}_${to}`,
                compact: "ultra",
                apiKey: process.env.exchange_rate_api_key
            }
        })

        const exchangeRate = response.data[`${from}_${to}`]

        msg.reply(`The exchange rate is ${exchangeRate}`);

    } catch (error) {
        console.error("Error with currency command", error)
        msg.reply("Perdon, intenta mas tarde");
    }
}