import { enc, HmacSHA1 } from "crypto-js";

import {
  CONSUMER_KEY,
  SIGNATURE_METHOD,
  OAUTH_VERSION,
  CONSUMER_SECRET,
  REQUEST_TOKEN_URL,
  ACCESS_TOKEN_URL,
} from "./constants";

export const observeWindow = (popup, onClose) => {
  const intervalId = setInterval(() => {
    if (popup.closed) {
      clearInterval(intervalId);
      onClose();
    }
  }, 100);
};

export const popupWindow = (url, title, w = 400, h = 500) => {
  var left = window.screen.width / 2 - w / 2;
  var top = window.screen.height / 2 - h / 2;
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  );
};

const dec2hex = (dec) => ("0" + dec.toString(16)).substr(-2);

const generateNonce = (len) => {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};

const makeSignature = (params, link, consumer_secret, method = "POST") => {
  const paramsBaseString = Object.keys(params)
    .sort()
    .reduce((acc, i) => {
      return (acc += `&${i}=${params[i]}`);
    }, "")
    .substr(1);

  const signatureBaseString = `${method}&${encodeURIComponent(
    link
  )}&${encodeURIComponent(paramsBaseString)}`;

  const signingKey = `${encodeURIComponent(consumer_secret)}&`;

  const oauth_signature = enc.Base64.stringify(
    HmacSHA1(signatureBaseString, signingKey)
  );

  const paramsWithSignature = {
    ...params,
    oauth_signature: encodeURIComponent(oauth_signature),
  };

  return Object.keys(paramsWithSignature)
    .sort()
    .reduce((acc, i) => {
      return (acc += `,${i}="${paramsWithSignature[i]}"`);
    }, "")
    .substr(1);
};

const prepareParamsForOAuthRequest = () => ({
  oauth_consumer_key: CONSUMER_KEY,
  oauth_version: OAUTH_VERSION,
  oauth_signature_method: SIGNATURE_METHOD,
  oauth_callback: `${new URL(window.location).href}callback`,
  oauth_timestamp: (Date.now() / 1000).toFixed(),
  oauth_nonce: generateNonce(32),
});

const prepareParams = (tokenType, oauth_token = "", oauth_verifier = "") => ({
  oauth_consumer_key: CONSUMER_KEY,
  oauth_version: OAUTH_VERSION,
  oauth_signature_method: SIGNATURE_METHOD,
  oauth_timestamp: (Date.now() / 1000).toFixed(),
  oauth_nonce: generateNonce(32),
  ...(tokenType === "request" && {
    oauth_callback: `${new URL(window.location).href}callback`,
  }),
  ...(tokenType === "access" && {
    oauth_token,
    oauth_verifier,
  }),
});

export const getRequestTokenSignature = () =>
  makeSignature(prepareParams("request"), REQUEST_TOKEN_URL, CONSUMER_SECRET);

export const getAccessTokenSignature = (oauth_token, oauth_verifier) =>
  makeSignature(
    prepareParams("access", oauth_token, oauth_verifier),
    ACCESS_TOKEN_URL,
    CONSUMER_SECRET
  );

export const processTokenResponse = (text) =>
  text.split("&").reduce((acc, i) => {
    const [key, value] = i.split("=");
    return { ...acc, [key]: value };
  }, {});
