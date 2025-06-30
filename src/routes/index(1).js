// routes/index.js
import { Router } from 'express';
import usersRouter from './users.js';

const router = Router();

// Rota raiz para teste
router.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

// Rotas relacionadas a usuários
router.use('/users', usersRouter);

// Aqui pode importar e usar outras rotas depois:
// router.use('/doacoes', doacoesRouter);

export default router;