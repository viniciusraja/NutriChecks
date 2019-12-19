
exports.up = function(knex, Promise) {
    return knex.schema.createTable('avaliationChecks', table => {
        table.increments('id').primary()
        table.string('check').notNull()
        table.string('avaliationChecks')    
        table.integer('groupChecksId').references('id')
            .inTable('avaliationChecks').notNull()


    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('avaliationChecks')
};
