const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// use uploads folder to save images
app.use('/uploads', express.static('uploads'));


// TODO: modify this sample later
// sample tests for backend operations
// Instruction Via README.md
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profiles');
const platformRouter = require('./routes/api/platforms');
const quizRouter = require('./routes/api/quizzes');
// TODO: temporary
const tmpQuizRouter = require('./routes/api/tmpQuizzes');

const achievementRouter = require('./routes/api/achievement');
const adminRouter = require('./routes/api/admin');
// use routes
app.use('/api/auth', authRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/platforms', platformRouter);
app.use('/api/quizzes', quizRouter);
// TODO: temporary 
app.use('/api/tmpQuizzes', tmpQuizRouter);
app.use('/api/achievement', achievementRouter);
app.use('/api/admin', adminRouter);
// end of test


const imageRouter = require('./routes/api/image'); // location of router
app.use('/api/img', imageRouter);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));