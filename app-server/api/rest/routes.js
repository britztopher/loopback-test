

module.exports = function (app) {

    //home routes
    var routes = require('../../controllers/index')

    app.get('/', routes.layout);
    app.get('/init/login', routes.initpage);
    app.get('/partials/:name', routes.partials);


}


