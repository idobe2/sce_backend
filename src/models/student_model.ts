import mongoose from "mongoose";

export interface IStudent {
  name: string;
  _id: string;
  age: number;
  image?: string;
}

const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  }
});

export default mongoose.model<IStudent>("Student", studentSchema);