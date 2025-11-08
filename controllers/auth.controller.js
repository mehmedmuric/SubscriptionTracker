import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import User from '../database/models/user.model.js';



export const signUp = async (req, res, next ) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const {name, email, password} = req.body;
        const existinguser = await User.findOne({email});

        if(existinguser){
            const error = new Error('User already exists');
            error.status = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        await session.commitTransaction();
        session.endSession();
        

        const token = jwt.sign(
            { userId: newUser[0]._id}, 
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        });


    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }   
};

export const signIn = async (req, res, next ) => {

};

export const signOut = async (req, res, next ) => {

}