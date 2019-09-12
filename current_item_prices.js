const axios = require('axios');
const cheerio = require('cheerio')
const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

let database_methods = require('./database_connection')

function getEveryItem(){
    return db.select('name', 'db_id').from('items').orderBy('db_id', 'asc')
}


    function getPriceByName(name){
        name = name.replace(/\s+/g, '-').toLowerCase();
        const url = `https://www.ge-tracker.com/item/${name}`

        return axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const statsTable = $('#item_stat_overall')
                return statsTable.text()
            })
            .catch(console.error);
    }

    module.exports = {
        getPriceByName,
        getEveryItem,
    }

    getEveryItem()
        .then(itemObjArray => {
            itemObjArray.forEach(item => {
                staggerPriceScrape(item)
            })
        })


    function staggerPriceScrape(item){
        setTimeout(() => {
            return getPriceByName(item.name)
                .then((price) => {
                    if (price != 0){
                        return db('items').where('db_id', item.db_id).update('updated_price', price)
                            .then(console.log(`Updated ${item.name} with price: ${price}`))
                    }
                })
        }, item.db_id * 2000)
    }


        // .then(itemsArray => {
        //     itemsArray.forEach(item => {
        //         getPriceByName(item.name)
        //             .then(price => {
        //                 console.log(item)
        //             })
        //     })
        // })