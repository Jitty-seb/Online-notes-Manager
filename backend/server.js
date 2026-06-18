const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/notes", require("./routes/noteRoutes"));

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.get("/test", (req, res) => {
  res.send("Backend Working");
});

app.listen(8000, () => {
    console.log("Server Running On 8000");
});