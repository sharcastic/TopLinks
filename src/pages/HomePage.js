import React, { useState, useEffect, useContext } from "react";
import { CircularProgress, Button } from "@material-ui/core";

import ApplicationContext from "../context/ApplicationContext";
import TweetComponent from "../components/TweetComponent/TweetComponent";
import "../styles/HomePage.scss";

const HomePage = () => {
  const { tweets, loadingTweets } = useContext(ApplicationContext);

  return (
    <div className="home-page">
      <h2 className="home-title">Home Page!</h2>
      {loadingTweets ? (
        <CircularProgress />
      ) : (
        <div className="tweets-container">
          {tweets.map((tweet) => (
            <TweetComponent key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
      <Button className="reload-tweets" variant="contained" color="primary">
        Reload Tweets
      </Button>
    </div>
  );
};

export default HomePage;
