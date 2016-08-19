import get from '../lib/shopify-client';

export default function loadProducts(req) {
  return get(
    req.query.shop,
    req.query.accessToken, // TODO: move this to middleware
    '/products.json',
    'fields=id,image,title,variants'
  )
  .then(({products}) => products)
  .catch((err) => {
    console.error(err, 'Error loading products');
    throw err;
  });
}
