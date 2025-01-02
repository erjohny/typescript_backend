
import morgan from "morgan";
import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes"
import pool from "./utils/db";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"))
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send({ message: "Ошибка сервера" })
})

app.use("/auth", authRoutes)
app.use("/posts", postRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello")
})

app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Database connection failed" });
    }
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту:  ${PORT}`);
});