import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { Navigate, NavLink as ReactLink, useNavigate } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../../Authentication/auth";

function CustomeNavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);


  const Logout = () => {
    doLogout(() => {
      // Logged out
      setLogin(false);
    })
    Navigate('/')
  }
  return (
    <div>
      <Navbar
        color="dark"
        dark="true"
        expand="sm"
        fixed="top"
        className="px-4 mb"
      >
        <NavbarBrand href="/">Hospital Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {/* <NavItem>sfdsf</NavItem> */}
          </Nav>
          <Nav navbar>
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    SignUp
                  </NavLink>
                </NavItem>
              </>
            )}

            {login && (
              <>
                {/* <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink onClick={Logout} tag={ReactLink} to="/">Logout</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomeNavBar;

