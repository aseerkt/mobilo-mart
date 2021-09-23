import { Router } from 'express';
import { placeOrder, setRazorOrder } from '../controllers/orderController';
import { requireAuth } from '../middlewares/permissions';

const router = Router();

router.post('/', requireAuth, setRazorOrder);
router.post('/save', requireAuth, placeOrder);

export default router;
