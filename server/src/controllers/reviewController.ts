import { DI } from '../app';
import Mobile from '../entities/Mobile';
import Review from '../entities/Review';
import routeHandler from '../utils/routeHandler';

type PostBody = {
  title: string;
  body?: string;
  rating: number;
  mobileId: string;
};

// Post Review

export const postReview = routeHandler(async (req, res) => {
  const { body, title, mobileId, rating } = req.body as PostBody;

  const newReview = await DI.em.transactional(async (em) => {
    const existingReview = await em.findOne(Review, {
      user: res.locals.userId,
      mobile: mobileId,
    });
    if (existingReview) {
      res.status(400);
      throw new Error('You cann only post one review per product');
    }

    const productToReview = await em.findOne(Mobile, { id: mobileId });

    if (!productToReview) {
      res.status(404);
      throw new Error('Product you are trying to review does not exist');
    }

    productToReview.numReviews = productToReview.numReviews + 1;
    productToReview.stars = Number(
      (
        (productToReview.stars * productToReview.numReviews + rating) /
        productToReview.numReviews
      ).toFixed(1)
    );

    await em.persistAndFlush(productToReview);

    const newReview = em.create(Review, {
      mobile: mobileId,
      user: res.locals.userId,
      title,
      body,
      rating,
    });

    await em.persistAndFlush(newReview);

    return newReview;
  });

  return res.json(newReview);
});

// Edit Review

export const editReview = routeHandler(async (req, res) => {
  const { body, title, mobileId, rating } = req.body as PostBody;
  const editedReview = await DI.em.transactional(async (em) => {
    const existingReview = await em.findOne(Review, {
      user: res.locals.userId,
      mobile: mobileId,
    });

    if (!existingReview) {
      res.status(404);
      throw new Error('Review you are trying to edit does not exist');
    }

    const productReviewed = await em.findOne(Mobile, { id: mobileId });

    if (!productReviewed) {
      res.status(404);
      throw new Error(
        'Product you are trying to edit the review of does not exist'
      );
    }

    productReviewed.stars = Number(
      (
        productReviewed.stars +
        (rating - existingReview.rating) / productReviewed.numReviews
      ).toFixed(1)
    );

    await em.persistAndFlush(productReviewed);

    existingReview.title = title;
    if (body) existingReview.body = body;
    existingReview.rating = rating;

    await em.persistAndFlush(existingReview);
    return existingReview;
  });

  return res.json(editedReview);
});

// Delete Review

export const deleteReview = routeHandler(async (req, res) => {
  await DI.em.transactional(async (em) => {
    const reviewToDelete = await em.findOne(Review, {
      mobile: req.params.mobileId,
      user: res.locals.userId,
    });

    const productToDeleteReview = await em.findOne(Mobile, {
      id: req.params.mobileId,
    });

    if (!productToDeleteReview || !reviewToDelete) {
      res.status(404);
      throw new Error(
        'Product or review that you are trying to delete does not exist'
      );
    }

    productToDeleteReview.numReviews = productToDeleteReview.numReviews - 1;
    productToDeleteReview.stars = Number(
      productToDeleteReview.stars +
        (productToDeleteReview.stars - reviewToDelete.rating) /
          productToDeleteReview.numReviews
    );

    await em.persistAndFlush(productToDeleteReview);
    await em.nativeDelete(Review, {
      id: reviewToDelete.id,
    });
  });
  return res.json({ ok: true });
});
