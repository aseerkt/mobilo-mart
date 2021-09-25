import { Router } from 'express';
import { login, logout, me, register } from '../controllers/userController';
import { checkAuth, requireAuth } from '../middlewares/permissions';
import { registerValidators } from '../validators';

const router = Router();

router.post('/', registerValidators, register);
router.post('/login', login);
router.get('/', checkAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
