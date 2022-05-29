const { assignGroup, getAllUserGroups, findGroupByUserId } = require('../model/accountModel');

const postAccount = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { group_id } = req.body;
  const idfromToken = req.userId;

  const foundAccount = await findGroupByUserId(idfromToken);
  if (foundAccount) {
    res.status(400).json('You are already member of this account from before');
    return;
  }

  try {
    const data = await assignGroup(group_id, idfromToken);
    if (data.affectedRows === 1) {
      res.status(201).json('New account created');
      return;
    }
    res.status(400).json('New account was not created');
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
};

const showAllConnectedUserGroups = async (req, res) => {
  const idfromToken = req.userId;
  try {
    const data = await getAllUserGroups(idfromToken);
    res.json(data);
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
};

module.exports = { postAccount, showAllConnectedUserGroups };
