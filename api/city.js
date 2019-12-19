module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const city = {
            id: req.body.id,
            name: req.body.name  
        }
        
        if(req.params.id) city.id = req.params.id

        try {
            existsOrError(city.name, 'Nome não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(city.id) {
            app.db('cities')
                .update(city)
                .where({ id: city.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cities')
                .insert(city)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')

           

            const articles = await app.db('articles')
                .where({ cityId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('cities')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('cities')
            .select('id', 'name')
            .then(cities => res.json(cities))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cities')
            .where({ id: req.params.id })
            .first()
            .then(city => res.json(city))
            .catch(err => res.status(500).send(err))
    }

 
    return { save, remove, get, getById }
}