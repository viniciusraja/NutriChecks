const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const school = { ...req.body }
        if(req.params.id) school.id = req.params.id

        try {
            existsOrError(school.name, 'Nome não informado')
            existsOrError(school.modalidade, 'Modalidade não informada')
            existsOrError(school.cityId, 'Cidade não informada')
            existsOrError(school.NdeAlunos, 'Número de Alunos não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(school.id) {
            app.db('schools')
                .update(school)
                .where({ id: school.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('schools')
                .insert(school)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('schools')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
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

        const result = await app.db('schools').count('id').first()
        const count = parseInt(result.count)

        app.db('schools')
            .select('id', 'name', 'modalidade')
            .limit(limit).offset(page * limit - limit)
            .then(schools => res.json({ data: schools, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('schools')
            .where({ id: req.params.id })
            .first()
            .then(school => {
                school.NdeAlunos = school.NdeAlunos.toString()
                return res.json(school)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCity = async (req, res) => {
        const cityId = req.params.id
        const page = req.query.page || 1
        const cities = await app.db.raw(queries.cityWithSchools, cityId)
        const ids = cities.rows.map(c => c.id)

        app.db({s: 'schools', c: 'cities'})
            .select('s.id','s.name','s.modalidade','s.NdeAlunos', { Cidade: 'c.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['c.id', 's.cityId'])
            .whereIn('s.id', ids)
            .orderBy('s.id')
            .then(schools => res.json(schools))
            .catch(err => res.status(500).send(err))
    }/* 
    const getBySchool = async (req, res) => {
        const schoolId = req.params.id
        const page = req.query.page || 1
        const schools = await app.db.raw(queries.schoolChecklist, schoolId)
        const ids = schools.rows.map(c => c.id)
        
        app.db({g: 'groupChecks', s: 'schools'})
            .select('g.id', 'g.groupName', { escola: 's.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['s.id', 'g.schoolId'])
            .whereIn('g.id', ids)

            .orderBy('g.id')
            .then(groupChecks => res.json(groupChecks))
            .catch(err => res.status(500).send(err))
    }
 */
    return { save, remove, get, getById, getByCity }
}