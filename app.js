// Import dependencies
import express from 'express';
import router from './routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Create an express app
const app = express();

// Configure express app (middleware)
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
    res.status(200).json({ alive: "true" });
});

// Routing
app.use('/api', router)

export default app;