const trimRequest = require('trim-request');

class Routes {
    constructor(app) {
        this.app = app;
    }

    /* creating app Routes starts */
    appRoutes() {
        this.app.use('/auth', trimRequest.all, require("./auth"));
        this.app.use('/public',trimRequest.all, require("./public"));
    }

    routesConfig() {
        this.appRoutes();
    }
}

module.exports = Routes;