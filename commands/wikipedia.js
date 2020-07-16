// Search for short descriptions in wikipedia
const axios = require("axios");
const endpoint = "https://en.wikipedia.org/w/api.php"

module.exports = async (msg, params) => {
    try {
        const response = await axios.get(endpoint, {
            params: {
                action: "query",
                prop: "description",
                titles: params,
                format: "json",
                origin: "*"
            }
        })

        const pageKey = Object.keys(response.data.query.pages)[0];
        const shortDescription = response.data.query.pages[pageKey].description

        if (shortDescription)
            msg.reply(`Wikipedia says: ${shortDescription}`);
        else
            msg.reply("Didn't find anything")

    } catch (error) {
        console.error("Error with currency command", error)
        msg.reply("Perdon, intenta mas tarde");
    }
}