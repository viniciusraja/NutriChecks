const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const visit = { ...req.body }
        if(req.params.id) visit.id = req.params.id

        try {
            existsOrError(visit.visitOrder, 'Ordem da visita não informada') 
            existsOrError(visit.schoolId, 'Escola não informada')
         
           
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(visit.id) {
            app.db('visits')
                .update(visit)
                .where({ id: visit.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('visits')
                .insert(visit)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('visits')
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

        const result = await app.db('visits').count('id').first()
        const count = parseInt(result.count)

        app.db('visits')
            .select('id', 'visitOrder', 'modalidade')
            .limit(limit).offset(page * limit - limit)
            .then(visits => res.json({ data: visits, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('visits')
            .where({ id: req.params.id })
            .first()
            .then(visit => {
                visit.NdeAlunos = visit.NdeAlunos.toString()
                return res.json(visit)
            })
            .catch(err => res.status(500).send(err))
    }


    const getBySchool = async (req, res) => {
        const schoolId = req.params.id
        const page = req.query.page || 1
        const schools = await app.db.raw(queries.schoolVisits, schoolId)
        const ids = schools.rows.map(c => c.id)
        
        app.db({v: 'visits', s: 'schools'})
            .select('v.id', 'v.visitOrder','v.date', { escola: 's.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['s.id', 'v.schoolId'])
            .whereIn('v.id', ids)
            .orderBy('v.id')
            .then(visits => res.json(visits))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getBySchool }
}