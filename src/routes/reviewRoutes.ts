import express, { Request, Response } from "express";
import ReviewModel from "../models/Reviews";
import MovieModel from "../models/Movie";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const allReviews = await ReviewModel.find();
        res.json(allReviews);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania wszystkich recenzji" });
    }
});

// POST /reviews - dodaj nową recenzję (z movieId w req.body)
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const { movieId } = req.body;

        if (!movieId) {
            return res.status(400).json({ message: "Brak pola movieId w danych wejściowych" });
        }

        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Film nie znaleziony" });
        }

        const newReview = new ReviewModel({
            ...req.body,
            movieId
        });

        const saved = await newReview.save();
        res.status(201).json(saved);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: "Błąd dodawania recenzji" });
    }
});

// GET /reviews/by-movie/:movieId - pobierz wszystkie recenzje filmu
router.get("/by-movie/:movieId", async (req: Request, res: Response): Promise<any> => {
    try {
        const reviews = await ReviewModel.find({ movieId: req.params.movieId });

        if (!reviews.length) {
            return res.status(404).json({ message: "Nie znaleziono recenzji dla tego filmu" });
        }

        res.json(reviews);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji" });
    }
});

// GET /reviews/:reviewId - pobierz pojedynczą recenzję
router.get("/:reviewId", async (req: Request, res: Response): Promise<any> => {
    try {
        const review = await ReviewModel.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: "Nie znaleziono recenzji" });
        }

        res.json(review);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji po ID" });
    }
});

// PUT /reviews/:reviewId - edytuj recenzję
router.put("/:reviewId", async (req: Request, res: Response): Promise<any> => {
    try {
        const updated = await ReviewModel.findByIdAndUpdate(
            req.params.reviewId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Nie znaleziono recenzji" });
        }

        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji recenzji" });
    }
});

// DELETE /reviews/:reviewId - usuń recenzję
router.delete("/:reviewId", async (req: Request, res: Response): Promise<any> => {
    try {
        const deleted = await ReviewModel.findByIdAndDelete(req.params.reviewId);

        if (!deleted) {
            return res.status(404).json({ message: "Nie znaleziono recenzji do usunięcia" });
        }

        res.json({ message: "Recenzja usunięta", deleted });
    } catch (e) {
        res.status(400).json({ message: "Błąd usuwania recenzji" });
    }
});

export default router;