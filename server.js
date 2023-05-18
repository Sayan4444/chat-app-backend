const express = require('express');
const app = express();
const colors = require('colors')
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/error');


dotenv.config({ path: './config/config.env' });

app.use(express.json());

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