const axios = require('axios');
const cheerio = require('cheerio')
const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

    function getPriceByName(name){
        name = name.replace(/\s+/g, '-').toLowerCase();
        const url = `https://www.ge-tracker.com/item/${name}`

        return axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const stats = $('#item_stat_offer_price').text()
                console.log(stats)
                return stats
            })
            .catch(() => {
                return 0
            });
    }

    function updatePrice(item){
        return getPriceByName(item.name)
            .then(price => {
                return db('items').where('db_id', item.db_id).update('updated_price', price)
            })
    }

    function getItemThenUpdate(db_id){
        return db('items').where('db_id', db_id)
            .then(item => updatePrice(item[0]))
            .then(() => {
                return db('items').where('db_id', db_id)
            })
    }


    // updatePrice()
    module.exports = {
        updatePrice,
        getItemThenUpdate,
    }
    // getEveryItem().then(items => {
    //     items.forEach(item => staggerPriceFetch(item))
    // })

    // function staggerPriceFetch(item){
    //     let time = Math.floor(Math.random() * 10000) + 5000
    //     setTimeout(() => {
    //         getPriceById(item.id)
    //             .then(price => updateItemPrices(item, price))
    //             .catch(() => {
    //                 console.log('Failed to fetch')
    //             })
    //     }, Math.floor(Math.random() * 2000) + 1000 * item.db_id)
    // }

    // function updateItemPrices(item, price){
    //     if (price){
    //         db('items').where('db_id', item.db_id).update('updated_price', price)
    //         console.log(`Successfully updated ${item.name} with price: ${price}`)
    //     } else {
    //         console.log(`Failed to update ${item.name}`)
    //     }
    // }

    // function fetchItemPrice(item){
    //         return fetch(`http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${item.id}`)
    //             .then(resp => resp.json())
    //             .then(item => item)
    //             .catch(() => {
    //                 console.log(`Failed to fetch for ${item.name}`)
    //             })
    // }

    // getEveryItem().then(items => {
    //     items.forEach(item => {
    //         setTimeout(() => {
    //             fetchItemPrice(item).then(json => updatePrice(item, json.item.current.price)).catch(() => {
    //                 console.log('failed to fetch')
    //             })
    //         }, 1500 * item.db_id)
    //     })
    // })

    // function updatePrice(item, price){
    //     if (typeof price == 'number'){
    //         price = `${price}`
    //     }
    //     db('items').where('db_id', item.db_id).update('updated_price', price)
    //         .then(console.log(`Successfully updated ${item.name} with price: ${price}`))
    //         .catch(() => {
    //             console.log(`Failed to update ${item.name}`)
    //         })
    // }


















    // getEveryItem().then(itemObjArray => {
    //     itemObjArray.forEach(item => {
    //         fetchItemPrice(item)
    //             .then(console.log())
    //     })
    // })











    // function updateAllPrices(item, number){
    //     console.log(item, number)
    //     setTimeout(() => {
    //         getPriceById(item.id)
    //             .then(price => {
    //                 if (price){
    //                     db('items').where('db_id', item.db_id).first().update('updated_price', price)
    //                     return `Successfully Updated ${item.name} with price: ${price}.`
    //                 } else {
    //                     return `Price was not found or 0.`
    //                 }
    //             }).catch(console.log(`Failed to update ${item.name}`))
    //     }, 2000 * number)
    // }

    // getEveryItem()
    //     .then(itemObjectArray => {
    //         let i = 0;
    //         itemObjectArray.forEach(item => {
    //             updateAllPrices(item, i)
    //             i+=1;
    //         })
    //     })




   






    // getEveryItem()
    //     .then(itemObjArray => {
    //         itemObjArray.forEach(item => {
    //             staggerPriceScrape(item)
    //         })
    //     })


    // function staggerPriceScrape(item){
    //     setTimeout(() => {
    //         return getPriceByName(item.name)
    //             .then((price) => {
    //                 if (price != 0 && price){
    //                     return db('items').where('db_id', item.db_id).update('updated_price', price)
    //                         .then(console.log(`Updated ${item.name} with price: ${price}`))
    //                 } else {
    //                     console.log(`Failed to update ${item.name}. The Price was: ${price}`)
    //                     return 0
    //                 }
    //             }).catch((error) => {
    //                 console.log(`Failed to update ${item.name}.`)
    //             })
    //     }, item.db_id * Math.floor(Math.random()*4000)+1000)
    // }


    //     // .then(itemsArray => {
    //     //     itemsArray.forEach(item => {
    //     //         getPriceByName(item.name)
    //     //             .then(price => {
    //     //                 console.log(item)
    //     //             })
    //     //     })
    //     // })