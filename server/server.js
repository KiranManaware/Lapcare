const express = require('express');
const connectDB = require('./config/db_config');
const errorHandler = require('./middlewares/errorHandler');
const app=express();
require("dotenv").config();
const cors=require('cors');
const PORT=process.env.PORT||3000;

//Body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//Cors enables
app.use(cors({allwOrigin:"*"}))


// db connection
connectDB();

app.get('/',(req,res)=>{
    res.json({
        msg:"LAPCARE API IS RUNNING..."
    })
})


//user router
app.use('/api/user',require('./routes/authRoutes'));

//complaint router
app.use('/api/complaints',require('./routes/complaintRoutes'))

//admin router
app.use('/api/admin',require('./routes/adminRoutes'));



// middler ware
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`);
})