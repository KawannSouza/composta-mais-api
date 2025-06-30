// src/routes/chat.js

import { Router } from 'express';
import { chat } from '../controllers/chat.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMessage:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: A pergunta do usuário sobre compostagem.
 *       example:
 *         message: "Posso colocar casca de laranja na minha composteira?"
 */

/**
 * @swagger
 * tags:
 *   name: Chat AI
 *   description: Endpoint para interagir com a inteligência artificial de compostagem
 */

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Envia uma mensagem para a IA e recebe uma resposta
 *     tags: [Chat AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatMessage'
 *     responses:
 *       200:
 *         description: Resposta da IA retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *       400:
 *         description: A mensagem está vazia ou não é relacionada à compostagem.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/", chat);

export default router;