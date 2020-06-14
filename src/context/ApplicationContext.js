import { createContext } from "react";

const ApplicationContext = createContext({
  userDetails: undefined,
  setUserInfo: undefined,
  tweets: undefined,
  retrieveTweets: undefined,
  loadingTweets: undefined,
  report: undefined,
  error: undefined,
  signOut: undefined,
});

export default ApplicationContext;
