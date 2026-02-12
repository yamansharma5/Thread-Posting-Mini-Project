# Thread Posting Mini Project

A full-stack social media web application built with **Node.js, Express.js, and MongoDB**. Users can create profiles, share posts, upload profile pictures, and interact with other users' content.

## 🎯 Features

- ✅ **User Authentication** - Secure registration and login with JWT tokens
- ✅ **Password Security** - Passwords hashed with bcrypt
- ✅ **Profile Management** - Upload and display profile pictures
- ✅ **Post Creation** - Share posts with title, content, and images
- ✅ **Like/Unlike** - Interact with posts by liking them
- ✅ **Session Management** - Secure cookie-based sessions with JWT verification
- ✅ **File Upload** - Profile image storage with Multer
- ✅ **Responsive UI** - Built with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware

### Frontend
- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5** - Markup

## 📁 Project Structure

```
Backend Mini Project/
├── app.js                 # Main application file
├── package.json           # Project dependencies
├── configs/
│   └── multerconfig.js   # Multer storage configuration
├── models/
│   ├── user.js           # User schema
│   └── posts.js          # Post schema
├── views/
│   ├── index.ejs         # Home page
│   ├── login.ejs         # Login page
│   ├── registered.ejs    # Registration success page
│   ├── profile.ejs       # User profile page
│   └── uploadimage.ejs   # Profile image upload page
├── uploads/
│   └── images/           # Stored profile images
└── public/               # Static files
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yamansharma5/Thread-Posting-Mini-Project.git
   cd "Backend Mini Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB connection**
   - Update the MongoDB connection string in `models/user.js` and `models/posts.js`
   - Or use MongoDB Atlas cloud database

4. **Create uploads directory**
   ```bash
   mkdir -p uploads/images
   mkdir -p public/uploads/images
   ```

5. **Start the server**
   ```bash
   npm run dev        # with nodemon
   # or
   node app.js        # without nodemon
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:3000`

## 📖 How to Use

### 1. Register
- Click on the registration link
- Fill in your details (username, name, age, email, password)
- Account is created and you're automatically logged in

### 2. Upload Profile Picture
- Click "Change Picture" button on profile page
- Select an image file from your device
- Picture is uploaded and displayed on your profile

### 3. Create a Post
- Go to your profile page
- Fill in post details (title, image URL, content)
- Click "Create Post" to share

### 4. Interact with Posts
- Click the "Like" button to like/unlike posts
- Like count updates in real-time

### 5. Logout
- Click the "Logout" button to end your session

## 🔐 Security Features

- **Password Hashing** - All passwords are hashed using bcrypt with salt rounds
- **JWT Authentication** - Secure token-based authentication
- **Cookie Management** - Secure session handling with HTTP cookies
- **Protected Routes** - Middleware ensures only logged-in users can access protected pages

## 📦 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| GET | `/login` | Login page |
| GET | `/registered` | Registration success page |
| POST | `/register` | Create new user |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |
| GET | `/profile` | User profile (protected) |
| GET | `/profile/uploadimage` | Upload image page (protected) |
| POST | `/profile/uploadimage` | Upload profile image (protected) |
| POST | `/post` | Create new post (protected) |
| POST | `/like/:id` | Like/unlike post (protected) |

## 🔧 Configuration

### Environment Variables
Create a `.env` file (optional) for:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### Multer Configuration
Image uploads are stored in `uploads/images/` directory with random filenames to prevent conflicts.

## 📝 Database Schema

### User Schema
```javascript
{
  username: String,
  name: String,
  age: Number,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  posts: [ObjectId]
}
```

### Post Schema
```javascript
{
  user: ObjectId,
  title: String,
  content: String,
  image: String,
  likes: [ObjectId]
}
```

## 🐛 Troubleshooting

**Issue**: "Cannot POST /uploadimage"
- **Solution**: Make sure the form action is `/profile/uploadimage`

**Issue**: Profile picture not showing
- **Solution**: Check that the `uploads/images/` directory exists and static middleware is configured

**Issue**: MongoDB connection error
- **Solution**: Verify MongoDB is running and connection string is correct

**Issue**: "Please Login" error on protected routes
- **Solution**: Make sure you're logged in and JWT token is valid

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Yaman Sharma**
- GitHub: [@yamansharma5](https://github.com/yamansharma5)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
