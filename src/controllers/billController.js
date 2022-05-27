/* eslint-disable camelcase */
const { showBillsByGroupId, addBillToSpecificGroup } = require('../model/billModel');

const getAccurateGroupBills = async (req, res) => {
  const { group_id } = req.params;
  try {
    const billByGroupIdArr = await showBillsByGroupId(group_id);
    res.json(billByGroupIdArr);
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
};

const postBillToAccurateGroup = async (req, res) => {
  const { group_id, amount, description } = req.body;
  try {
    const data = await addBillToSpecificGroup(group_id, amount, description);
    if (data.affectedRows === 1) {
      res.status(201).json('Bill added');
      return;
    }
    res.status(400).json('New bill was not created');
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
};

module.exports = { getAccurateGroupBills, postBillToAccurateGroup };
