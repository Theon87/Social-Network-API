import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// get all thoughts
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
    }