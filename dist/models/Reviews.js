"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String },
    movieId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Movie", required: true },
});
exports.default = mongoose_1.default.model("Review", ReviewSchema);
