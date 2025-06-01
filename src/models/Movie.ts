import mongoose from "mongoose";

export interface Movie extends Document {
    title: string;
    releaseYear: number;
    genre: string;
    director: string;
    cast: Array<String>;
    rating: number;
    description: string;


}

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String},
    director: { type: String},
    cast: { type: Array<String>},
    rating: { type: Number},
    description: { type: String},
})

export default mongoose.model<Movie>("Movie", MovieSchema);