import mongoose from "mongoose";

export interface IPost {
  title: string;
  message: string;
  owner: string;
  image: string;
  price: number;
  category: string;
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
});

export default mongoose.model<IPost>("Post", postSchema);