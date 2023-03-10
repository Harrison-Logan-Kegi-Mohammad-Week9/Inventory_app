const express = require("express");

const {check, validationResult} = require("express-validator");
const router = express.Router();
const { User } = require("../models/index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//GET all users
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

//GET specific User
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findAll({
      where: {email: req.params.email}
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


 //Create new user
 router.post("/signup", [check("username").not().isEmpty().trim(),check("email").not().isEmpty().trim(),check("password").not().isEmpty().trim()],async (req, res) => {//Need to add in validation in (see items endpoint)
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors})
  }else{
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
})

//Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

//Logout user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

module.exports = router
