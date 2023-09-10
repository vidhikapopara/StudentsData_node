const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const studenyRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user');

mongoose.connect('mongodb+srv://tutorial:PXczrPFL1wzoJR0z@cluster0.wymj6.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error',err=> {
    console.log('connection failed')
})

mongoose.connection.on('connected', connected => {
     console.log('connected with data base successfuly')
})

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));  
app.use(bodyParser.json());

app.use('/student',studenyRoute)
app.use('/user',userRoute);

app.use((req,res,next) => {
    res.status(404).json ({
        message : 'bad request'
    })
})
    
module.exports = app;