const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { name } = require('ejs');

mongoose.connect('mongodb://localhost:27017/mysocialmedia' )

const postSchema = new mongoose.Schema({
// Define the fields for the Post model
  user :{
    type:mongoose.Schema.Types.ObjectId,// Reference to the User model
    ref:'User'
  },
  title: String,
  image: String,
  date:{
    type:Date, 
    default:Date.now
  },
  content: String,
    likes: [// Array of user IDs who liked the post
      {type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
})
module.exports = mongoose.model('Post', postSchema)