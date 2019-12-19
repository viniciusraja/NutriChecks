//const admin = require('./admin')

module.exports = app => {
/*      app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
   */
    app.route('/users')
        //.all(app.config.passport.authenticate()
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        //.all(app.config.passport.authenticate()
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/cities')
        //.all(app.config.passport.authenticate()
        .get(app.api.city.get)
        .post(app.api.city.save)

    // Cuidado com ordem! Tem que vir antes de /cities/:id

    app.route('/cities/:id')
        //.all(app.config.passport.authenticate()
        .get(app.api.city.getById)
        .put(app.api.city.save)
        .delete(app.api.city.remove)

    app.route('/schools')
        //.all(app.config.passport.authenticate()
        .get(app.api.school.get)
        .post(app.api.school.save)

    app.route('/schools/:id')
        //.all(app.config.passport.authenticate()
        .get(app.api.school.getById)
        .put(app.api.school.save)
        .delete(app.api.school.remove)

    app.route('/city/:id/schools')
        //.all(app.config.passport.authenticate()
        .get(app.api.school.getByCity)
        
        app.route('/visits')
            //.all(app.config.passport.authenticate()
            .get(app.api.visit.get)
            .post(app.api.visit.save)
    
        app.route('/visits/:id')
            //.all(app.config.passport.authenticate()
            .get(app.api.visit.getById)
            .put(app.api.visit.save)
            .delete(app.api.visit.remove)
    
        app.route('/school/:id/visits')
            //.all(app.config.passport.authenticate()
            .get(app.api.visit.getBySchool)
            
            app.route('/groupChecks')
                //.all(app.config.passport.authenticate()
                .get(app.api.groupCheck.get)
                .post(app.api.groupCheck.save)
        
            app.route('/groupChecks/:id')
                //.all(app.config.passport.authenticate()
                .get(app.api.groupCheck.getById)
                .put(app.api.groupCheck.save)
                .delete(app.api.groupCheck.remove)
        

            app.route('/visit/:id/groupChecks')
                //.all(app.config.passport.authenticate()
                .get(app.api.groupCheck.getByVisit)
                
                app.route('/avaliationChecks')
                    //.all(app.config.passport.authenticate()
                    .get(app.api.avaliationCheck.get)
                    .post(app.api.avaliationCheck.save)
            
                app.route('/avaliationChecks/:id')
                    //.all(app.config.passport.authenticate()
                    .get(app.api.avaliationCheck.getById)
                    .put(app.api.avaliationCheck.save)
                    .delete(app.api.avaliationCheck.remove)
            
                    app.route('/groupCheck/:id/avaliationChecks')
                        //.all(app.config.passport.authenticate()
                        .get(app.api.avaliationCheck.getByGroupCheck)


        app.route('/stats')
        //.all(app.config.passport.authenticate()
        .get(app.api.stat.get)
}