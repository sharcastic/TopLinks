import React, { useState, useEffect } from "react";

import ApplicationContext from "./ApplicationContext";
import { getTweets } from "../utils/network";

const ApplicationContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(sessionStorage.getItem("topLinkUserDetails"))
  );
  const [tweets, setTweets] = useState([]);
  const [loadingTweets, setLoadingTweets] = useState(true);

  const setUserInfo = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("topLinkUserDetails", JSON.stringify(data));
  };

  useEffect(() => {
    const retrieveTweets = async () => {
      const tweetsResponse = await getTweets(
        userDetails.screen_name,
        userDetails.oauth_token,
        userDetails.oauth_token_secret
      );
      debugger;
      setTweets(tweetsResponse);
      setLoadingTweets(false);
    };

    retrieveTweets();
  }, [userDetails]);
  return (
    <ApplicationContext.Provider
      value={{ userDetails, setUserInfo, tweets, setTweets, loadingTweets }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
