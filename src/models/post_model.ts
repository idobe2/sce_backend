import mongoose from "mongoose";

export interface IPost {
  title: string;
  category: string;
  price: number;
  message: string;
  owner: string;
  image: string;
  date: Date;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPost>("Post", postSchema);
