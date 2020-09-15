import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recieved : Boolean
});

export default mongoose.model("Message", messageSchema);