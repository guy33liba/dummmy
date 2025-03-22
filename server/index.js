import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// API route (just for demonstration)
app.get("/api", (req, res) => {
 res.json({ message: "Hello from Express!" });
});

// Catch-all handler to send back the index.html for any non-API route
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
