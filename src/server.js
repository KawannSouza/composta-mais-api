import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API working! 🚀")
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}!`);
});