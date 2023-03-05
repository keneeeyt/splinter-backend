require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 4001;



//main middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use('/api', require('./routes/userRoute'));
app.use('/api', require('./routes/myUserRoute'));

//Mongodb connection

const URI = process.env.MONGODB_URL

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error'));
db.once('open', ()=> {
    console.log('We are connected to the cloud server!');
})
app.listen(port, ()=> {
    console.log('the sever is running at port', port);
})