const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { findUserByEmail, addUserToDb } = require('../model/userModel');

const userRegistration = async (req, res) => {
  try {
    const gautasEmail = req.body.email;
    // eslint-disable-next-line camelcase
    const { full_name, password } = req.body;
    const plainTextPassword = password;
    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

    const foundUser = await findUserByEmail(gautasEmail);
    if (foundUser) {
      res.status(400).json(`User with ${gautasEmail} e-mail already exists`);
      return;
    }

    const newUser = {
      // eslint-disable-next-line camelcase
      full_name,
      email: gautasEmail,
      password: hashedPassword,
    };

    const insertResult = await addUserToDb(newUser.full_name, newUser.email, newUser.password);
    if (insertResult === false) {
      res.status(500).json('Something wrong');
      return;
    }
    res.status(201).json('User created');
  } catch (error) {
    console.log(error);
    res.status(500).json('User not created');
  }
};

const userLogin = async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasPassword = req.body.password;

  const foundUser = await findUserByEmail(gautasEmail);
  if (!foundUser) {
    res.status(400).json(`User with ${gautasEmail} e-mail not exists`);
    return;
  }
  if (!bcrypt.compareSync(gautasPassword, foundUser.password)) {
    res.status(400).json('Entered wrong password');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
  res.json({ success: true, token });
};

module.exports = { userRegistration, userLogin };
