const express = require('express');
const { validateToken } = require('../middleware');
const { assignGroup, getAllUserGroups } = require('../model/accountModel');

const accountRoute = express.Router();

accountRoute.post('/accounts', validateToken, async (req, res) => {
  const { group_id } = req.body;
  const idfromToken = req.userId;
  try {
    const data = await assignGroup(group_id, idfromToken);
    if (data.affectedRows === 1) {
      res.status(201).json('Account sekmingai pridetas');
      return;
    }
    res.status(400).json('Naujas account nesukurtas');
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
});

accountRoute.get('/accounts', validateToken, async (req, res) => {
  const idfromToken = req.userId;
  try {
    const accountGroupArr = await getAllUserGroups(idfromToken);
    res.json(accountGroupArr);
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
});

module.exports = { accountRoute };
