import mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI environment variable is not defined");
        process.exit(1);
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('MongoDB Error:', error);
        process.exit(1);
    }
}
