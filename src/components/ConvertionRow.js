import React from "react";

export default function ConvertionRow(props) {
  const { unitOptions, selectedUnit, onChangeUnit, onChangeAmount, amount } =
    props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedUnit} onChange={onChangeUnit}>
        {unitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
