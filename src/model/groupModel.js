const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function getGroups() {
  const sql = 'SELECT * FROM groups';
  return executeDb(sql);
}

function createNewGroup(name) {
  const sql = 'INSERT INTO groups(name) VALUES (?)';
  return executeDb(sql, [name]);
}

function findGroupByName(name) {
  const sql = 'SELECT * FROM groups WHERE name = ?';
  return executeDb(sql, [name]);
}

module.exports = { getGroups, createNewGroup, findGroupByName };
