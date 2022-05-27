const express = require('express');
const { validateToken } = require('../middleware');
const { getBillsByGroupId, addBillToSpecificGroup } = require('../model/billModel');

const billRoute = express.Router();

billRoute.get('/bills/:group_id', validateToken, async (req, res) => {
  const { group_id } = req.params;
  console.log(group_id);
  try {
    const billByGroupIdArr = await getBillsByGroupId(group_id);
    res.json(billByGroupIdArr);
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
});

billRoute.post('/bills', validateToken, async (req, res) => {
  const { group_id, amount, description } = req.body;
  try {
    const data = await addBillToSpecificGroup(group_id, amount, description);
    if (data.affectedRows === 1) {
      res.status(201).json('Bill sekmingai pridetas');
      return;
    }
    res.status(400).json('Naujas bill nesukurtas');
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
});

module.exports = billRoute;
