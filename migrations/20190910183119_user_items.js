exports.up = function(knex) {
    return knex.schema.createTable('user_items', function(t) {
        t.increments('id'),
        t.bigInteger('user_id').references('id').inTable('users')
        t.bigInteger('item_id').references('db_id').inTable('items')
      })
}; 

exports.down = function(knex) {
  
};
