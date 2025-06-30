import { Router } from 'express';
import {
  register,
  login,
  editarUsuario,
  excluirUsuario
} from '../controllers/users.js';

import { authenticate } from '../middlewares/authMiddleware.js'; // 👈 importa o middleware

const router = Router();

router.post("/register", register);
router.post("/login", login);

// ✅ Rotas protegidas por autenticação:
router.put("/:id", authenticate, editarUsuario);
router.delete("/:id", authenticate, excluirUsuario);

export default router;
