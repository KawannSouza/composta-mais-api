import express from 'express';
import cors from 'cors';
import chat from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/chat', chat);

app.listen(PORT, () => {
    console.log(`API funcionando na porta ${PORT}!`);
});