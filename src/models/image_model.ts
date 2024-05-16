import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        required: true
    }
});

export default mongoose.model("Image", imageSchema);