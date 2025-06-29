import { Router } from 'express';
import { criarRegistro } from '../controllers/registros.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();
router.post("/", authenticate, criarRegistro);

export default router;

import { listarRegistros } from '../controllers/registros.js';
// ...
router.get("/", authenticate, listarRegistros);