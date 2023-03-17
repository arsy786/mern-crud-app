import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables
if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    } catch (err) {
        console.log(err);
    }
    
}

export default connectToDb;