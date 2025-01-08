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
    return rows[0]; 
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const { name, email, password, profilePic } = user;
    
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password, image, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, name, email, image, created_at`,
      [name, email, password, profilePic]
    );
    return rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

module.exports = {
  getAllUsers, findUserByEmail, createUser
};