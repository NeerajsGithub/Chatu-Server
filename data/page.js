import mongoose from "mongoose";

export function connectDb () {

    mongoose.connect('mongodb+srv://chatu890:chatu890@chatu.avmwqdc.mongodb.net/?retryWrites=true&w=majority&appName=Chatu' || process.env.MONGO_URL);
    const db = mongoose.connection;
    db.on('error', (error) => console.error('MongoDB connection error:', error));
    db.once('open', () => console.log('Connected to MongoDB'));

}
