require('dotenv').config()

const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

let database_methods = require('./database_connection')


// db('items').count().first()
//     .then(object => object.count)
//     .then(max => { //number of items
        
//     })

for (let id = 1; id <= 3651; id++){
    db('items').where('db_id', id).first()
        .then(item => {
            db('items').where('db_id', id).first().update({image_url: `https://github.com/osrsbox/osrsbox-db/blob/master/docs/items-icons/${item.id}.png?raw=true`})
                .then(console.log(`updated ${id}`))
        })
    }
// db('items').where('db_id', 2000).first()
//     .then(item => {
//         console.log(item.id)
//     })
setTimeout(() => {
    let array = [1, 2, 3, 4, 5, 100, 300, 1800, 3400]

    array.forEach(id => {
        db('items').where('db_id', id).first()
            .then(console.log)
    })
 }, 5000)

 




