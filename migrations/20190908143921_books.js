
exports.up = function(knex) {
  return knex.schema.createTable('books', function(t) {
    t.increments('id'),
    t.integer('user_id').references('users.id'),
    t.string('title'),
    t.string('author'),
    t.string('publisher'),
    t.text('description')
  })
};

exports.down = function(knex) {
  
};