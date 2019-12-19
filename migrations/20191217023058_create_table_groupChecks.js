
exports.up = function(knex, Promise) {
    return knex.schema.createTable('groupChecks', table => {
        table.increments('id').primary()
        table.string('groupName').notNull()
        table.integer('visitId').references('id')
            .inTable('groupChecks').notNull()

    })
};
//deletar referencia à escola ID, conflita com a já estabelecida
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('groupChecks')
};
