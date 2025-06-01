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
const Movie_1 = __importDefault(require("../models/Movie"));
const router = express_1.default.Router();
// GET /movies - pobierz wszystkie filmy + filtruj po gatunku i roku
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        if (req.query.year) {
            query.releaseYear = parseInt(req.query.year);
        }
        const movies = yield Movie_1.default.find(query);
        res.status(200).json(movies);
    }
    catch (error) {
        console.error("Błąd podczas pobierania filmów:", error);
        res.status(500).json({ message: "Wystąpił błąd serwera" });
    }
}));
// POST /movies - dodaj nowy film
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, releaseYear } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: "Tytuł jest wymagany i musi być ciągiem znaków" });
    }
    if (!releaseYear || typeof releaseYear !== 'number' || releaseYear < 1800 || releaseYear > new Date().getFullYear()) {
        return res.status(400).json({ message: "Rok produkcji jest wymagany i musi być liczbą między 1800 a obecnym rokiem" });
    }
    try {
        const newMovie = new Movie_1.default(req.body);
        const saved = yield newMovie.save();
        res.status(201).json(saved);
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ message: "Błąd dodawania filmu" });
    }
}));
// PUT /movies/:id - edytuj film
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield Movie_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!update) {
            return res.status(404).json({ message: "Nie znaleziono filmu do aktualizacji" });
        }
        res.status(200).json(update);
    }
    catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji filmu" });
    }
}));
// DELETE /movies/:id - usuń film
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Movie_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Nie znaleziono filmu do usunięcia" });
        }
        res.status(200).json(deleted);
    }
    catch (e) {
        res.status(400).json({ message: "Błąd usuwania filmu" });
    }
}));
// GET /movies/:id - pobierz pojedynczy film
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Nie znaleziono filmu" });
        }
        res.json(movie);
    }
    catch (e) {
        res.status(400).json({ message: "Błąd pobierania filmu" });
    }
}));
exports.default = router;
