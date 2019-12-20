const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const groupCheck = { ...req.body }
        if(req.params.id) groupCheck.id = req.params.id

        try {
            existsOrError(groupCheck.groupName, 'Nome do grupo não informada')
                   
            existsOrError(groupCheck.visitId, 'Visita não informada')
         
           
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(groupCheck.id) {
            app.db('groupChecks')
                .update(groupCheck)
                .where({ id: groupCheck.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('groupChecks')
                .insert(groupCheck)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('groupChecks')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Grupo de checagem não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 5 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('groupChecks').count('id').first()
        const count = parseInt(result.count)

        app.db('groupChecks')
            
            .limit(limit).offset(page * limit - limit)
            .then(groupChecks => res.json({ data: groupChecks, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('groupChecks')
            .where({ id: req.params.id })
            .first()
            .then(groupCheck =>res.json(groupCheck.groupName))
            .catch(err => res.status(500).send(err))
    }


    
    const getByVisit = async (req, res) => {
        const visitId = req.params.id
        const page = req.query.page || 1
        const visits = await app.db.raw(queries.visitChecklist, visitId)
        const ids = visits.rows.map(c => c.id)
        
        app.db({g: 'groupChecks', v: 'visits'})
            .select('g.id', 'g.groupName', { dataDaVisita: 'date', Escola: 'v.schoolId' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['v.id', 'g.visitId'])
            .whereIn('g.id', ids)

            .orderBy('g.id')
            .then(groupChecks => res.json(groupChecks))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByVisit}
}