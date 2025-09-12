import mongoose from "mongoose";
import './Product'
import './User'

const { Schema } = mongoose

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  status:{
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected']
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
