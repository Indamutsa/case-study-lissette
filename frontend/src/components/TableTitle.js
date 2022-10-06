import React from "react";
import "../styles/tableTitle.css";

const TableTitle = ({ title }) => {
  return (
    <div className="tableTitle">
      <ul>
        <li>{title}</li>
        <li>Correct</li>
        <li>Obvious</li>
        <li>Redundant</li>
        <li>Contextualized</li>
        <li>Generalizable</li>
      </ul>
    </div>
  );
};

export default TableTitle;
