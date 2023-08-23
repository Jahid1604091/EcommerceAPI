import express from 'express';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js'
import storeRoute from './routes/storeRoute.js'
import categoryRoute from './routes/categoryRoute.js'
const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/users',userRoute);
app.use('/api/store',storeRoute);
app.use('/api/category',categoryRoute);
app.get('/',(req,res)=>{
    res.send('API running...')
})


app.listen(8080, ()=>console.log('Server running...'))