import React, { useState } from "react";
import { toast } from "react-toastify";
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
  ModalFooter,
  toggle,
} from "reactstrap";
import { addDoctor, addEmployee } from "../../../ServerCall/Admin/Admin";
import Base from "../../Base/Base";
import VerticalNavbarAdmin from "./VerticalNavbarAdmin";

function AddEmployee() {
  const [address, setAddress] = useState({
    plotNo: "",
    buildingName: "",
    areaName: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    securityQue: "",
    securityAns: "",
    mobileNo: "",
    bloodGroup: "",
    dob: "",
    address: {},
    roles: [],
  });

  // ------------------------------------------------------

  const [employee, setData] = useState({
    qualificaton: "",
    salary: "",
    status: false,
    hiredate: "",
    user: {},
  });

  // ------------------------------------------------------

  const addressHandleChange = (event, property) => {
    setAddress({ ...address, [property]: event.target.value });
    setUser({ ...user, address });
    setData({ ...employee, user });
  };

  const handleChange = (event, property) => {
    setUser({ ...user, [property]: event.target.value });
    setData({ ...employee, user });
  };

  const empHandleChange = (event, property) => {
    setData({ ...employee, [property]: event.target.value });
  };

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [roleLocal, setRole] = useState("initial");

  const handleRoleChange = (event, property) => {
    setRole(event.target.value);
  };

  var role = roleLocal;

  // ------------------------------------------------------

  const resetData = () => {
    setAddress({
      plotNo: "",
      buildingName: "",
      areaName: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      securityQue: "",
      securityAns: "",
      mobileNo: "",
      bloodGroup: "",
      dob: "",
      address: {},
      roles: [],
    });

    setData({
      qualificaton: "",
      salary: "",
      status: false,
      hiredate: "",
      user: {},
    });

    setRole("initial");
  };

  // ------------------------------------------------------

  const submitForm = (event) => {
    // debugger
    event.preventDefault();

    // setData({ ...data, user });
    console.log(employee);
    console.log("Before send to Server");

    role == "Accountant"
      ? addEmployeeServer(employee, 504)
      : role == "Doctor"
      ? addDoctorServer(employee)
      : addEmployeeServer(employee, 503);
  };
  // Call server API

  const addEmployeeServer = (employee, id) => {
    console.log("here In addEmployee Method with id " + id);
    addEmployee(employee, id)
      .then((response) => {
        console.log(response);
        console.log("Success LOG");
        console.log("After receiving to Server response");
        toggle();
        toast.success("User Registred as " + response.user.roles[0].name);
        resetData();
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
      });
  };

  const addDoctorServer = (employee) => {
    console.log("here In addMethodDoctor Method with id ");
    debugger;
    console.log(employee);
    addDoctor(employee)
      .then((response) => {
        console.log(response);
        toggle();
        toast.success(
          "User Registred as " + response.employee.user.roles[0].name
        );
        resetData();
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
      });
  };

  return (
    <div>
      <Base>
        <br />
        <br />
        <br />
        <Row>
          <Col sm={{ size: 3 }}>
            <VerticalNavbarAdmin />
          </Col>
          <Col sm={{ size: 7, offset : 1 }}>
            <Card outline color="dark">
              <CardHeader>
                <h1>Welcome Admin</h1>
                <h3>Fill Info to Add Employee</h3>
              </CardHeader>

              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="role">Select Role</Label>
                    <Input
                      id="role"
                      name="select"
                      type="select"
                      onChange={(e) => {
                        handleRoleChange(e, "role");
                      }}
                      defaultValue="Select"
                      required
                    >
                      <option disabled>Select</option>
                      <option>Doctor</option>
                      <option>Receptionist</option>
                      <option>Accountant</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="firstName">Enter Your First Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="firstName"
                      onChange={(e) => {
                        handleChange(e, "firstName");
                      }}
                      value={user.firstName}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="lastName">Enter Your Last Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="lastName"
                      onChange={(e) => {
                        handleChange(e, "lastName");
                      }}
                      value={user.lastName}
                      // invalid={true}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Enter Your E-mail</Label>
                    <Input
                      type="email"
                      placeholder="Enter Here"
                      id="email"
                      onChange={(e) => {
                        handleChange(e, "email");
                      }}
                      value={user.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Enter Your Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Here"
                      id="password"
                      onChange={(e) => {
                        handleChange(e, "password");
                      }}
                      value={user.password}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input
                      id="gender"
                      name="select"
                      type="select"
                      onChange={(e) => {
                        handleChange(e, "gender");
                      }}
                      defaultValue="Select"
                    >
                      <option disabled>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="qualificaton">Enter Qualification</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="qualificaton"
                      onChange={(e) => {
                        empHandleChange(e, "qualificaton");
                      }}
                      value={employee.qualificaton}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="securityQue">
                      Enter Your Security Question
                    </Label>
                    <Input
                      id="securityQue"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        handleChange(e, "securityQue");
                      }}
                      value={user.securityQue}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="securityAns">Enter Your Security Answer</Label>
                    <Input
                      id="securityAns"
                      placeholder="Enter Here"
                      type="password"
                      onChange={(e) => {
                        handleChange(e, "securityAns");
                      }}
                      value={user.securityAns}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="mobileNo">Enter Your Mobile Number</Label>
                    <Input
                      id="mobileNo"
                      placeholder="Enter Here"
                      type="number"
                      onChange={(e) => {
                        handleChange(e, "mobileNo");
                      }}
                      value={user.mobileNo}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="bloodGroup">Enter Your Blood Group</Label>
                    <Input
                      id="bloodGroup"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        handleChange(e, "bloodGroup");
                      }}
                      value={user.bloodGroup}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="dob">Enter Your DOB</Label>
                    <Input
                      id="dob"
                      placeholder="Enter Here"
                      type="date"
                      onChange={(e) => {
                        handleChange(e, "dob");
                      }}
                      value={user.dob}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="salary">Enter Employee Salary</Label>
                    <Input
                      id="salary"
                      placeholder="Enter Here"
                      type="number"
                      onChange={(e) => {
                        empHandleChange(e, "salary");
                      }}
                      value={employee.salary}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="hiredate">Enter Hire Date</Label>
                    <Input
                      id="hiredate"
                      placeholder="Enter Here"
                      type="date"
                      onChange={(e) => {
                        empHandleChange(e, "hiredate");
                      }}
                      value={employee.hiredate}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="plotNo">plotNo</Label>
                    <Input
                      id="plotNo"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "plotNo");
                      }}
                      value={address.plotNo}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="buildingName">buildingName</Label>
                    <Input
                      id="buildingName"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "buildingName");
                      }}
                      value={address.buildingName}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="areaName">areaName</Label>
                    <Input
                      id="areaName"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "areaName");
                      }}
                      value={address.areaName}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="city">city</Label>
                    <Input
                      id="city"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "city");
                      }}
                      value={address.city}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="state">state</Label>
                    <Input
                      id="state"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "state");
                      }}
                      value={address.state}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="country">country</Label>
                    <Input
                      id="country"
                      placeholder="Enter Here"
                      type="text"
                      onChange={(e) => {
                        addressHandleChange(e, "country");
                      }}
                      value={address.country}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="pincode">pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter Here"
                      type="number"
                      onChange={(e) => {
                        addressHandleChange(e, "pincode");
                      }}
                      value={address.pincode}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="primary" onClick={toggle}>
                      Add Employee
                    </Button>
                    <Button
                      onClick={resetData}
                      outline
                      color="secondary"
                      className="ms-3"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={modal}
          toggle={toggle}
          centered={true}
          scrollable={true}
          size={"sm"}
        >
          <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
          <ModalBody>
            <Button
              outline
              color="primary"
              className="ms-3"
              onClick={submitForm}
            >
              Yes
            </Button>
            <Button outline color="danger" className="ms-3" onClick={toggle}>
              No
            </Button>
          </ModalBody>
        </Modal>
      </Base>
    </div>
  );
}

export default AddEmployee;
