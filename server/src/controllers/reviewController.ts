import { DI } from '../app';
import routeHandler from '../utils/routeHandler';

type PostBody = {
  title: string;
  body?: string;
  rating: number;
  mobileId: string;
};

export const postReview = routeHandler(async (req, res) => {
  const { body, title, mobileId, rating } = req.body as PostBody;
  const existingReview = await DI.reviewRepository.findOne({
    user: res.locals.userId,
    mobile: mobileId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You cannot only one review per product');
  }

  const newReview = DI.reviewRepository.create({
    mobile: mobileId,
    user: res.locals.userId,
    title,
    body,
    rating,
  });

  await DI.em.persistAndFlush(newReview);

  return res.json(newReview);
});

export const editReview = routeHandler(async (req, res) => {
  const { body, title, mobileId, rating } = req.body as PostBody;
  const existingReview = await DI.reviewRepository.findOne({
    user: res.locals.userId,
    mobile: mobileId,
  });

  if (!existingReview) {
    res.status(404);
    throw new Error('Review you are trying to edit does not exist');
  }

  existingReview.title = title;
  if (body) existingReview.body = body;
  existingReview.rating = rating;

  await DI.em.persistAndFlush(existingReview);

  return res.json(existingReview);
});

export const deleteReview = routeHandler(async (req, res) => {
  await DI.reviewRepository.nativeDelete({
    mobile: req.body.mobileId,
    user: res.locals.userId,
  });
  return res.json({ ok: true });
});
