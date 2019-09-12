
const axios = require('axios');
const cheerio = require('cheerio')

    function getPriceByName(name){ //comes in "Like This", needs to become "like-this"
        let parsedName = name.replace(/\s+/g, '-').toLowerCase();

        const url = `https://www.ge-tracker.com/item/${parsedName}`

        return axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const statsTable = $('#item_stat_overall')
                return statsTable.text()
            })
            .catch('error in scrape');
    }

    module.exports = {
        getPriceByName,
    }
