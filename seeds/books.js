const db = require('../database_connection')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries

      return createBooks(knex)
    });
};

function createBooks(knex){
  return db.getSeedUserId().then(user_id => {
    return knex('books').insert([
      {user_id: user_id, title: 'Book 1'},
      {user_id: user_id, title: 'Book 2'},
      {user_id: user_id, title: 'Book 3'},
    ]);
  })
}

