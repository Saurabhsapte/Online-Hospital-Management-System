import React, { useContext, useState } from "react";
import { getTheUser,setNewPassword } from "../../../ServerCall/User/SignUp_LogIn";
import { toast } from "react-toastify";
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
import Base from "../../Base/Base";

function ForgotPass() {
    const [email, setEmail] = useState();

    const [key, setKey] = useState("");

    const [password,setPassword]=useState("");

    const [user, setUser] = useState({
        email: "",
        firstName: "",
        securityQue: "",
        securityAns: "",
        password:""
      });
    
      const resetData = () => {
        setUser({
            email: "",
            firstName: "",
            securityQue: "",
            securityAns: "",
            password:""
        });
        setEmail("");
          setKey("");
          setPassword("");
    };

    const getTheUserServer = (event) => {
        event.preventDefault();
    
        getTheUser(email).then((data) => {
          setUser({
            email: data.email,
            firstName: data.firstName,
            securityQue: data.securityQue,
            securityAns: data.securityAns,
          });
        });
      };

const forgotp = (event) => {
    event.preventDefault();

    setNewPassword(email, password).then((data) => {
        resetData();
        toast.success("Password Reset Successfully");
    })
};
   
  return (
    <div>
      <Base>
        <br />
        <br />
        <Container>
          <Row className="mt-3">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card outline color="dark">
                <CardHeader>
                  <h3>Forgot Password</h3>
                </CardHeader>

                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                                      
                    <FormGroup>
                    <Label for="firstName">User Name</Label>
                    <Input id="firstName" value={user.firstName} disabled />
                  </FormGroup>

                  <FormGroup>
                    <Label for="securityQue">Security Question</Label>
                    <Input
                      type="text"
                      id="securityQue"
                      value={user.securityQue}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="key">
                      Enter Correct Security Answer
                    </Label>
                    <Input
                      type="text"
                      id="key"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                    </FormGroup>
                                      
                    {key === user.securityAns && (
                    <FormGroup>
                    <Label for="password">Enter New Password</Label>
                    <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </FormGroup>)}
                                      
                    <Container className="text-center">
                    <Button
                      outline
                      color="primary"
                      disabled={!email}
                      onClick={getTheUserServer}
                    >
                      Get User Details
                    </Button>
                                          
                    {key === user.securityAns && (
                    <Button outline
                    className="ms-2"
                    color="danger"
                    onClick={forgotp}>
                        Forgot
                    </Button>
                    )}
                      <Button
                        outline
                        color="secondary"
                        className="ms-2"
                        onClick={resetData}
                      >
                        Clear
                      </Button>
                      <Nav>
        <NavItem>
          <NavLink tag={ReactLink} to="/login">
            Login Now
          </NavLink>
        </NavItem></Nav>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
}

export default ForgotPass;