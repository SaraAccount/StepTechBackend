console.log("hello");
const mongoose = require('mongoose');
const Login = require("../models/login");
const login = require('../models/login');
const jwt=require('jsonwebtoken');

function generateJWTToken(user) {
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET);
  return token;
}

let sign_in = async (req, res) => {
    try {
        const newUser = new Login(req.body);
        console.log(newUser);
        await newUser.save();
          res.status(200).send({
            mess: 'user save success',
            user: newUser
    })
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

let getAllUser = async (req, res) => {
   
    try {
  
      const users=await Login.find()
      res.status(200).json(users)
  
    } catch (err) {
      
      console.log(err)
      res.status(400).send(err)
    }
  }


let sign_up = async (req, res) => {
  const { name, password } = req.body;

  try {
      const user = await Login.findOne({ name, password });

      if (!user) {
          return res.status(404).send("User not found");
      }

      const token = generateJWTToken(user);

      return res.status(200).json({ login: user, token: token });
  } catch (error) {
      console.error('Error in sign up:', error);
      return res.status(500).send("Internal server error");
  }
}




let checkUserExists = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await login.findOne({ name });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



let getNameSemMail = async (req, res) => {
  try {
      const users = await Login.find({}, 'name seminar email');

      res.status(200).json(users);
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
  }
};





const delete_id = async (req, res) => {
  const { name, password } = req.body;

  try {
      const adminPassword = process.env.CODE_MANAGER;

      if (password === adminPassword) {
          const deleteLogin = await Login.findOneAndDelete({ name });
          if (!deleteLogin) {
              return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json({ message: "User deleted successfully" });
      }

      const user = await Login.findOne({ name, password });
      if (!user) {
          return res.status(404).json({ message: "Incorrect password or user not found" });
      }

      await Login.findOneAndDelete({ name, password });
      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};




let update_data = async (req, res) => {
  const { name, password, seminar, email, enterPassword } = req.body;

  try {
      const adminPassword = process.env.CODE_MANAGER;

      const user = await Login.findOne({name});

      if (!user || (enterPassword !== user.password)) {
          if(enterPassword !== adminPassword)
          return res.status(404).json({ message: "User not found or incorrect password" });
      }

      user.email = email || user.email;
      user.password = password || user.password;
      user.seminar = seminar || user.seminar;
      await user.save();

      return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
      console.error('Error in server: update', error);
      return res.status(500).json({ message: 'Error in the server. Try later' });
  }
};





module.exports = {
    sign_in,
    sign_up,
    delete_id,
    update_data,
    getAllUser,
    checkUserExists,
    getNameSemMail
};

