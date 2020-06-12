import React, { useState } from "react";

import ApplicationContext from "./ApplicationContext";

const ApplicationContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(sessionStorage.getItem("topLinkUserDetails"))
  );

  const setUserInfo = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("topLinkUserDetails", JSON.stringify(data));
  };
  return (
    <ApplicationContext.Provider value={{ userDetails, setUserInfo }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
