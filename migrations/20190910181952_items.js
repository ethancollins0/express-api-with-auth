
exports.up = function(knex) {
    return knex.schema.createTable('items', function(t) {
        t.increments('db_id'),
        t.integer('cost'),
        t.boolean('duplicate'),
        t.boolean('equipable'),
        t.boolean('equipable_by_player'),
        t.boolean('equipable_weapon'),
        t.string('examine'),
        t.integer('highalch'),
        t.integer('id'),
        t.integer('linked_id_noted'),
        t.integer('linked_id_placeholder'),
        t.integer('lowalch'),
        t.boolean('members'),
        t.string('name'),
        t.boolean('noteable'),
        t.boolean('noted'),
        t.boolean('placeholder'),
        t.boolean('quest_item'),
        t.string('release_date'),
        t.boolean('stackable'),
        t.boolean('tradeable'),
        t.boolean('tradeable_on_ge'),
        t.float('weight'),
        t.string('wiki_name'),
        t.string('wiki_url'),
        t.string('image_url'),
        t.string('updated_price')
      })
};

exports.down = function(knex) {
  
};
