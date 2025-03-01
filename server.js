require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConect');
const taskRoutes = require('./routes/api/tasks');
const signupRoute = require('./routes/Signup');
const loginRoute = require('./routes/login');
const verifyJWT = require('./middleware/verifyJWT');
const handleLogout = require('./routes/logout');
const cors = require('cors');

connectDB();

app.use(cors({ origin: "https://your-frontend-domain.com", credentials: true }));

// cookie parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/logout', handleLogout);

app.use(verifyJWT);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));