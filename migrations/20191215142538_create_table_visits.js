
exports.up = function(knex, Promise) {
    return knex.schema.createTable('visits', table => {
        table.increments('id').primary()
        table.string('visitOrder').notNull()
        table.date('date').defaultTo(knex.fn.now())
        table.integer('schoolId').references('id')
            .inTable('visits').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('visits')
};
