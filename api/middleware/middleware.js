import Shop from '../models/shop';

export default function getAccessToken(req, res, next) {
  const shopName = Shop.parseName(req.query.shop);

  return Shop.getAccessToken(shopName).then((accessToken) => {
    req.accessToken = accessToken;
    return next();
  }).catch((err) => {
    console.error(err, `Error getting access token for ${shopName}`);
  });
}