require('dotenv').config()

const configuration = require('./knexfile')['development']
const db = require('knex')(configuration)

function isUsernameAvailable(username){
    return db('users').where({username: username})
}

function checkUsernames(username, taken){
    let available = true
    taken.forEach(user => {
        if (user.username == username){
            available = false
        }
    })
    return available
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


module.exports = {
    getUsernames,
    addUser,
    isUsernameAvailable,
    login,
    getUserId,
}

/*
const test = []

db('users').where('name', 'e').pluck('password')
    .then(result => test.push(result))
    .then(() => {
        console.log(test)
    })
*/

