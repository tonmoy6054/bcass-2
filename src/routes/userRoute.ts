import { Router } from 'express';
import { login } from '../controllers/userController';

const router = Router();

router.post('/auth/login', login);

export default router;
