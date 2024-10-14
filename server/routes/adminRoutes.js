const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      if (email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

  
      console.log('Admin authenticated successfully.');
  
      const payload = {
        role: 'admin',
        email: process.env.ADMIN_EMAIL,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });
  
      res.status(200).json({ token, user: { email: process.env.ADMIN_EMAIL } });
    } catch (error) {
      console.error('Admin Login Error:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });

module.exports = router