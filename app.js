// Import dependencies
import express from 'express';
import router from './routes/note.route.js';
import cors from 'cors';

// Create an express app
const app = express();

// Configure express app (middleware)
app.use(express.json());
app.use(cors());

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
    res.status(200).json({ alive: "true" });
});

// Routing
app.use('/api', router)

export default app;