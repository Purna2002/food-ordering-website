const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Order = require('../models/Orders')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const bcrypt=require("bcryptjs");
const jwtSecret = "mynamisbonthupurnanandiamafullstackdeveloper"


router.post("/CreateUser", [
  body('email').isEmail().withMessage('Invalid email'),
  body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

const salt = await bcrypt.genSalt(10);
let secPassword = await bcrypt.hash(req.body.password,salt)

  try {
    const { name, password, email, location } = req.body;

    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location:req.body.location
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: 'Server error' });
  }
});

router.post("/loginuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
const pwdCompare= await bcrypt.compare(req.body.password,userData.password)

    if (!pwdCompare) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const data={
      user:{
        id:userData.id
      }
    }
     
         const authToken = jwt.sign(data,jwtSecret)

    return res.json({ success: true,authToken:authToken});
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: 'Server error' });
  }
});


module.exports = router;
