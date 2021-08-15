import { Router } from 'express';
import { login, me, register } from '../controllers/userController';
import { checkAuth } from '../middlewares/permissions';

const router = Router();

router.post('/', register);
router.post('/login', login);
router.get('/', checkAuth, me);

export default router;
