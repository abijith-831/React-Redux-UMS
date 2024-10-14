const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.post('/login',async(req,res)=>{
    try {
        console.log('asda',typeof(null));
        const {email , password} = req.body
        console.log(req.body);
        console.log('casmff');
    } catch (error) {
        
    }
})


module.exports = router