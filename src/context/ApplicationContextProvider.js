import React from "react";

import ApplicationContext from "./ApplicationContext";

const ApplicationContextProvider = ({ children }) => {
  return <ApplicationContext.Provider>{children}</ApplicationContext.Provider>;
};

export default ApplicationContextProvider;
