import React, { useState, useEffect, useCallback } from "react";

import ApplicationContext from "./ApplicationContext";
import { getTweets } from "../utils/network";
import { generateReport } from "../utils/commonMethods";

const ApplicationContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(sessionStorage.getItem("topLinkUserDetails"))
  );
  const [tweets, setTweets] = useState([]);
  const [report, setReport] = useState([]);
  const [loadingTweets, setLoadingTweets] = useState(false);
  const [error, setError] = useState();

  const setUserInfo = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("topLinkUserDetails", JSON.stringify(data));
  };

  const retrieveTweets = useCallback(async () => {
    setLoadingTweets(true);
    try {
      return getTweets(
        userDetails.screen_name,
        userDetails.oauth_token,
        userDetails.oauth_token_secret
      ).then((tweetsResponse) => {
        setTweets(tweetsResponse);
        setReport(generateReport(tweetsResponse));
        setLoadingTweets(false);
        setError();
      });
    } catch (err) {
      console.log(err);
      setError("Error occurred while loading Tweets! Try again later!");
      setLoadingTweets(false);
    }
  }, [userDetails]);

  const signOut = () =>
    new Promise((resolve) => {
      sessionStorage.removeItem("topLinkUserDetails");
      setUserDetails();
      resolve();
    });

  useEffect(() => {
    retrieveTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);
  return (
    <ApplicationContext.Provider
      value={{
        userDetails,
        setUserInfo,
        tweets,
        retrieveTweets,
        loadingTweets,
        report,
        error,
        signOut,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
