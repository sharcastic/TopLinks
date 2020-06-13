import { createContext } from "react";

const ApplicationContext = createContext({
  userDetails: undefined,
  setUserInfo: undefined,
  tweets: undefined,
  setTweets: undefined,
  loadingTweets: undefined,
  report: undefined,
});

export default ApplicationContext;
