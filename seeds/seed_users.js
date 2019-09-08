
const bcrypt = require('bcrypt')
const db = require('../database_connection')



exports.seed = function(knex) {
    return knex('users').del()
      .then(function () {
        return hashPassword().then(password => {
          return db.addUser('new name', 'username', password).then(console.log)
        })
      });

};

function makeUsers(){
}

async function hashPassword(){
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash('password', 10, (error, hash) => {
      resolve(hash)
    })
  })
  
  return hashedPassword
}