import express from "express";
import MovieModel from "../models/Movie";

const router = express.Router();

// GET /movies - pobierz wszystkie filmy + filtruj po gatunku i roku
router.get("/", async (req, res) => {
    try {
        const query: any = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        if (req.query.year) {
            query.releaseYear = parseInt(req.query.year as string);
        }

        const movies = await MovieModel.find(query);
        res.status(200).json(movies);
    } catch (error) {
        console.error("Błąd podczas pobierania filmów:", error);
        res.status(500).json({ message: "Wystąpił błąd serwera" });
    }
});

// POST /movies - dodaj nowy film
router.post("/", async (req, res): Promise<any> => {
    const { title, releaseYear } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: "Tytuł jest wymagany i musi być ciągiem znaków" });
    }

    if (!releaseYear || typeof releaseYear !== 'number' || releaseYear < 1800 || releaseYear > new Date().getFullYear()) {
        return res.status(400).json({ message: "Rok produkcji jest wymagany i musi być liczbą między 1800 a obecnym rokiem" });
    }

    try {
        const newMovie = new MovieModel(req.body);
        const saved = await newMovie.save();
        res.status(201).json(saved);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: "Błąd dodawania filmu" });
    }
});

// PUT /movies/:id - edytuj film
router.put("/:id", async (req, res): Promise<any> => {
    try {
        const update = await MovieModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!update) {
            return res.status(404).json({ message: "Nie znaleziono filmu do aktualizacji" });
        }

        res.status(200).json(update);
    } catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji filmu" });
    }
});

// DELETE /movies/:id - usuń film
router.delete("/:id", async (req, res): Promise<any> => {
    try {
        const deleted = await MovieModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Nie znaleziono filmu do usunięcia" });
        }

        res.status(200).json(deleted);
    } catch (e) {
        res.status(400).json({ message: "Błąd usuwania filmu" });
    }
});

// GET /movies/:id - pobierz pojedynczy film
router.get("/movies/:id", async (req, res): Promise<any> => {
    try {
        const movie = await MovieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Nie znaleziono filmu" });
        }

        res.json(movie);
    } catch (e) {
        res.status(400).json({ message: "Błąd pobierania filmu" });
    }
});

export default router;