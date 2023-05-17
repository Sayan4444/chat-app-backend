const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const cors = require('cors');

app.use(express.json());

const corsOptions = {
    credentials: true,
    origin: process.env.ENV === 'dev' ? 'http://localhost:3000' : 'https://chat-app-frontend-silk.vercel.app'
}
app.use(cors(corsOptions));

const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue.bold));