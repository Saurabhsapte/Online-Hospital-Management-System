import React from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function VerticalNavbarDoctor() {
  return (
    <div>
      <Nav vertical pills justified>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/doctor/dashboard">
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/doctor/appointmentList">
            Appointment List
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={ReactLink} to="/user/doctor/selectSchedule">
          Select Schedule
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/doctor/resources">
            Check Resources
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default VerticalNavbarDoctor;
