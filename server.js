import mongoose from "mongoose";
import app from "./app.js";
import dotenv from 'dotenv';

// if (process.env.NODE_ENV != 'production') {
//         dotenv.config();
// }

// load environment variables
dotenv.config();

// Connecting to the DB
try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (error) {
    console.log(error);
}

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));