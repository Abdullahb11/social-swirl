const express = require('express');
const app = express();

const mongoose=require('mongoose')

//connection 
mongoose.connect('mongodb://127.0.0.1:27017/userdb').then(()=>console.log("mongo connected")).catch(err=>console.log("mongo error",err))


//schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  });
  
  // Create the User model
  const User = mongoose.model('User', userSchema);
  
  app.use(express.json());
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Get user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email
      });
      await user.save();
      res.status(201).send(user);
      console.log(user)
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  // Update user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, email: req.body.email },
        { new: true, runValidators: true }
      );
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  // Delete user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
