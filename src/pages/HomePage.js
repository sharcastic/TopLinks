import React, { useState, useEffect, useContext } from "react";
import { CircularProgress, Button } from "@material-ui/core";

import ApplicationContext from "../context/ApplicationContext";
import TweetComponent from "../components/TweetComponent/TweetComponent";
import "../styles/HomePage.scss";

const HomePage = () => {
  const { tweets, loadingTweets, retrieveTweets } = useContext(
    ApplicationContext
  );
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [retrieveLoading, setLoading] = useState(false);

  const onReloadClick = async () => {
    setLoading(true);
    await retrieveTweets();
    setLoading(false);
  };

  useEffect(() => {
    setFilteredTweets(
      tweets.filter(({ entities: { urls } }) => urls.length > 0)
    );
  }, [tweets]);
  return (
    <div className="home-page">
      <h2 className="home-title">Tweets containing Links!</h2>
      {loadingTweets ? (
        <CircularProgress />
      ) : (
        <div className="tweets-container">
          {filteredTweets.map((tweet) => (
            <TweetComponent key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
      <Button
        className="reload-tweets"
        variant="contained"
        color="primary"
        onClick={onReloadClick}
      >
        {retrieveLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <span>Reload Tweets</span>
        )}
      </Button>
    </div>
  );
};

export default HomePage;
