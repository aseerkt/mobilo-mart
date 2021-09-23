import { Router } from 'express';
import { login, logout, me, register } from '../controllers/userController';
import { checkAuth, requireAuth } from '../middlewares/permissions';

const router = Router();

router.post('/', register);
router.post('/login', login);
router.get('/', checkAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
