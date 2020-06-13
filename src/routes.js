import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApplicationContext from "./context/ApplicationContext";
import LandingPage from "./pages/LandingPage";
import CallbackPage from "./pages/CallbackPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import HashtagPage from "./pages/HashtagPage";
import FilterByLocation from "./pages/FilterByLocation";

const ProtectedRoute = ({ component: Component }) => {
  const { userDetails } = useContext(ApplicationContext);
  if (!userDetails) {
    Navigate({ to: "/" });
  }
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Component />
      </div>
    </>
  );
};

const RoutesComponent = () => {
  return (
    <div className="page-container">
      <Suspense fallback={<div>Loading Application!</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route
            path="/Home"
            element={<ProtectedRoute component={HomePage} />}
          />
          <Route
            path="/searchByHashtag"
            element={<ProtectedRoute component={HashtagPage} />}
          />
          <Route
            path="/filterByLocation"
            element={<ProtectedRoute component={FilterByLocation} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RoutesComponent;
