import React, { useContext } from "react";
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
      <h2 className="reports-title">Reports page</h2>
      <div className="reports-container">
        <div className="reports-display">
          {userReport && websiteReport && (
            <>
              <div className="chart">
                <h4 className="reports-subtitle">
                  User sharing the most URLs in their tweets
                </h4>
                <BarChart data={userReport} />
              </div>
              <div className="chart">
                <h4 className="reports-subtitle">
                  Website URLs shared via Tweets
                </h4>
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
