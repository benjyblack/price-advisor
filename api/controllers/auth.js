import express from 'express';
import config from '../../src/config';
import shopifyClient from '../lib/shopify-client';
import Shop from '../models/shop';

const authRouter = express.Router();

// mounted at /api/auth

authRouter.get('/', (req, res) => res.redirect(301, shopifyClient.buildAuthUrl(req.query.shop)));

// TODO: Huge security vulnerability, only for testing
authRouter.get('/accessToken', (req, res) =>
  Shop
    .getAccessToken(req.query.shopName)
    .then(accessToken => { res.send(accessToken).end()})
    .catch((err) => {
      console.error(err);
    })
);

authRouter.get('/callback', (req, res) => {
  const name = Shop.parseName(req.query.shop);
  const code = req.query.code;
  // TODO: Check security features (Step 3) https://help.shopify.com/api/guides/authentication/oauth
  return shopifyClient.requestAccessToken(name, code).then((response) =>
    Shop.findOneAndUpsert({ name }, {
      accessToken: response['access_token'],
      scope: response.scope,
      name
    })
  ).then(() => {
    console.log('Shop updated');
    res.status(200).end();
  }).catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

export default authRouter;