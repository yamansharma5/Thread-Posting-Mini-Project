const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const postModel = require('./models/posts');
const app = express();
const multerConfig = require('./configs/multerconfig');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve static files from the 'public' directory, allowing access to uploaded images and other assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/registered', (req, res) => {
    res.render('registered');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/logout', (req, res) => {
    res.clearCookie('token', "");
    res.redirect('/login');
})

app.get('/profile', isloggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts')// Find the user in the database using the email from the JWT token and populate the 'posts' field with the corresponding post documents
    res.render('profile', { user});  
})

app.get('/profile/uploadimage', isloggedin, (req, res) => {
    res.render('uploadimage');
})

app.post('/profile/uploadimage', isloggedin, multerConfig.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        let user = await userModel.findOne({ email: req.user.email });
        user.profilePicture = req.file.filename;
        await user.save();
        res.redirect('/profile');
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).send('Error uploading image: ' + err.message);
    }
})

app.post('/post', isloggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    let { title, image, content } = req.body;
    
    let post = await postModel.create({
        user: user._id,
        title,
        image,
        content,
        likes: []
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');  
})

app.post('/register', async (req, res) => {
    let{ username, name, age, email, password } = req.body;// Destructure the request body to get user details
    
    let user = await User.findOne({ email });// Check if a user with the provided email already exists in the database
    if (user) {
        return res.status(400).send('User already exists');
    }

    bcrypt.genSalt(10, (err, salt) => {  // Generate a salt for hashing the password
        bcrypt.hash(password, salt, async (err, hash) => {      // Hash the password using the generated salt
            
             const newUser = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            })

            let token = jwt.sign({ email: email, userid: newUser._id }, 'shhhhh')  // Generate a JWT token containing the user's email and ID, signed with a secret key
            res.cookie('token', token);
            res.redirect('/registered')
        })
        
    })
})

app.post('/login', async (req, res) => {
    let{ email, password } = req.body;// Destructure the request body to get user details
    
    let user = await User.findOne({ email });// Check if a user with the provided email already exists in the database
    if (!user) {
        return res.status(400).send('User does not exist');
    }
    
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
                let token = jwt.sign({ email: email, userid: user._id }, 'shhhhh')  // Generate a JWT token containing the user's email and ID, signed with a secret key
                res.cookie('token', token);
            res.status(200).redirect('/profile');
        }
        else {res.redirect('/login');
        }
    }) // Compare the provided password with the hashed password stored in the database
})

// Middleware function to check if the user is logged in by verifying the JWT token stored in cookies
function isloggedin(req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        return res.send('Please Login');
    } else {
        try {
            let data = jwt.verify(token, 'shhhhh');
            req.user = data;
            next();
        } catch (err) {
            res.send('Invalid token, please login again');
        }
    }
}  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});