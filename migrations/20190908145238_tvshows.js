
exports.up = function(knex) {
    return knex.schema.createTable('tvshows', function(t) {
        t.increments('id'),
        t.integer('user_id').references('users.id'),
        t.string('title'),
        t.string('content-rating'),
        t.string('user-rating'),
        t.text('description'),
        t.string('genre'),
        t.integer('number_of_episodes')
    })
};

exports.down = function(knex) {
  
};
