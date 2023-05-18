const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const passport = require('passport');
const session = require('express-session');


dotenv.config({ path: './config/config.env' });

app.use(express.json());

const initializingPassport = require('./config/passport');
initializingPassport(passport);

let cookieOptions;

if (process.env.ENV === 'dev') {
    const obj = { secure: false }
    cookieOptions = obj;
} else {
    const obj = { secure: true, sameSite: 'none' }
    cookieOptions = obj;
}
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions,
}))
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    credentials: true,
    origin: process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://chat-app-frontend-silk.vercel.app'
}
app.use(cors(corsOptions));

const connectDB = require('./config/db');
connectDB();

//Load route files
const auth = require('./routes/auth');

//Mount route files
app.use('/api/auth', auth);

//Handling error controller function
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue.bold));