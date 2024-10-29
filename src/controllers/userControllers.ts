import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// get all users
export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
    }

// get a user by id
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('-__v').populate('friends').populate('thoughts');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// create a new user
export const createUser = async(req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// delete a user
export const deleteUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const thought = await Thought.findOneAndUpdate(
            { user: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'User deleted, but no thoughts found' });
            return;
        }

        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
}