const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const port = process.env.PORT || 8000;
const dotenv = require('dotenv');
dotenv.config()

const app = express();

// Route
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// db connection
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wbbon.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
)
    // .then(() => {
    //     app.listen(process.env.PORT || 8000)
    // })
    .then(() => console.log('DB Connected'))


// mongoose.connection.on('error', err => {
//     console.log(`DB connection error: ${err.message}`)
// });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});
