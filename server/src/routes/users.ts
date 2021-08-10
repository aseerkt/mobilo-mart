import { Router } from 'express';
import { register } from '../controllers/userController';

const router = Router();

router.post('/', register);

export default router;
