import React from "react";
import "../trendingFlagStyles.css";

const TrendingFlag = ({ text }) => {
  return (
    <div className="trending-flag-container">
      <span className="trending-flag">{text || "Trending Now"}</span>
    </div>
  );
};

export default TrendingFlag;
