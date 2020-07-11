/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const cors = require('cors');
const AppConfig = require('./config/app-config');
const Routes = require('./routes');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded());
        this.http = http.Server(this.app);
    }

    appConfig() {
        new AppConfig(this.app).includeConfig();
    }

    /* Including app Routes starts */
    includeRoutes() {
            new Routes(this.app).routesConfig();
        }
        /* Including app Routes ends */

    startTheServer() {
        this.appConfig();
        this.includeRoutes();

        const port = process.env.NODE_SERVER_PORT || 4041;
        const host = process.env.NODE_SERVER_HOST || '0.0.0.0';

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }
}

module.exports = new Server();
