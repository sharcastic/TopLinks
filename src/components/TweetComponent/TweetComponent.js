import React from "react";

import "./TweetComponent.scss";

const TweetComponent = ({ tweet }) => {
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
};

export default TweetComponent;
