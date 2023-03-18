import React from "react";
import { Col, Row } from "reactstrap";
import Base from "../../Base/Base";
import VerticalNavbar from "./VerticalNavbarPatient";

export default function PatientDashboard() {
  return (
    <Base>
      <br />
      <br />
      <br />
      <Row>
        <Col sm={{ size: 3 }}>
          <VerticalNavbar />
        </Col>
        <Col sm={{ size: 6, offset: 1 }}>
          <h1>Welcome Patient</h1>
        </Col>
      </Row>
    </Base>
  );
}
