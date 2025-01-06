const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Fetch user by email from the database
    const user = await usersModel.findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET,            // Secret key
      { expiresIn: '1h' }                // Token expiration
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = login;
