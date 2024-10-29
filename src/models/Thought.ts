import { Schema, model, type Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);