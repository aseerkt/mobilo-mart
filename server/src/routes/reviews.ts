import { Router } from 'express';
import {
  deleteReview,
  editReview,
  postReview,
} from '../controllers/reviewController';
import { requireAuth } from '../middlewares/permissions';

const router = Router();

router.post('/', requireAuth, postReview);
router.put('/', requireAuth, editReview);
router.delete('/:mobileId', requireAuth, deleteReview);

export default router;
