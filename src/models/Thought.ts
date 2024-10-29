import { Schema, model, type Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}