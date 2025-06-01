"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String },
    director: { type: String },
    cast: { type: (Array) },
    rating: { type: Number },
    description: { type: String },
});
exports.default = mongoose_1.default.model("Movie", MovieSchema);
