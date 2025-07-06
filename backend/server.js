const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const thoughtRoutes = require('./routes/thoughts');
app.use('/api/thoughts', thoughtRoutes);

app.get('/', (req, res) => {
    res.send('Public Message Board API ✅');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
