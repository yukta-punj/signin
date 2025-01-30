const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Correct path

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leisure_loans'; 
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});