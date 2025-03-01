const { mongoose } = require("mongoose");
const { login } = require("../controllers/authController");

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connection successful ${conn.connection.name}`);
    } catch (error) {
        console.log(`Database connection faild ${error.message}`);
    }
}
module.exports=connectDB;