const axios = require('axios');
const cheerio = require('cheerio')

    const pricesArray = []

    function getPriceByName(name){
        const url = `https://www.ge-tracker.com/item/${name}`

        axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const statsTable = $('#item_stat_overall')
                console.log(name, statsTable.text())
            })
            .catch(console.error);
    }

    module.exports = {
        getPriceByName,
    }