import { Schema, Types, ObjectId, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}
