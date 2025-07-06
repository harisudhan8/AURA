const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thought', thoughtSchema);
