import React from "react";
import Category from "./components/Category";
import Convertion from "./components/Convertion";
import { Container, Row } from "react-grid-system";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import unitConfig from "./config.json";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

library.add(fas);

function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <Row
            style={{
              marginTop: "70px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {unitConfig.map((unit) => (
              <Category
                key={unit.id}
                unitIcon={unit.icon}
                unitName={unit.name}
                unitPath={unit.path}
              ></Category>
            ))}
          </Row>
          <Footer />
        </Route>
        {unitConfig.map((unit) => (
          <Route
            key={unit.id}
            path={"/" + unit.path}
            render={() => {
              return (
                <Convertion
                  key={unit.id}
                  unitName={unit.name}
                  json_file={unit.json_path}
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
