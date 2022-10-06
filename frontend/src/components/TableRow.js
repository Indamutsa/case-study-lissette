import React from "react";
import "../styles/tableRow.css";

const TableRow = ({ item }) => {
  return (
    <div className="rowItem">
      <p>{item.itemName}</p>

      <div className="checkboxes">
        <input
          className="checkInput"
          type="checkbox"
          id="prelevant"
          name="prelevant"
        />
        <input
          className="checkInput"
          type="checkbox"
          id="pobvious"
          name="pobvious"
        />
        <input
          className="checkInput"
          type="checkbox"
          id="predundant"
          name="predundant"
        />
        <input
          className="checkInput"
          type="checkbox"
          id="pcontext"
          name="pcontext"
        />
        <input
          className="checkInput"
          type="checkbox"
          id="pspecific"
          name="pspecific"
        />
      </div>
    </div>
  );
};

export default TableRow;
