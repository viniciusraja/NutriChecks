const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const avaliationCheck = { ...req.body }
        if(req.params.id) avaliationCheck.id = req.params.id

        try {
            existsOrError(avaliationCheck.check, 'Nome do parâmetro não informado')
            existsOrError(avaliationCheck.avaliationChecks, 'Avaliação não informada')
            existsOrError(avaliationCheck.groupChecksId, 'Nome do grupo de checagem não informada')
               
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(avaliationCheck.id) {
            app.db('avaliationChecks')
                .update(avaliationCheck)
                .where({ id: avaliationCheck.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('avaliationChecks')
                .insert(avaliationCheck)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('avaliationChecks')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Visita não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('avaliationChecks').count('id').first()
        const count = parseInt(result.count)

        app.db('avaliationChecks')
            .select('id', 'visitOrder', 'modalidade')
            .limit(limit).offset(page * limit - limit)
            .then(avaliationChecks => res.json({ data: avaliationChecks, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('avaliationChecks')
            .where({ id: req.params.id })
            .first()
            .then(avaliationCheck => {
                avaliationCheck.NdeAlunos = avaliationCheck.NdeAlunos.toString()
                return res.json(avaliationCheck)
            })
            .catch(err => res.status(500).send(err))
    }


    const getByGroupCheck = async (req, res) => {
        const groupCheckId = req.params.id
        const page = req.query.page || 1
        const groupChecks = await app.db.raw(queries.groupCheckAvaliations, groupCheckId)
        const ids = groupChecks.rows.map(c => c.id)

        app.db({a: 'avaliationChecks', g: 'groupChecks'})
            .select('a.id', 'a.check','a.avaliationChecks', { GrupoDeChecagem: 'a.groupChecksId' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['g.id', "a.groupChecksId"])
            .whereIn('a.id', ids)
            .orderBy('a.id')
            .then(avaliationChecks => res.json(avaliationChecks))
            .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getById, getByGroupCheck }
}