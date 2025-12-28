import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "data.json");
const DIST_DIR = path.join(__dirname, "dist");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({}, null, 2), "utf8");
  }
};

app.get("/api/content", async (_req, res) => {
  try {
    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const data = raw ? JSON.parse(raw) : {};
    res.json(data);
  } catch (err) {
    console.error("Error reading data file", err);
    res.status(500).json({ error: "No se pudo leer la data" });
  }
});

app.post("/api/content", async (req, res) => {
  try {
    await ensureDataFile();
    const content = req.body || {};
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf8");
    res.json({ ok: true });
  } catch (err) {
    console.error("Error writing data file", err);
    res.status(500).json({ error: "No se pudo guardar la data" });
  }
});

// Sirve el build de Vite si existe
app.use(express.static(DIST_DIR));
app.get("*", async (_req, res) => {
  try {
    await fs.access(path.join(DIST_DIR, "index.html"));
    res.sendFile(path.join(DIST_DIR, "index.html"));
  } catch {
    res.status(404).send("Build no encontrado. Ejecuta npm run build primero.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
