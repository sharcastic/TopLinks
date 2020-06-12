import React, { useState, useContext } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { popupWindow, observeWindow } from "../utils/commonMethods";
import { AUTHENTICATE_URL } from "../utils/constants";
import { getRequestToken } from "../utils/network";
import ApplicationContext from "../context/ApplicationContext";
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";

import "../styles/LandingPage.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  const { userDetails, setUserInfo } = useContext(ApplicationContext);
  debugger;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onPopupClosed = () => {
    setLoading(false);
  };

  const onSignInClick = async () => {
    if (userDetails) {
      navigate("/home");
    } else {
      setLoading(true);
      setStatus("Requesting Token from Twitter!");
      try {
        const requestTokenData = await getRequestToken();
        if (requestTokenData.oauth_callback_confirmed) {
          setStatus("Waiting for user authentication");
          const popup = popupWindow(
            `${AUTHENTICATE_URL}?oauth_token=${requestTokenData.oauth_token}`,
            "Twitter Sign In!"
          );
          observeWindow(popup, onPopupClosed);
          window.onmessage = async ({ data: { type, data } }) => {
            if (type === "authenticated") {
              console.log(data);
              setUserInfo(data);
            }
          };
        }
      } catch (err) {
        console.log(err);
        setStatus(
          "Some Error occurred during RequestToken process, Please try again!"
        );
        setLoading(false);
      }
    }
  };
  return (
    <div className="landing-page">
      <h1 className="title">TopLinks App!</h1>
      <Button
        variant="contained"
        color="primary"
        className="signin-button"
        onClick={onSignInClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TwitterIcon className="twitter-icon" />
            <span>Sign In</span>
          </>
        )}
      </Button>
      <div>{status}</div>
    </div>
  );
};

export default LandingPage;
