import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ApplicationContextProvider from "./context/ApplicationContextProvider";
import Routes from "./routes";

import "./styles/normalize.scss";
import "./styles/index.scss";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <Router>
        <Routes />
      </Router>
    </ApplicationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
