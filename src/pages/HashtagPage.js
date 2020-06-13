import React, { useContext, useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";

import ApplicationContext from "../context/ApplicationContext";
import TweetComponent from "../components/TweetComponent/TweetComponent";

import "../styles/HashtagPage.scss";

const HashtagPage = () => {
  const { tweets, loadingTweets } = useContext(ApplicationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [allHashtags, setAllHashtags] = useState([]);
  const [resultHashtags, setHashtags] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onHashtagResultClick = (e) => {
    setSelectedHashtag(e.currentTarget.textContent);
    const clickedHashtag = e.currentTarget.textContent.substr(1).toLowerCase();
    setFilteredTweets(
      tweets.filter(({ entities: { hashtags } }) => {
        if (hashtags.length === 0) {
          return false;
        }
        if (
          hashtags.findIndex((i) => i.text.toLowerCase() === clickedHashtag) >
          -1
        ) {
          return true;
        }
        return false;
      })
    );
  };

  useEffect(() => {
    if (!searchTerm) {
      setHashtags(allHashtags);
    } else {
      setHashtags(
        allHashtags.filter((i) => i.toLowerCase().indexOf(searchTerm) > -1)
      );
    }
  }, [allHashtags, searchTerm]);

  useEffect(() => {
    setAllHashtags(
      tweets
        .reduce(
          (acc, { entities: { hashtags } }) =>
            hashtags.length > 0
              ? [...acc, ...hashtags.map((i) => i.text)]
              : acc,
          []
        )
        .sort()
    );
  }, [tweets]);

  if (loadingTweets) {
    return <div>Loading Tweets!</div>;
  }

  return (
    <div className="hashtag-page">
      <div className="hashtag-search">
        <div className="hashtag-search-title">Search Hashtags</div>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Hashtag</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={searchTerm}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">#</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <div className="search-subtitle">
          {searchTerm ? "Matching Hashtags" : "All Hashtags"}
        </div>
        <ul className="hashtag-search-results">
          {resultHashtags.length === 0 ? (
            <div>No matching hashtags!</div>
          ) : (
            resultHashtags.map((i) => (
              <li
                key={i}
                className="hashtag-item"
                onClick={onHashtagResultClick}
              >
                #{i}
              </li>
            ))
          )}
        </ul>
      </div>
      {filteredTweets.length > 0 ? (
        <div className="hashtag-tweets">
          <div className="hashtag-results-title">
            Tweets containing {selectedHashtag}
          </div>
          <div className="result-tweets">
            {filteredTweets.map((tweet) => (
              <TweetComponent key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      ) : (
        <div className="hashtag-tweets">
          <div>Select a hashtag to show tweets containing that hashtag!</div>
        </div>
      )}
    </div>
  );
};

export default HashtagPage;
