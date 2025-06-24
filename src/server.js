import express from 'express';
import routes from './routes/index.js';  // importa as rotas organizadas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// usa as rotas no caminho raiz '/'
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API funcionando na porta ${PORT}!`);
});