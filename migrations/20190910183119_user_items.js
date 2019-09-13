exports.up = function(knex) {
    return knex.schema.createTable('user_items', function(t) {
        t.increments('id'),
        t.bigInteger('user_id')
        t.bigInteger('item_id')
      })
}; 

exports.down = function(knex) {
  
};
