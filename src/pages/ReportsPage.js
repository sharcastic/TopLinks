import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "react-chartkick";

import ApplicationContext from "../context/ApplicationContext";

import "chart.js";
import "../styles/ReportsPage.scss";

const ReportsPage = () => {
  const {
    report: [userReport, websiteReport],
  } = useContext(ApplicationContext);
  return (
    <div className="reports-page">
      <div className="reports-title">Reports page</div>
      <div className="reports-container">
        <div className="reports-display">
          <div className="reports-subtitle">Show Report here!</div>
          {userReport && websiteReport && (
            <>
              <div className="chart">
                <BarChart data={userReport} />
              </div>
              <div className="chart">
                <BarChart data={websiteReport} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
