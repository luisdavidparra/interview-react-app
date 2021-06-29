import "./AverageCircle.css";
import React from "react";
import { useDataContext } from "../contexts/DataContext";
import { useState } from "react/cjs/react.development";

const AverageCircle = ({ totalAverage }) => {
  const valueData = 440 - (440 * totalAverage) / 100;

  return (
    <>
      <div className="align-items-center d-flex justify-content-center" style={{ width: "150px", height: "150px" }}>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: valueData }}></circle>
        </svg>
        <div>
          <span className="text-center p-0" style={{ fontSize: "40px", fontWeight: "bold" }}>
            {totalAverage.toFixed(0)}%
          </span>
          <span className="text-center d-block">Total</span>
        </div>
      </div>
    </>
  );
};

export default AverageCircle;
