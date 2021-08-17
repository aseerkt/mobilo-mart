import { Router } from 'express';
import {
  getProducts,
  getSingleProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:productId', getSingleProduct);

export default router;
