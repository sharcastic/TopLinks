import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

import { popupWindow, observeWindow } from "../utils/commonMethods";
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import "../styles/LandingPage.scss";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    const popup = popupWindow("https://google.com", "Twitter Sign In!");
    observeWindow(popup, () => setLoading(false));
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
    </div>
  );
};

export default LandingPage;
