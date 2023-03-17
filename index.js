// Import dependencies
import express from 'express';
import connectToDb from './config/database.js'
import api from './routes/api.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env variables
if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}

// Create an express app
const app = express();

// Configure express app (middleware)
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing
app.use('/', api)

// Start our server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
});