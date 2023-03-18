import React, { useContext, useState } from "react";
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
} from "reactstrap";
import {
  deleteTheEmployee,
  getTheEmployee,
} from "../../../ServerCall/Admin/Admin";
import Base from "../../Base/Base";
import VerticalNavbarAdmin from "./VerticalNavbarAdmin";

function RemoveEmployee() {
  const [id, setId] = useState();

  const [key, setKey] = useState("");

  const [toggle, setToggle] = useState(false);

  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    roles: [],
    securityQue: "",
    securityAns: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    // debugger;

    // setEmployee({ ...employee, [field]: actualValue });
  };

  const getTheEmployeeServer = (event) => {
    event.preventDefault();

    getTheEmployee(id).then((data) => {
      setEmployee({
        id: data.id,
        firstName: data.user.firstName,
        roles: data.user.roles[0].name,
        securityQue: data.user.securityQue,
        securityAns: data.user.securityAns,
      });
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setEmployee({
      firstName: "",
      roles: [],
      securityQue: "",
      securityAns: "",
    });
    setId("");
    setKey("");
  };

  const deleteEmployeeServer = () => {
    deleteTheEmployee(employee.id).then((data) => {
      toast.success(data.message);
      handleReset();
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
          <Col sm={{ size: 7, offset: 1 }}>
            <Card outline color="dark">
              <CardHeader>
                <h3>Remove Employee</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="number">Enter Employee Number</Label>
                    <Input
                      type="number"
                      id="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="firstName">Employee Name</Label>
                    <Input id="firstName" value={employee.firstName} disabled />
                  </FormGroup>

                  <FormGroup>
                    <Label for="roles">Employee Role</Label>
                    <Input id="roles" value={employee.roles} disabled />
                  </FormGroup>

                  <FormGroup>
                    <Label for="securityQue">Security Question</Label>
                    <Input
                      type="text"
                      id="securityQue"
                      value={employee.securityQue}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="key">
                      Enter Correct Security Answer to Delete Employee
                    </Label>
                    <Input
                      type="text"
                      id="key"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button
                      outline
                      color="primary"
                      disabled={!id}
                      onClick={getTheEmployeeServer}
                    >
                      Get Employee Details
                    </Button>

                    {key === employee.securityAns && (
                      <Button
                        outline
                        className="ms-2"
                        color="danger"
                        onClick={deleteEmployeeServer}
                      >
                        Delete Employee
                      </Button>
                    )}
                    <Button
                      outline
                      color="secondary"
                      className="ms-2"
                      onClick={handleReset}
                    >
                      Clear
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Base>
    </div>
  );
}

export default RemoveEmployee;
