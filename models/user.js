const mongoose = require('mongoose');
const { name } = require('ejs');

mongoose.connect('mongodb://localhost:27017/mysocialmedia' )

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,// what this does is it creates a reference to the Post model, 
    // allowing us to associate multiple posts with a single user. Each entry in the posts array will store the ObjectId of a post document from the Post collection, enabling us to easily retrieve all posts associated with a user when needed.
    ref: 'Post'
  }],
  profilePicture: {
    type: String,
    default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'
  }
})

module.exports = mongoose.model('User', userSchema)