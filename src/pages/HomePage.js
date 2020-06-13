import React, { useState, useEffect } from "react";
import { CircularProgress, Button } from "@material-ui/core";

import { getTweets } from "../utils/network";
import "../styles/HomePage.scss";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const retrieveTweets = async () => {
      const tweetsResponse = await getTweets();
      setTweets(tweetsResponse);
      setLoading(false);
    };

    retrieveTweets();
  }, []);
  return (
    <div className="home-page">
      <h2 className="home-title">Home Page!</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="tweets-container">
          {tweets.map((tweet) => {
            const time = new Date(tweet.created_at);
            return (
              <div className="tweet-item" key={tweet.id}>
                <div className="author-details">
                  {tweet.user.name} - @{tweet.user.screen_name}
                </div>
                <div className="tweet-content">{tweet.full_text}</div>
                <div className="tweet-time">
                  {`Posted at ${time.getHours()}:${time.getMinutes()}`}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Button className="reload-tweets" variant="contained" color="primary">
        Reload Tweets
      </Button>
    </div>
  );
};

export default HomePage;
