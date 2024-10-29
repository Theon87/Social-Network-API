import { Schema, model, ObjectId, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}