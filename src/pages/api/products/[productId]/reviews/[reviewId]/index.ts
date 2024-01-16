import Mobile from '@/database/models/Mobile';
import { attachTokenToRequest, makeDbConnection } from '@/libs/middlewares';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next/types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(makeDbConnection, attachTokenToRequest)
  .put(async (req, res) => {
    const { title, body, rating } = req.body;

    const product = await Mobile.findOne(
      {
        _id: req.query.productId,
        'reviews._id': req.query.reviewId,
        'reviews.user._id': req.token.id,
      },
      {
        stars: 1,
        numReviews: 1,
        'reviews.rating': 1,
      }
    );

    const review = product?.reviews.find(
      (rev) => rev._id === req.query.reviewId
    );

    if (!product || !review) {
      return res.status(404).json({ message: 'Unable to find review to edit' });
    }

    const updatedStars =
      product.stars + (rating - review.rating) / product.numReviews;

    await Mobile.updateOne(
      {
        _id: req.query.productId,
        'reviews._id': req.query.reviewId,
        'reviews.user._id': req.token.id,
      },
      {
        $set: {
          stars: updatedStars,
          'reviews.$.title': title,
          'reviews.$.body': body,
          'reviews.$.rating': rating,
        },
      }
    );

    res.json({ message: 'Review updated successfully' });
  })
  .delete(async (req, res) => {
    const product = await Mobile.findOne(
      {
        _id: req.query.productId,
        'reviews._id': req.query.reviewId,
        'reviews.user._id': req.token.id,
      },
      {
        stars: 1,
        numReviews: 1,
        'reviews.rating': 1,
      }
    );

    const review = product?.reviews.find(
      (rev) => rev._id === req.query.reviewId
    );

    if (!product || !review) {
      return res.status(404).json({ message: 'Unable to find review to edit' });
    }

    const updatedStars =
      (product.numReviews * product.stars - review.rating) /
      (product.numReviews - 1);

    await Mobile.updateOne(
      { _id: req.query.productId },
      {
        $set: {
          stars: updatedStars,
          numReviews: product.numReviews - 1,
        },
        $pull: { reviews: { _id: req.query.reviewId } },
      }
    );
    res.json({ message: 'Review deleted successfully' });
  });

export default router.handler();
