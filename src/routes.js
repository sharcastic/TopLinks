import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CallbackPage from "./pages/CallbackPage";

const ProtectedRoute = ({ component: Component }) => {
  // Navigate({ to: "/" });

  return <Component />;
};

const RoutesComponent = () => {
  return (
    <div className="page-container">
      <Suspense fallback={<div>Loading Application!</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/callback"
            // element={<ProtectedRoute component={<CallbackPage />} />}
            element={<CallbackPage />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RoutesComponent;
