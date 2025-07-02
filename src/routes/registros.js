// src/routes/registros.js

import { Router } from 'express';
import { criarRegistro, listarRegistros } from '../controllers/registros.js';
import { authenticate } from '../middlewares/authMiddleware.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Registro:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: O ID do registro gerado pelo MongoDB.
 *         data:
 *           type: string
 *           format: date-time
 *           description: A data em que o registro foi feito.
 *         tipoDeResiduo:
 *           type: string
 *           description: O tipo de resíduo que foi compostado.
 *         notas:
 *           type: string
 *           description: Notas adicionais sobre o registro.
 *         problemas:
 *           type: string
 *           description: Problemas encontrados durante o processo.
 *         userId:
 *           type: string
 *           description: O ID do usuário que criou o registro.
 *       example:
 *         id: "667f2a1b..."
 *         data: "2024-06-28T18:30:00.000Z"
 *         tipoDeResiduo: "Restos de vegetais"
 *         notas: "Adicionado 2kg de material verde."
 *         problemas: "Nenhum"
 *         userId: "667f1b2c..."
 *     RegistroCreate:
 *       type: object
 *       required:
 *         - data
 *         - tipoDeResiduo
 *         - notas
 *         - problemas
 *       properties:
 *         data:
 *           type: string
 *           format: date-time
 *           description: A data do registro (formato ISO 8601).
 *         tipoDeResiduo:
 *           type: string
 *           description: Descrição do tipo de resíduo.
 *         notas:
 *           type: string
 *           description: Notas sobre o processo.
 *         problemas:
 *           type: string
 *           description: Problemas ou observações.
 *       example:
 *         data: "2024-06-28T18:30:00.000Z"
 *         tipoDeResiduo: "Cascas de frutas e borra de café"
 *         notas: "Compostagem aerada, tudo normal."
 *         problemas: "O cheiro está um pouco forte, vou adicionar mais material seco."
 */

/**
 * @swagger
 * tags:
 *   name: Registros
 *   description: Gerenciamento dos registros de compostagem
 */

const router = Router();

/**
 * @swagger
 * /registros:
 *   post:
 *     summary: Cria um novo registro de compostagem (requer autenticação)
 *     tags: [Registros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroCreate'
 *     responses:
 *       201:
 *         description: Registro criado com sucesso.
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido).
 *       403:
 *         description: Acesso negado (somente usuários COMPOSTADOR).
 */
router.post("/", authenticate, criarRegistro);

/**
 * @swagger
 * /registros:
 *   get:
 *     summary: Lista todos os registros do usuário autenticado
 *     tags: [Registros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros do usuário retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registro'
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido).
 */
router.get("/", authenticate, listarRegistros);

export default router;