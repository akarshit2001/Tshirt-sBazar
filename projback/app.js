const express = require('express');
require('dotenv').config();// for future confoguration
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const authRoute = require('./routes/authRoute');
const userRoute = require('../projback/routes/user');
const catRoute = require('../projback/routes/category');
const prodRoute = require('../projback/routes/product');
const orderRoute = require('../projback/routes/order')
const payemntRoute = require('../projback/routes/payment');


mongoose.connect(process.env.DATABASE, {
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser: true}).then(()=>console.log("connected")).
    catch(()=>console.log("error"));

app.use(express.json());
app.use(express.urlencoded({
    extended:true}))
app.use(cookie());
app.use(cors());



// router
app.use('/api',authRoute); // by this you have to write http://localhost:8000/api/login like this .
app.use('/api',userRoute);
app.use('/api',catRoute);
app.use('/api',prodRoute);
app.use('/api',orderRoute);
app.use('/api',payemntRoute);


const port =process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})
