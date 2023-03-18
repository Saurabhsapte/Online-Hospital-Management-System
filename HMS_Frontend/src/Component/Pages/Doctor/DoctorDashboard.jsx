import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Base from "../../Base/Base";
import VerticalNavbarDoctor from "./VerticalNavbarDoctor";

export default function DoctorDashboard() {
  return (
    <Base>
      <br />
      <br />
      <br />
      <Row>
        <Col sm={{ size: 3 }}>
          <VerticalNavbarDoctor />
        </Col>
        <Col sm={{ size: 6, offset: 1 }}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </Base>
  );
}
