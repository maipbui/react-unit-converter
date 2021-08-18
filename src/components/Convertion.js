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
  const [exchangeRateFrom, setExchangeRateFrom] = useState();
  const [exchangeRateTo, setExchangeRateTo] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromUnit, setAmountInFromUnit] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromUnit) {
    fromAmount = amount;
    toAmount = (amount * exchangeRateTo) / exchangeRateFrom || 0;
  } else {
    toAmount = amount;
    fromAmount = (amount * exchangeRateFrom) / exchangeRateTo;
  }

  useEffect(() => {
    fetch(json_file)
      .then((res) => res.json())
      .then((data) => {
        const firstUnit = Object.keys(data.rates)[0];
        setUnitOptions([data.base, ...Object.keys(data.rates)]);
        setFromUnit(data.base);
        setToUnit(firstUnit);
        setExchangeRateFrom(1);
        setExchangeRateTo(data.rates[firstUnit]);
      });
  }, []);

  useEffect(() => {
    fetch(json_file)
      .then((res) => res.json())
      .then((data) => {
        if (fromUnit === toUnit && fromUnit != null) {
          setExchangeRateFrom(1);
          setExchangeRateTo(1);
        } else if (fromUnit != null && toUnit != null) {
          if (fromUnit === data.base) {
            fetch(`${json_file}?base=${fromUnit}&symbols=${toUnit}`)
              .then((res) => res.json())
              .then((data) => {
                setExchangeRateFrom(1);
                setExchangeRateTo(data.rates[toUnit]);
              });
          } else if (toUnit === data.base) {
            fetch(`${json_file}?base=${fromUnit}&symbols=${toUnit}`)
              .then((res) => res.json())
              .then((data) => {
                setExchangeRateTo(1);
                setExchangeRateFrom(data.rates[fromUnit]);
              });
          } else {
            fetch(`${json_file}?base=${fromUnit}&symbols=${toUnit}`)
              .then((res) => res.json())
              .then((data) => {
                setExchangeRateFrom(data.rates[fromUnit]);
                setExchangeRateTo(data.rates[toUnit]);
              });
          }
        }
      });
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
