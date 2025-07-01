// src/routes/users.js

import { Router } from 'express';
import {
  register,
  login,
  editarUsuario,
  excluirUsuario
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authMiddleware.js';

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
 *           description: Senha do usuário.
 *         role:
 *           type: string
 *           enum: [COMPOSTADOR, DOADOR, ADMIN]
 *           description: O papel do usuário no sistema.
 *       example:
 *         name: "Joana Doadora"
 *         email: "joana.d@example.com"
 *         password: "senhaSegura123"
 *         role: "DOADOR"
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
 *         email: "joana.d@example.com"
 *         password: "senhaSegura123"
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Novo nome do usuário.
 *         phone:
 *           type: string
 *           description: Novo telefone do usuário.
 *         address:
 *           type: string
 *           description: Novo endereço do usuário (para compostadores).
 *       example:
 *         name: "Joana Doadora da Silva"
 *         phone: "11987654321"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para registro, login e gerenciamento de usuários
 */

const router = Router();

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
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza o login de um usuário e retorna um token JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", login);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edita as informações de um usuário (requer autenticação)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário a ser editado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido).
 *       403:
 *         description: Acesso negado (usuário tentando editar outro usuário).
 *       404:
 *         description: Usuário não encontrado.
 */
router.put("/:id", authenticate, editarUsuario);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário (requer autenticação)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário a ser excluído.
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido).
 *       403:
 *         description: Acesso negado (usuário tentando excluir outro usuário).
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete("/:id", authenticate, excluirUsuario);

export default router;