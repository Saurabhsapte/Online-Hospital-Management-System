import React from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
    Form,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    FormGroup,
    Label,
    Row,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";

function VerticalNavbar() {
  return (
    <div>
      <Nav vertical pills justified>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/patient/dashboard">
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/patient/appointment">
            Book Appointment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/patient/appoHistory">
          Appointment History
          </NavLink>
        </NavItem>
        <NavItem active>
          <NavLink tag={ReactLink} to="/user/patient/healthHistory">
            Health History
          </NavLink>
        </NavItem>
        
      </Nav>
    </div>
  );
}

export default VerticalNavbar;
