import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLenghth: [2, 'Name must be at least 2 characters long'],
        maxLength: [50, 'Name must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLenghth: [5, 'Email must be at least 5 characters long'],
        maxLength: [50, 'Email must be at most 50 characters long'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLenghth: [8, 'Password must be at least 8 characters long'],
        maxLength: [50, 'Password must be at most 100 characters long'],
    }
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;