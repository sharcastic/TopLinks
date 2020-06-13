import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "react-chartkick";

import ApplicationContext from "../context/ApplicationContext";

import "chart.js";
import "../styles/ReportsPage.scss";

const ReportsPage = () => {
  const { tweets } = useContext(ApplicationContext);
  const [selectedReport, setSelectedReport] = useState();
  const [userReport, setUserReport] = useState();
  const [websiteReport, setWebsiteReport] = useState();

  const onReportClick = () => {
    setSelectedReport(1);
  };

  useEffect(() => {
    const arr = tweets
      .filter(({ entities: { urls } }) => urls.length > 0)
      .map(({ entities, user }) => ({
        urls: entities.urls.map((i) => i.expanded_url),
        user,
      }));
    const userReport = Array.from(
      arr.reduce((map, { user: { screen_name } }) => {
        map.set(screen_name, (map.get(screen_name) || 0) + 1);
        return map;
      }, new Map())
    ).sort(([, val1], [, val2]) => val2 - val1);
    const websiteReport = Array.from(
      arr.reduce((map, { urls }) => {
        urls.forEach((url) => {
          const { host } = new URL(url);
          map.set(host, (map.get(host) || 0) + 1);
        });
        return map;
      }, new Map())
    ).sort(([, val1], [, val2]) => val2 - val1);
    setUserReport(userReport);
    setWebsiteReport(websiteReport);
  }, [tweets]);
  return (
    <div className="reports-page">
      <div className="reports-title">Reports page</div>
      <div className="reports-container">
        <div className="reports-selector">
          <div className="reports-subtitle">Show All Reports!</div>
          <ul className="reports-list">
            <li className="report-item">
              <div onClick={onReportClick}>
                <span>Report 1</span>
                <span>Created at 27th June 11:02</span>
              </div>
            </li>
          </ul>
        </div>
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
