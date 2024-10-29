import { Schema, model } from 'mongoose';
import Reaction from './Reaction.js';
const thoughtSchema = new Schema({
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
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
thoughtSchema
    .virtual('recationCount')
    .get(function () {
    return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);
export default Thought;
