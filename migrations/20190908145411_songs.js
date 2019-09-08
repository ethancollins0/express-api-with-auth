
exports.up = function(knex) {
    return knex.schema.createTable('songs', function(t) {
        t.increments('id'),
        t.integer('user_id').references('users.id'),
        t.string('artist'),
        t.string('title'),
        t.string('album_name'),
        t.string('genre')
      })
};

exports.down = function(knex) {
  
};
