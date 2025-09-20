const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const webhookRoutes = require('./routes/webhookRoutes');    
const orderStatusRoutes = require('./routes/orderStatusRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(cors({
  origin: "https://all-books-zfz6.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/health', (req, res) => {
    res.send('Welcome to the API');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });

});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-status', orderStatusRoutes);
app.use('/api/webhook', webhookRoutes);


connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}`)
    );
});
