/* eslint-disable camelcase */
const express = require('express');
const { validateToken } = require('../middleware');

const billRoute = express.Router();
const controller = require('../controllers/billController');

billRoute.get('/bills/:group_id', validateToken, controller.getAccurateGroupBills);
billRoute.post('/bills', validateToken, controller.postBillToAccurateGroup);

module.exports = billRoute;
