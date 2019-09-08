
exports.up = function(knex) {
    return knex.schema.createTable('boardgames', function(t) {
        t.increments('id'),
        t.integer('user_id').references('users.id'),
        t.string('name'),
        t.text('description'),
        t.string('game_length'),
        t.string('number_of_players')
      })
};

exports.down = function(knex) {
  
};
