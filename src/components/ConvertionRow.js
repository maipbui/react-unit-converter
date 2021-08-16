import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ConvertionRow(props) {
  const { unitOptions, selectedUnit, onChangeUnit, onChangeAmount, amount } =
    props;
  return (
    <div>
      <Form.Control
        type="number"
        className="mb-3"
        min="0"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        value={selectedUnit}
        onChange={onChangeUnit}
        style={{
          padding: "6px 12px",
          border: "1px solid #ced4da",
          borderRadius: "0.25rem",
          fontSize: "1rem",
          width: "100%",
          lineHeight: "1.5",
          font: "400 Arial",
        }}
      >
        {unitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
