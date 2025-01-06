const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Authenticate the user (validate email and password)
//   const user = await usersModel.findUserByEmail(email);
//   if (!user || user.password !== password) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   // Generate a token
//   const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// });

router.post('/login', authController)

module.exports = router;