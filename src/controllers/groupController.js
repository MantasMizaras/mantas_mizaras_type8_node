const { getGroups, createNewGroup, findGroupByName } = require('../model/groupModel');

const showGroups = async (req, res) => {
  try {
    const data = await getGroups();
    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postGroup = async (req, res) => {
  const receivedName = req.body.name;

  const foundGroup = await findGroupByName(receivedName);
  if (foundGroup) {
    res.status(400).json(`Group '${receivedName}' already exists`);
    return;
  }

  try {
    // eslint-disable-next-line no-restricted-globals
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
