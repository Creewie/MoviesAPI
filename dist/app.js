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
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        console.log("Połączono");
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e);
        }
        else {
            console.error(e);
        }
        process.exit(1);
    }
}))();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// ✅ Rejestracja routerów
app.use("/movies", movieRoutes_1.default);
app.use("/movies/:id/reviews", reviewRoutes_1.default);
// Główna strona API
app.get("/", (req, res) => {
    res.json({ message: "API Express + TypeScript działa" });
});
// ✅ 404 - Nie znaleziono endpointu
app.use((req, res) => {
    res.status(404).json({ message: "Strona nie istnieje" });
});
// ✅ Obsługa błędów
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: "Wystąpił błąd serwera" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
exports.default = app;
