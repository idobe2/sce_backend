import mongoose from "mongoose";

export interface IPost {
  title: string;
  message: string;
  owner: string;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPost>("Post", postSchema);