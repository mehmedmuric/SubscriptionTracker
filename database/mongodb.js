import mongoose from "mongoose";


import { DB_URL, NODE_ENV } from "../config/env.js";

if(!DB_URL) {
    throw new Error("Database URL is not defined in environment variables");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);

        console.log(`Connected to MongoDB database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        
        process.exit(1);
    }
}


export default connectDB;