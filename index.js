import express from "express";
import cors from "cors";
import classifyRoute from "./routes/classify.js";

const app = express();
const PORT = 8080;

app.use(cors({}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/classify", classifyRoute);

app.listen(PORT, () => console.log("Server running on port 8080"));
