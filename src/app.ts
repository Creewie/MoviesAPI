import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./database";
import movieRoutes from "./routes/movieRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();

(async () => {
    try {
        await connectDB();
        console.log("Połączono");
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e);
        } else {
            console.error(e);
        }
        process.exit(1);
    }
})();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// ✅ Rejestracja routerów
app.use("/movies", movieRoutes);
app.use("/movies/:id/reviews", reviewRoutes);
app.use("/reviews", reviewRoutes);

// Główna strona API
app.get("/", (req, res) => {
    res.json({ message: "API Express + TypeScript działa" });
});

// ✅ 404 - Nie znaleziono endpointu
app.use((req, res) => {
    res.status(404).json({ message: "Strona nie istnieje" });
});

// ✅ Obsługa błędów
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

export default app;