import { Thought, User } from '../models/index.js';
// get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// get a thought by id
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// update a thought
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// create a new thought
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID' });
        }
        else {
            res.json('Created the thought 🎉');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// delete a thought
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
            return;
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No reaction with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
