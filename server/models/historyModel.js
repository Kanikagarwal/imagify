import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    prompt:{
        type:String,
        required:true
    },
    imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.history || mongoose.model("history",historySchema);