import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected",()=>{
        console.log("Database connected");
        
    })
    await mongoose.connect(`${process.env.MONGOURL}/imagify`)
}

export default connectDB