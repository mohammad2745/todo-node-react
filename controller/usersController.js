const usersModel = require('../models/usersModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllUsers,
};