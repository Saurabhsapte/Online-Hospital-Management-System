import React from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

function VerticalNavbarReceptionist() {
  return (
    <div>
      <Nav vertical pills justified>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/receptionist/dashboard">
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/receptionist/appointmentList">
          Appointment List
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/receptionist/admitList">
          Admit List
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/receptionist/discharge">
          Discharge Patient List
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/receptionist/resource">
          Check Resources 
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default VerticalNavbarReceptionist;
