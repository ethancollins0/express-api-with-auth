require('dotenv').config()

let ge_items_array = []

const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

function isUsernameAvailable(username){
    return db('users').where({username: username})
}

function getSeedUserId(){
    return db('users').orderBy('id').limit(1).then(user => user[0].id)
}

function getUsernames() {
    return db.select('username').from('users')
}

function login(username){
    return db('users').where({'username': username}).first()
}

function addUser(name, username, password){
    return db('users').returning('id').insert({name: name, username: username, password: password})
}

function getUserId(username){
    return db('users').where('username', username).first()
}

function sendPrices(){
    return db.column('id').select().from('items')
        .then(items => items)
}

function findItemById(id){
    return db('items').where('id', id).first()
}

function findItemByDbId(db_id){
    return db('items').where('db_id', db_id).first()
}

function getRandomItem(){
    return db('items').count().first()
        .then(object => {
            let randomId = Math.floor(Math.random() * (object.count - 0));
            return randomId
        })
}


function addRandomItem(username){
    getUserId(username)
        .then(user => {
            getRandomItem()
                .then(item_id => {
                    findItemByDbId(item_id)
                        .then(item => {
                            return db('user_items').insert({user_id: user.id, item_id: item.db_id})
                        })
                })
        })
}

function getUserItemIds(username){
    return getUserId(username)
        .then(user => user.id)
        .then(id => {
            return db('user_items').where('user_id', id)
        })
}

function getUserItems(username){
    return getUserItemIds(username)
        .then(items => getUserItemsById(items))
        .then(resp => resp)
}
    
function getUserItemsById(itemArray){
    let db_id_array = []
    itemArray.forEach(item => {
        db_id_array.push(item.item_id)
    })

    return db('items').whereIn('db_id', db_id_array)
}

module.exports = {
    getUsernames,
    addUser,
    isUsernameAvailable,
    login,
    getUserId,
    getSeedUserId,
    sendPrices,
    findItemById,
    getRandomItem,
    findItemByDbId,
    getUserItems,
}

// db('items').count().then(console.log)








/*
const test = []

db('users').where('name', 'e').pluck('password')
    .then(result => test.push(result))
    .then(() => {
        console.log(test)
    })
*/