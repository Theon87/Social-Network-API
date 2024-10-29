import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
    }