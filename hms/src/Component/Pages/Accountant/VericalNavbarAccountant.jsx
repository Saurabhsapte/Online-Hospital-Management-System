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
  
function VericalNavbarAccountant() {
  return (
    <div>
      <Nav vertical pills justified>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/accountant/dashboard">
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={ReactLink} to="/user/accountant/PatientAccountList">
            Patient List
          </NavLink>
        </NavItem>

        
      </Nav>
    </div>
  );
}

export default VericalNavbarAccountant;
