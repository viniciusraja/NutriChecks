
exports.up = function(knex, Promise) {
    return knex.schema.createTable('schools', table => {
        table.increments('id').primary()
        table.string('name', 600).notNull()
        table.string('modalidade', 400)
        table.string('NdeAlunos', 255)      
        table.integer('cityId').references('id')
            .inTable('cities').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('schools')
};
