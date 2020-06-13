import React, { useState, useEffect } from "react";

import ApplicationContext from "./ApplicationContext";
import { getTweets } from "../utils/network";
import { generateReport } from "../utils/commonMethods";

const ApplicationContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(sessionStorage.getItem("topLinkUserDetails"))
  );
  const [tweets, setTweets] = useState([]);
  const [report, setReport] = useState([]);
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
      setTweets(tweetsResponse);
      setReport(generateReport(tweetsResponse));
      setLoadingTweets(false);
    };

    retrieveTweets();
  }, [userDetails]);
  return (
    <ApplicationContext.Provider
      value={{
        userDetails,
        setUserInfo,
        tweets,
        setTweets,
        loadingTweets,
        report,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
