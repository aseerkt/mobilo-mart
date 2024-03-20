import { attachTokenToRequest, makeDbConnection } from '@/libs/middlewares';
import Mobile from 'database/models/Mobile';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(makeDbConnection, attachTokenToRequest).post(async (req, res) => {
  const { title, body, rating } = req.body;

  const product = await Mobile.findOne({
    _id: req.query.productId,
    'reviews.user._id': { $ne: req.token.id },
  });

  if (!product)
    res
      .status(400)
      .json({ message: `Unable to review product [${req.query.productId}]` });

  const updatedStars =
    (product.numReviews * product.stars + rating) / (product.numReviews + 1);

  await Mobile.updateOne(
    { _id: req.query.productId },
    {
      $set: {
        stars: updatedStars,
        numReviews: product.numReviews + 1,
      },
      $push: {
        reviews: {
          title,
          body,
          rating,
          user: {
            _id: req.token.id,
            name: req.token.name,
            email: req.token.email,
          },
        },
      },
    }
  );

  res.json({ message: 'Review added successfully' });
});

export default router.handler();
