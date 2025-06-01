import mongoose, { Document } from "mongoose";

export interface Review extends Document {
    author: string;
    content: string;
    movieId: mongoose.Types.ObjectId;
}

const ReviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
});

export default mongoose.model<Review>("Review", ReviewSchema);