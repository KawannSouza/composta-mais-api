import { Router } from 'express';
import { chat } from '../controllers/chat.js';

const router = Router();

router.post("/", chat);

export default router;