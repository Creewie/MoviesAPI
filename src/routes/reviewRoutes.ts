import express, { Request, Response } from "express";
import ReviewModel from "../models/Reviews";
import MovieModel from "../models/Movie";

const router = express.Router();

// Dodawanie recenzji do filmu
router.post("/movies/:id/reviews", async (req: Request, res: Response): Promise<any> => {
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

// Pobieranie recenzji danego filmu
router.get("/movies/:id/reviews", async (req: Request, res: Response) => {
    try {
        const reviews = await ReviewModel.find({ movieId: req.params.id });
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ message: "Błąd pobierania recenzji" });
    }
});

// Aktualizacja recenzji
router.put("/reviews/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const updated = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: "Nie znaleziono recenzji" });
        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: "Błąd aktualizacji recenzji" });
    }
});

// Usuwanie recenzji
router.delete("/reviews/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const deleted = await ReviewModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Nie znaleziono recenzji do usunięcia" });
        res.json({ message: "Recenzja usunięta", deleted });
    } catch (e) {
        res.status(400).json({ message: "Błąd usuwania recenzji" });
    }
});

export default router;