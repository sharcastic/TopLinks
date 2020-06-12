import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

import { popupWindow, observeWindow } from "../utils/commonMethods";
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";

import "../styles/LandingPage.scss";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onPopupClosed = () => {
    setLoading(false);
  };

  const onSignInClick = () => {
    setLoading(true);
    setStatus("Waiting for user authentication");
    const popup = popupWindow(
      `/callback?oauth_token=token&oauth_verifier=verified`,
      "Twitter Sign In!"
    );
    observeWindow(popup, onPopupClosed);
    window.onmessage = async ({ data: { type, data } }) => {
      if (type === "authenticated") {
        console.log(data);
      }
    };
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
