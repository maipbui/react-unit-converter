import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-grid-system";

export default function Category(props) {
  const { unitIcon, unitName, unitPath } = props;

  let history = useHistory();

  function handleClick() {
    history.push(unitPath);
  }

  return (
    <Col className="mb-3">
      <Card>
        <Card.Title className="text-center mt-2 mb-0">
          <FontAwesomeIcon icon={["fas", unitIcon]} size="2x" color="#000" />
        </Card.Title>
        <Card.Body className="text-center">
          <Button
            className="stretched-link"
            variant="primary"
            onClick={handleClick}
          >
            {unitName}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
