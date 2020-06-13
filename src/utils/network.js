import {
  CORS_BYPASS_URL,
  REQUEST_TOKEN_URL,
  ACCESS_TOKEN_URL,
  mockTweets,
} from "../utils/constants";
import {
  getRequestTokenSignature,
  processTokenResponse,
  getAccessTokenSignature,
} from "./commonMethods";

export const getRequestToken = async () => {
  const signature = getRequestTokenSignature();
  try {
    const requestTokenResponse = await fetch(
      `${CORS_BYPASS_URL}/${REQUEST_TOKEN_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: "OAuth " + signature,
        },
      }
    ).then((res) => res.text());
    return processTokenResponse(requestTokenResponse);
  } catch (err) {
    throw err;
  }
};

export const getAccessToken = async (oauth_token, oauth_verifier) => {
  const signature = getAccessTokenSignature(oauth_token, oauth_verifier);
  try {
    const accessTokenResponse = await fetch(
      `${CORS_BYPASS_URL}/${ACCESS_TOKEN_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: "OAuth " + signature,
        },
      }
    ).then((res) => res.text());
    return processTokenResponse(accessTokenResponse);
  } catch (err) {
    throw err;
  }
};

export const getTweets = async () => {
  const tweets = await new Promise((resolve) => resolve(mockTweets));
  return tweets;
};
