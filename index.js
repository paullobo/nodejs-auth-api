const DotEnv = require('dotenv');
const Server = require('./app');

DotEnv.config();
Server.startTheServer();
