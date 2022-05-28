const { getGroups, createNewGroup } = require('../model/groupModel');

const showGroups = async (req, res) => {
  try {
    const data = await getGroups();
    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await createNewGroup(name);
    if (data.affectedRows === 1) {
      res.status(201).json('New group created');
      return;
    }
    res.status(400).json('New group was not created');
  } catch (error) {
    res.status(500).json('Something went wrong');
  }
};

module.exports = { showGroups, postGroup };
