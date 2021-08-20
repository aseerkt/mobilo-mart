import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { DI } from '../app';

export const getProducts: RequestHandler = expressAsyncHandler(async function (
  _req,
  res
) {
  const mobiles = await DI.mobileRepository.findAll();
  return res.json(mobiles);
});

export const getSingleProduct: RequestHandler = expressAsyncHandler(
  async function (req, res) {
    const mobile = await DI.mobileRepository.findOne({
      id: req.params.productId,
    });
    return res.json(mobile);
  }
);
