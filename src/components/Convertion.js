import React, { useEffect, useState } from "react";
import ConvertionRow from "./ConvertionRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";
import { Row, Col } from "react-grid-system";

export default function Convertion(props) {
  const { json_file } = props;

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
    fetch(json_file)
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
    if (fromUnit != null && toUnit != null && fromUnit !== toUnit) {
      fetch(`${json_file}?base=${fromUnit}&symbols=${toUnit}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toUnit]));
    } else if (fromUnit != null && toUnit != null && fromUnit === toUnit) {
      fetch(`${json_file}?base=${fromUnit}&symbols=${toUnit}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(1));
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
      <Navigation />
      <Row
        style={{
          marginTop: "70px",
        }}
      >
        <Col>
          <ConvertionRow
            unitOptions={unitOptions}
            selectedUnit={fromUnit}
            onChangeUnit={(e) => setFromUnit(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon icon={faArrowsAltH} style={{ fontSize: "4em" }} />
        </Col>
        <Col>
          <ConvertionRow
            unitOptions={unitOptions}
            selectedUnit={toUnit}
            onChangeUnit={(e) => setToUnit(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </Col>
      </Row>
    </div>
  );
}
