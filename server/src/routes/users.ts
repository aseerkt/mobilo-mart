import { Router } from 'express';
import { login, logout, me, register } from '../controllers/userController';
import { checkAuth } from '../middlewares/permissions';

const router = Router();

router.post('/', register);
router.post('/login', login);
router.get('/', checkAuth, me);
router.post('/logout', checkAuth, logout);

export default router;
