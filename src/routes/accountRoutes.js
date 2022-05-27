const express = require('express');
const { validateToken } = require('../middleware');

const accountRoute = express.Router();
const controller = require('../controllers/accountController');

accountRoute.post('/accounts', validateToken, controller.postAccount);
accountRoute.get('/accounts', validateToken, controller.showAllConnectedUserGroups);

module.exports = { accountRoute };
