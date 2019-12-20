module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        cities: Number,
        schools: Number,
        groupChecks: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    cities: 0,
                    schools: 0,
                    groupChecks: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}