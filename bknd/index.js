const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors(
    {
        origin:["","http://localhost:3000"],
        credentials:true
    }
));
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log("Connected")});

// Define User schema
const userSchema = new mongoose.Schema({
    id:Number , 
  first_name: String,
  last_name : String,
  email: String,
  gender:String ,
  avatar:String , 
  domain:String , 
  available:Boolean ,
});

const User = mongoose.model('User', userSchema);

const teamSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Team = mongoose.model('Team', teamSchema);


// Middleware
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("HTLLO");
})
// Routes
app.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const users = await User.find().sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/filtered-users', async (req, res) => {
  try {
    const { domain, availability, page, pageSize } = req.query;

    if (!domain || !availability || !page || !pageSize) {
      return res.status(400).json({ error: 'Missing required parameters in the query' });
    }

    const users = await User.find({ domain, available:availability })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json(users);
  } catch (error) {
    console.error('Error fetching filtered users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/teams', async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (Previous code)

// Route to get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find().populate('users', 'first_name email'); // Populate users with name and email only
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
