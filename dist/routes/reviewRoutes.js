"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reviews_1 = __importDefault(require("../models/Reviews"));
const Movie_1 = __importDefault(require("../models/Movie"));
const router = express_1.default.Router();
// Dodawanie recenzji do filmu
router.post("/movies/:id/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ message: "Film nie znaleziony" });
        const review = new Reviews_1.default(Object.assign(Object.assign({}, req.body), { movieId: req.params.id }));
        yield review.save();
        res.status(201).json(review);
    }
    catch (e) {
        res.status(400).json({ message: "Błąd dodawania recenzji" });
    }
}));
// Pobieranie recenzji danego filmu
router.get("/movies/:id/reviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Reviews_1.default.find({ movieId: req.params.id });
        res.json(reviews);
    }
    catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji" });
    }
}));
// Aktualizacja recenzji
router.put("/reviews/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield Reviews_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated)
            return res.status(404).json({ message: "Nie znaleziono recenzji" });
        res.json(updated);
    }
    catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji recenzji" });
    }
}));
// Usuwanie recenzji
router.delete("/reviews/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Reviews_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Nie znaleziono recenzji do usunięcia" });
        res.json({ message: "Recenzja usunięta", deleted });
    }
    catch (e) {
        res.status(400).json({ message: "Błąd usuwania recenzji" });
    }
}));
exports.default = router;
