import express from 'express';
import { get } from '../lib/shopify-client';

const productsRouter = express.Router();

// mounted at /api/products

productsRouter.get('/', (req, res, next) => {
  const { shop, accessToken } = req.query;

  if (!shop || !accessToken) {
    throw new Error('shop and accessToken query parameters are required');
  }

  return get(
    req.query.shop,
    req.query.accessToken,
    '/products.json',
    'fields=id,image,title,variants'
  )
  .then((products) => res.send(products).end())
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

export default productsRouter;