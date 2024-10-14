const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes//adminRoutes')
const path = require('path');
const morgan = require('morgan')
const app = express();
require('dotenv').config()


app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(morgan('dev'))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes)


mongoose.connect('mongodb://localhost:27017/REDUX_UMS', {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
 

const PORT = process.env.PORT || 5002; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
