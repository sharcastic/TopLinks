export const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
export const OAUTH_VERSION = "1.0";
export const SIGNATURE_METHOD = "HMAC-SHA1";
export const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
export const REQUEST_TOKEN_URL = "https://api.twitter.com/oauth/request_token";
export const ACCESS_TOKEN_URL = "https://api.twitter.com/oauth/access_token";
export const CORS_BYPASS_URL = "https://cors-anywhere.herokuapp.com";
export const AUTHENTICATE_URL = "https://api.twitter.com/oauth/authenticate";
export const MAPTILER_ACCESS_TOKEN = "gXK2HB9wNMgCu6e0Nv71";
export const MAP_ID = "basic";

export const navbarItems = [
  { title: "Home", link: "/Home" },
  { title: "Search Tweets By Hashtag", link: "/searchByHashtag" },
  { title: "Filter Tweets By Location", link: "/filterByLocation" },
  { title: "View Report", link: "/report" },
];
