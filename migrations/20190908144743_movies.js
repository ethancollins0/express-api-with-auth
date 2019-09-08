
exports.up = function(knex) {
    return knex.schema.createTable('movies', function(t) {
        t.increments('id'),
        t.integer('user_id').references('users.id'),
        t.string('title'),
        t.string('director'),
        t.string('year'),
        t.string('length'),
        t.text('description')
      })
};

exports.down = function(knex) {
  
};
