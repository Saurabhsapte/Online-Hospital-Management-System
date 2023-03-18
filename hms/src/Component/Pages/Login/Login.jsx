import React, { useContext, useState } from "react";
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
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../ServerCall/User/SignUp_LogIn";
import { doLogin } from "../../../Authentication/auth";
import UserContext from "../../../Context/UserContext";
import { toast } from "react-toastify";
import { NavLink as ReactLink } from "react-router-dom";
function Login() {
  const userContxtData = useContext(UserContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({...loginDetail,[field]: actualValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Before sending data");
    console.log(loginDetail);

    // Validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Credentials is Required !!!!");
    } else {
      // Submit the data to server to generate token
      loginUser(loginDetail)
        .then((data) => {
          console.log("User Logged in : ");
          console.log(data);
          toast.success("Logged In");

          // debugger
          data.user.roles[0].id == 500
            ? navigate("/user/admin/dashboard")
            : data.user.roles[0].id == 501
            ? navigate("/user/doctor/dashboard")
            : data.user.roles[0].id == 502
            ? navigate("/user/patient/dashboard")
            : data.user.roles[0].id == 503
            ? navigate("/user/receptionist/dashboard")
            : data.user.roles[0].id == 504
            ? navigate("/user/accountant/dashboard")
            : navigate("/");

          // Save the Data to localStorage
          doLogin(data, () => {
            console.log("login details saved to localstorage .. Here in Login");

            // Redirect to user Dashboard page
            userContxtData.setUser({
              data: data,
              log: true,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          // debugger
          if (error.response.status == 400 || error.response.status == 404) {
            toast.error(error.response.data.message);
            console.log("error");
          } else {
            console.log("error");
            toast.error("Invalid Username or Password");
          }
        });
    }
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
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
                  <h3>Login Here</h3>
                </CardHeader>

                <CardBody>
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input
                        type="text"
                        id="email"
                        value={loginDetail.username}
                        onChange={(e) => handleChange(e, "username")}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input
                        type="password"
                        id="password"
                        value={loginDetail.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button outline color="primary">
                        Login
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        className="ms-2"
                        onClick={handleReset}
                      >
                        Clear
                      </Button>
                      <Nav>
        <NavItem>
          <NavLink tag={ReactLink} to="/forgot">
            Forgot Password ?
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

export default Login;
