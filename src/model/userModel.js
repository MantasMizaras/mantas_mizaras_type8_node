const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// eslint-disable-next-line camelcase
async function addUserToDb(full_name, email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO users(full_name, email, password)
    VALUES (?, ?, ?)
    `;
    // eslint-disable-next-line camelcase
    const [result] = await conn.execute(sql, [full_name, email, password]);
    return result;
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

async function findUserByEmail(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM users WHERE email = ? 
    `;
    const [result] = await conn.execute(sql, [email]);
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
  } finally {
    conn?.end();
  }
}

module.exports = {
  addUserToDb,
  findUserByEmail,
};
