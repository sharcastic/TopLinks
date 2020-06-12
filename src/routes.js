import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

const ProtectedRoute = ({ component: Component }) => {
  Navigate({ to: "/" });

  return null;
};

const RoutesComponent = () => {
  return (
    <div className="page-container">
      <Suspense fallback={<div>Loading Application!</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/callback"
            element={<ProtectedRoute component={<div>Callback page!</div>} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RoutesComponent;
