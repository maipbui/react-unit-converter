import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "./components/Category";
import Convertion from "./components/Convertion";
import { Container, Row } from "react-grid-system";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  faUnderline,
  faRulerHorizontal,
  faDollarSign,
  faTachometerAlt,
  faClock,
  faMap,
  faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";
import unitConfig from "./config.json";

library.add(
  fas,
  faRulerHorizontal,
  faDollarSign,
  faTachometerAlt,
  faClock,
  faMap,
  faThermometerHalf
);

function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <FontAwesomeIcon icon={faUnderline} />
          <h1>Unit Converter</h1>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/">
          <Row>
            {unitConfig.map((unit) => (
              <Category
                key={unit.id}
                unitIcon={unit.icon}
                unitName={unit.name}
                unitPath={unit.path}
              ></Category>
            ))}
          </Row>
        </Route>
      </Switch>
      <Switch>
        {unitConfig.map((unit) => (
          <Route
            key={unit.id}
            path={"/" + unit.path}
            render={(props) => {
              return (
                <Convertion
                  {...props}
                  key={unit.id}
                  unitName={unit.name}
                  unitAPI={unit.url_api}
                />
              );
            }}
          />
        ))}
      </Switch>
    </Container>
  );
}

export default App;
