const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const citiesCount = await app.db('cities').count('id').first()
        const schoolsCount = await app.db('schools').count('id').first()
        const GChecksCount = await app.db('groupChecks').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            cities: citiesCount.count,
            schools: schoolsCount.count,
            groupChecks: GChecksCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCities = !lastStat || stat.cities !== lastStat.cities
        const changeSchools = !lastStat || stat.schools !== lastStat.schools
        const changeGChecks = !lastStat || stat.groupChecks !== lastStat.groupChecks

        if(changeUsers || changeCities || changeSchools || changeGChecks) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}