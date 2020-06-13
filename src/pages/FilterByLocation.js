import React, { useState, useContext, useEffect } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import { Button } from "@material-ui/core";

import ApplicationContext from "../context/ApplicationContext";
import { getRandomCoordinates } from "../utils/commonMethods";
import TweetComponent from "../components/TweetComponent/TweetComponent";

import "../styles/FilterByLocation.scss";

const FilterByLocation = () => {
  const { tweets } = useContext(ApplicationContext);
  const [localTweets, setLocalTweets] = useState(tweets);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([50.879, 4.6997]);
  const [bounds, setBounds] = useState();
  const [filteredTweets, setFilteredTweets] = useState(localTweets);

  const handleBoundsChange = ({ center, zoom, bounds, initial }) => {
    console.log("New bounds", bounds);
    if (initial) {
      console.log("Got initial bounds: ", bounds);
    }
    setZoom(zoom);
    setCenter(center);
    setBounds(bounds);
  };

  const assignCoordinates = () => {
    setLocalTweets(
      localTweets.map((tweet) => {
        if (tweet.coordinates) {
          return tweet;
        }
        return {
          ...tweet,
          coordinates: {
            type: "Point",
            coordinates: [
              getRandomCoordinates(-50, 70),
              getRandomCoordinates(-130, 150),
            ],
          },
        };
      })
    );
  };

  useEffect(() => {
    // setLocalTweets(tweets.slice(0, 5));
    setLocalTweets(tweets);
  }, [tweets]);

  useEffect(() => {
    if (bounds) {
      const {
        ne: [north, east],
        sw: [south, west],
      } = bounds;
      setFilteredTweets(
        localTweets.filter(({ coordinates }) => {
          if (!coordinates) {
            return false;
          }
          const [lat, long] = coordinates.coordinates;
          if (lat > south && lat < north && long > west && long < east) {
            return true;
          }
          return false;
        })
      );
      /* const arr = localTweets.filter(({ coordinates }) => {
        if (!coordinates) {
          return false;
        }
        const [lat, long] = coordinates.coordinates;
        if (lat > south && lat < north && long > west && long < east) {
          return true;
        }
        return false;
      });
      console.log(
        arr.map(({ id, coordinates }) => ({
          id,
          coordinates,
        }))
      ); */
    }
  }, [bounds, localTweets]);

  return (
    <div className="filter-page">
      <div className="page-header">Filter by Location</div>
      <div className="filter-page-content">
        <div className="map-container">
          <Map
            center={center}
            zoom={zoom}
            limitBounds="edge"
            // provider={mapTilerProvider}
            mouseEvents={true}
            animate={true}
            onBoundsChanged={handleBoundsChange}
            zoomSnap={true}
            minZoom={1}
            maxZoom={16}
            defaultWidth={600}
            height={500}
          >
            {localTweets
              .filter((tweet) => tweet.coordinates)
              .map(({ id, coordinates: { coordinates } }) => (
                <Marker anchor={coordinates} key={id} />
              ))}
          </Map>
          <div className="info">
            <div>
              Most of the tweets do not have set coordinates. To test this
              feature, click on the button below to assign random coordinates to
              all the tweets which don't have a location set. Once assigned,
              location cant be changed unless you reload the page.
            </div>
            <Button
              variant="outlined"
              color="primary"
              className="button"
              onClick={assignCoordinates}
            >
              Assign random coordinates
            </Button>
          </div>
        </div>
        <div className="filtered-tweets-container">
          <div className="filtered-tweets-header">
            Tweets from the visible part of the Map
          </div>
          <div className="filtered-tweets">
            {filteredTweets.length > 0 ? (
              filteredTweets.map((tweet) => (
                <TweetComponent key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div>No tweets in this region! </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByLocation;
