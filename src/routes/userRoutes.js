const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { findUserByEmail, addUserToDb } = require('../model/userModel');
const { validateUserRegister, validateUserLogin } = require('../middleware');

const userRoute = express.Router();

userRoute.post('/register', validateUserRegister, async (req, res) => {
  try {
    const gautasEmail = req.body.email;
    // eslint-disable-next-line camelcase
    const { full_name, password } = req.body;
    const plainTextPassword = password;

    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

    // tikrinam ar yra toks email jau uzregintas
    const foundUser = await findUserByEmail(gautasEmail);

    // jei yra tokio email
    if (foundUser) {
      res.status(400).json(`Vartotojas su ${gautasEmail} el.pastu jau egzistuoja`);
      return;
    }

    const newUser = {
      // eslint-disable-next-line camelcase
      full_name,
      email: gautasEmail,
      password: hashedPassword,
    };

    // kviesti modelio funkcija kuri sukuria varototoja
    const insertResult = await addUserToDb(newUser.full_name, newUser.email, newUser.password);

    if (insertResult === false) {
      res.status(500).json('Something wrong');
      return;
    }
    res.status(201).json('Vartotojas sukurtas');
  } catch (error) {
    console.log(error);
    res.status(500).json('Nepavyko sukurti vartotojo');
  }
});

userRoute.post('/login', validateUserLogin, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasPassword = req.body.password;

  // tikrinam ar yra toks email jau uzregintas
  const foundUser = await findUserByEmail(gautasEmail);

  // jei nera tokio email
  if (!foundUser) {
    res.status(400).json(`Vartotojas su ${gautasEmail} el.pastu neegzistuoja`);
    return;
  }
  // jei yra toks email, tikrinam ar sutampa su slaptazodziu
  if (!bcrypt.compareSync(gautasPassword, foundUser.password)) {
    res.status(400).json('Ivestas blogas slaptazodis');
    return;
  }
  // generuojam jwt token
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
  res.json({ success: true, token });
});

module.exports = userRoute;
