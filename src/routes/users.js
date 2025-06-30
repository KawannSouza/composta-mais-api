// src/routes/users.routes.js

import { Router } from 'express';
import {
  register,
  login,
  editarUsuario,
  excluirUsuario
} from '../controllers/users.js';

import { authenticate } from '../middlewares/authMiddleware.js'; // 👈 importa o middleware

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuário.
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail único do usuário.
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário (mínimo 8 caracteres).
 *         role:
 *           type: string
 *           enum: [COMPOSTADOR, DOADOR, ADMIN]
 *           description: O papel do usuário no sistema.
 *       example:
 *         name: "João da Silva"
 *         email: "joao.silva@example.com"
 *         password: "senhaSegura123"
 *         role: "COMPOSTADOR"
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: "joao.silva@example.com"
 *         password: "senhaSegura123"
 */

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para registro e login de usuários
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Campos obrigatórios faltando.
 *       409:
 *         description: E-mail já registrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/register", register);
router.post("/login", login);

// ✅ Rotas protegidas por autenticação:
router.put("/:id", authenticate, editarUsuario);
router.delete("/:id", authenticate, excluirUsuario);

export default router;
