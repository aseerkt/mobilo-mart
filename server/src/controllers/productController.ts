import { RequestHandler } from 'express';
import { DI } from '../app';
import { asyncHandler } from '../utils/routeHandler';

export const getProducts: RequestHandler = asyncHandler(async function (
  _req,
  res
) {
  const mobiles = await DI.mobileRepository.findAll();
  await DI.em.populate(mobiles, ['reviews', 'reviews.user']);
  return res.json(mobiles);
});

export const getSingleProduct: RequestHandler = asyncHandler(async function (
  req,
  res,
  next
) {
  const mobile = await DI.mobileRepository.findOne({
    id: req.params.productId,
  });
  if (mobile) {
    await DI.em.populate(mobile, ['reviews', 'reviews.user']);
    return res.json(mobile);
  }
  return next();
});
