const express = require('express');
const { validateToken } = require('../middleware');

const groupRoute = express.Router();
const controller = require('../controllers/groupController');

groupRoute.get('/groups', validateToken, controller.showGroups);
groupRoute.post('/groups', validateToken, controller.postGroup);

module.exports = groupRoute;
