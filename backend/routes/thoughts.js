const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get thoughts with sorting
router.get('/', async (req, res) => {
    const sortBy = req.query.sortBy || 'timestamp';
    const order = req.query.order === 'asc' ? 1 : -1;

    const thoughts = await Thought.find().sort({ [sortBy]: order });
    res.json(thoughts);
});

// Post new thought
router.post('/', async (req, res) => {
    const { message } = req.body;
    const newThought = new Thought({ message });
    await newThought.save();
    res.status(201).json(newThought);
});

// Like a thought
router.post('/:id/like', async (req, res) => {
    const thought = await Thought.findById(req.params.id);
    if (thought) {
        thought.likes += 1;
        await thought.save();
        res.json(thought);
    } else {
        res.status(404).json({ error: 'Thought not found' });
    }
});

module.exports = router;
