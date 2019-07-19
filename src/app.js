const express = require('express');
const consign = require('consign');
require("express-group-routes");
require('dotenv').config();

const app = express();

consign({cwd: 'src'})
    .include('libs/database.js')
    .then('libs/utils.js')
    .then('services')
    .then('libs/validator.js')
    .then('models')
    .then('repositories')
    .then('controllers')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/server.js')
    .into(app);




