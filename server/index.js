import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
