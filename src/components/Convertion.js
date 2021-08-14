import React, { useEffect, useState } from "react";
import ConvertionRow from "./ConvertionRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

export default function Convertion(props) {
  const { unitName, unitAPI } = props;

  const [unitOptions, setUnitOptions] = useState([]);
  const [fromUnit, setFromUnit] = useState();
  const [toUnit, setToUnit] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromUnit, setAmountInFromUnit] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromUnit) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(unitAPI)
      .then((res) => res.json())
      .then((data) => {
        const firstUnit = Object.keys(data.rates)[0];
        setUnitOptions([data.base, ...Object.keys(data.rates)]);
        setFromUnit(data.base);
        setToUnit(firstUnit);
        setExchangeRate(data.rates[firstUnit]);
      });
  }, []);

  useEffect(() => {
    if (fromUnit != null && toUnit != null) {
      fetch(`${unitAPI}?base=${fromUnit}&symbols=${toUnit}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toUnit]));
    }
  }, [fromUnit, toUnit]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromUnit(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromUnit(false);
  }

  return (
    <div>
      <h2>Convert {unitName}</h2>
      <ConvertionRow
        unitOptions={unitOptions}
        selectedUnit={fromUnit}
        onChangeUnit={(e) => setFromUnit(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <FontAwesomeIcon icon={faArrowsAltH} />
      <ConvertionRow
        unitOptions={unitOptions}
        selectedUnit={toUnit}
        onChangeUnit={(e) => setToUnit(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}
