import express, { Request, Response } from "express";
import ReviewModel from "../models/Reviews";
import MovieModel from "../models/Movie";

const router = express.Router();

// POST /movies/:id/reviews - dodaj recenzję do filmu
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Film nie znaleziony" });

        const review = new ReviewModel({
            ...req.body,
            movieId: req.params.id
        });
        await review.save();
        res.status(201).json(review);
    } catch (e) {
        res.status(400).json({ message: "Błąd dodawania recenzji" });
    }
});

// GET /movies/:id/reviews - pobierz wszystkie recenzje filmu
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const reviews = await ReviewModel.find({ movieId: req.params.id });
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji" });
    }
});

// GET /movies/:id/reviews/:reviewId - pobierz konkretną recenzję filmu
router.get("/:reviewId", async (req: Request, res: Response): Promise<any> => {
    try {
        const review = await ReviewModel.findById(req.params.reviewId);

        if (!review || review.movieId.toString() !== req.params.id) {
            return res.status(404).json({ message: "Nie znaleziono recenzji lub nie pasuje do filmu" });
        }

        res.json(review);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji" });
    }
});

// PUT /movies/:id/reviews/:reviewId - edytuj recenzję
router.put("/:reviewId", async (req: Request, res: Response): Promise<any> => {
    try {
        const updated = await ReviewModel.findByIdAndUpdate(req.params.reviewId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return res.status(404).json({ message: "Nie znaleziono recenzji" });
        }

        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji recenzji" });
    }
});

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