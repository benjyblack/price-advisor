import spp from 'superagent-promise-plugin';
import superagent from 'superagent';
import config from '../../src/config';
import nonceGenerator from 'nonce';

const request = spp.patch(superagent);
const n = nonceGenerator();

const CALLBACK_URI = `http://${config.apiHost}:${config.apiPort}/api/v1/auth/callback`;

export function buildShopUrl(shopName) { return `https://${shopName}.myshopify.com` };

export function buildAuthUrl(shopName) {
  const nonce = n();

  return `${buildShopUrl(shopName)}/admin/oauth/` +
  `authorize?client_id=${config.shopify.apiKey}` +
  `&scope=${config.shopify.scope}&redirect_uri=${CALLBACK_URI}` +
  `&state=${nonce}`;
};

export function buildAuthenticatedHeaders(accessToken) { return { 'X-Shopify-Access-Token': accessToken } };

export function requestAccessToken(shopName, code) {
  return request
    .post(`${buildShopUrl(shopName)}/admin/oauth/access_token`)
    .send({
      client_id: config.shopify.apiKey,
      client_secret: config.shopify.apiSecret,
      code
    });
};

export function get(shopName, accessToken, resourcePath, options) {
  return request
    .get(`${buildShopUrl(shopName)}/admin/${resourcePath}?${options}`)
    .set('X-Shopify-Access-Token', accessToken)
    .then((res) => res.body);
}