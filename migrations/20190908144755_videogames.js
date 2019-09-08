
exports.up = function(knex) {
    return knex.schema.createTable('videogames', function(t) {
        t.increments('id'),
        t.integer('user_id').references('users.id'),
        t.string('developer'),
        t.string('content-rating'),
        t.string('user-rating'),
        t.string('publisher'),
        t.text('description'),
        t.string('genre')
      })
};

exports.down = function(knex) {
  
};
