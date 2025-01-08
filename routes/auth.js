const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controller/authController');

// Configure multer for file uploads with size limit and file type validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and JPG image files are allowed.'));
    }
    cb(null, true);
  },
});

router.post('/login', authController.login);
router.post('/signup', upload.single('profilePic'), authController.signup);

module.exports = router;