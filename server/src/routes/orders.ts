import { Router } from 'express';
import {
  getMyOrders,
  placeOrder,
  setRazorOrder,
} from '../controllers/orderController';
import { requireAuth } from '../middlewares/permissions';

const router = Router();

router.get('/', requireAuth, getMyOrders);
router.post('/', requireAuth, setRazorOrder);
router.post('/save', requireAuth, placeOrder);

export default router;
