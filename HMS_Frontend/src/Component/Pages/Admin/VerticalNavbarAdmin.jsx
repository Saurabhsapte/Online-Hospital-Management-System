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

function VerticalNavbarAdmin() {
  return (
    <div>
      <Nav vertical pills justified>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/admin/dashboard">
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/admin/allEmployee">
            All Employee
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/admin/allPatient">
            All Patient
          </NavLink>
        </NavItem>
        <NavItem active>
          <NavLink tag={ReactLink} to="/user/admin/addEmp">
            Add Employee
          </NavLink>
        </NavItem>

        <NavItem active>
          <NavLink tag={ReactLink} to="/user/admin/rmEmp">
            Remove Employee
          </NavLink>
        </NavItem>

        <NavItem active>
          <NavLink tag={ReactLink} to="/user/admin/resources">
            Check and Update Resources
          </NavLink>
        </NavItem>

        <NavItem active>
          <NavLink tag={ReactLink} to="/user/admin/addResources">
            Add Resource
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default VerticalNavbarAdmin;
