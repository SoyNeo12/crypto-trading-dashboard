import path from "path";
import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use("/api", router);

const buildPath = path.join(__dirname, "../../frontend/build");
app.use(express.static(buildPath));

app.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));