// usersModel.js

const pool = require('../db'); 

const getAllUsers = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(`SELECT * FROM users WHERE email = ${email} ${rows}`);
    return rows[0]; // Return the first user if found
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};


module.exports = {
  getAllUsers, findUserByEmail
};