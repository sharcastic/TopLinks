import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Navigate } from "react-router-dom";

const CallbackPage = () => {
  useEffect(() => {
    const { searchParams } = new URL(window.location);
    const oauth_token = searchParams.get("oauth_token");
    const oauth_verifier = searchParams.get("oauth_verifier");
    if (oauth_token && oauth_verifier) {
      window.opener.postMessage(
        {
          type: "authenticated",
          data: { oauth_token, oauth_verifier },
        },
        window.origin
      );
      window.close();
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
      }}
    >
      <CircularProgress />
      <div>Authenticating User!</div>
    </div>
  );
};

export default CallbackPage;
