require('dotenv').config()

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

function testTimeout(){
    const test = []
    return getUserId('test')
        .then(id => test.push(id))
        .then(test)
}

function getBooks(username){
    return getUserId(username).then(user => {
        return db('books').where('user_id', user.id)
    })
}

function getSongs(username){
    return getUserId(username).then(user => {
        return db('songs').where('user_id', user.id)
    })
}

module.exports = {
    getUsernames,
    addUser,
    isUsernameAvailable,
    login,
    getUserId,
    getSeedUserId,
    getBooks,
    getSongs,
}

/*
const test = []

db('users').where('name', 'e').pluck('password')
    .then(result => test.push(result))
    .then(() => {
        console.log(test)
    })
*/