import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Navigate } from "react-router-dom";

import { getAccessToken } from "../utils/network";

const CallbackPage = () => {
  useEffect(() => {
    const { searchParams } = new URL(window.location);
    const oauth_token = searchParams.get("oauth_token");
    const oauth_verifier = searchParams.get("oauth_verifier");
    const accessTokenProcessing = async (token, verifier) => {
      const accessTokenData = await getAccessToken(token, verifier);
      window.opener.postMessage(
        {
          type: "authenticated",
          data: accessTokenData,
        },
        window.origin
      );
      window.close();
    };
    if (oauth_token && oauth_verifier) {
      accessTokenProcessing(oauth_token, oauth_verifier);
    } else {
      Navigate("/");
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <div style={{ marginTop: "10px" }}>Authenticating User!</div>
    </div>
  );
};

export default CallbackPage;
