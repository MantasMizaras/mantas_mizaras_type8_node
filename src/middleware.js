/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

// middleware helper
function showBody(req, res, next) {
  // console.log(req.method);
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUserRegister(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().trim().min(5).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error.details);
  }
}
async function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error.details);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  // nera token
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'No valid token',
    });
    return;
  }

  // token yra
  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayload;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Invalid token',
    });
  }
}

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateToken,
  showBody,
};
