const alumnosRoutes = require('./alumnosRoutes');

function routerApi(app) {
    app.use('/alumnos', alumnosRoutes);
}

module.exports = routerApi;