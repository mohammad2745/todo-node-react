const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await usersModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profilePic = req.file ? (req.file.destination + req.file.filename) : null;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await usersModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersModel.createUser({ name, email, password: hashedPassword, profilePic });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created successfully.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, profilePic: newUser.image },
      token,
    });
  } catch (error) {
    console.error('Error during signup:', error);

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds the 1MB limit.' });
    }

    if (error.message.includes('Only JPEG, PNG, and JPG')) {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { login, signup };
