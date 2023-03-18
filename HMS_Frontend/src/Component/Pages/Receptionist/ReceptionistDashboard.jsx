import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import AppointmentList from "./AppointmentList";
import { Col, Container, Row } from "reactstrap";
import Base from "../../Base/Base";
import AdmitPatient from "./AdmitPatient";
import DischargePatient from "./DischargePatient";
import VerticalNavbarReceptionist from "./VerticalNavbarReceptionist";

export default function ReceptionistDashboard() {

  return (
    <Base>
    <br />
    <br />
    <br />
    <Row>
      <Col sm={{ size: 3 }}>
        <VerticalNavbarReceptionist />
      </Col>
      <Col sm={{ size: 6, offset: 1 }}>
        <h1>Dashboard</h1>
      </Col>
    </Row>
  </Base>
  );
}
