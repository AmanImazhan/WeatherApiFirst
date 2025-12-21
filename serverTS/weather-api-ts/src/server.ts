import express, { type Request, type Response } from "express";
import { PORT } from "./config/config.js";
import weatherRoutes from "./moduls/weather/weather.routes.js"
import errorHandler from "./utils/errorHandler.js";
import { error } from "node:console";

const app = express();

app.use(express.json());
app.use("/api", weatherRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});