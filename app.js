import express from 'express';


const app = express();


app.get('/',(req,res)=>{
    res.send('API running...')
})


app.listen(8080, ()=>console.log('Server running...'))