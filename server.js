const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

const cors = require('cors');

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

const corsOptions = {
    credentials: true,
    origin: process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://chat-app-frontend-silk.vercel.app/'
}
app.use(cors(corsOptions));



const connectDB = require('./config/db');
connectDB();

const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/error');

app.use('/api/auth', authRouter);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue.bold));