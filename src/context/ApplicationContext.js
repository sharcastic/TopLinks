import { createContext } from "react";

const ApplicationContext = createContext({
  userDetails: undefined,
  setUserInfo: undefined,
});

export default ApplicationContext;
