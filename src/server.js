import express from 'express';
import cors from 'cors';
import chat from './routes/chat.js';
import users from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/chat", chat);
app.use("/users", users);

app.get("/", (req, res) => {
    res.send("API is running! 🚀");
});

app.listen(PORT, () => {
    console.log(`API funcionando na porta ${PORT}!`);
});
import registrosRoutes from './routes/registros.js';
app.use("/registros", registrosRoutes);