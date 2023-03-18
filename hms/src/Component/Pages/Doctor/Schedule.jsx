import React, { useEffect, useState } from "react";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";
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
  ButtonGroup,
} from "reactstrap";
import { updateDoctorSchedule } from "../../../ServerCall/Doctor/DoctoAxios";
import VerticalNavbarDoctor from "./VerticalNavbarDoctor";

function Schedule() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [days, setDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  useEffect(() => {
    setData({
      startTime: JSON.parse(localStorage.data).user.employee.doctor.startTime,
      endTime: JSON.parse(localStorage.data).user.employee.doctor.endTime,
    });
    setDays({
      sunday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).sunday,
      monday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).monday,
      tuesday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).tuesday,
      wednesday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).wednesday,
      thursday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).thursday,
      friday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).friday,
      saturday: JSON.parse(
        JSON.parse(localStorage.data).user.employee.doctor.days
      ).saturday,
    });
  }, []);

  const handleChange = (event, property) => {
    // dynamic setting of values
    setData({ ...data, [property]: event.target.value });
    console.log(data);
  };

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  // Reset the form
  const resetData = () => {
    setData({});
  };

  const submitForm = (event) => {
    event.preventDefault();
    //console.log(data);
    console.log("Before send to Server");
    // Data validate
    // Call server API // id pass
    updateDoctorSchedule(
      JSON.parse(localStorage.data).user.employee.doctor.id,
      data,
      JSON.stringify(days)
    )
      .then((response) => {
        console.log(response);
        resetData();
        setModal(!modal);
        toast.success("Schedule selected");
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
      });
  };

  return (
    <Base>
      <br />
      <br />
      <br />
      <Row>
        <Col sm={{ size: 3 }}>
          <VerticalNavbarDoctor />
        </Col>
        <Col sm={{ size: 6 , offset : 1 }}>
          <Card outline color="dark">
            <CardHeader>
              <h1>Select Weekly Schedule</h1>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="startTime">Enter Start Time</Label>
                  <Input
                    id="startTime"
                    placeholder="Enter Here"
                    type="time"
                    onChange={(e) => {
                      handleChange(e, "startTime");
                    }}
                    value={data.startTime}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endTime">Enter end Time</Label>
                  <Input
                    id="endTime"
                    placeholder="Enter Here"
                    type="time"
                    onChange={(e) => {
                      handleChange(e, "endTime");
                    }}
                    value={data.endTime}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <Label>Sunday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, sunday: true })}
                      active={days.sunday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, sunday: false })}
                      active={days.sunday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>
                <FormGroup className="text-center">
                  <Label>Monday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, monday: true })}
                      active={days.monday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, monday: false })}
                      active={days.monday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label>Tuesday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, tuesday: true })}
                      active={days.tuesday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, tuesday: false })}
                      active={days.tuesday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label>Wednesday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, wednesday: true })}
                      active={days.wednesday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, wednesday: false })}
                      active={days.wednesday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label>Thursday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, thursday: true })}
                      active={days.thursday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, thursday: false })}
                      active={days.thursday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label>Friday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, friday: true })}
                      active={days.friday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, friday: false })}
                      active={days.friday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>

                <FormGroup className="text-center">
                  <Label>Saturday</Label>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, saturday: true })}
                      active={days.saturday === true}
                      className="ms-5"
                    >
                      Yes
                    </Button>
                    <Button
                      color="primary"
                      outline
                      onClick={() => setDays({ ...days, saturday: false })}
                      active={days.saturday === false}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                </FormGroup>
                <Container className="text-center">
                  <Button outline color="primary" onClick={toggle}>
                    Confirm Schedule
                  </Button>
                  <Button
                    onClick={resetData}
                    outline
                    color="danger"
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
          <Button outline color="primary" className="ms-3" onClick={submitForm}>
            Yes
          </Button>
          <Button outline color="danger" className="ms-3" onClick={toggle}>
            No
          </Button>
        </ModalBody>
      </Modal>
    </Base>
  );
}

export default Schedule;
