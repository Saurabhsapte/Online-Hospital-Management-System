import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetAppointmentList,
  updatePatientStatus,
} from "../../../ServerCall/Doctor/DoctoAxios";
import Base from "../../Base/Base";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Form,
  Card,
  Table,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
  Input,
  Button,
  ButtonGroup,
} from "reactstrap";
import { PrivateAxios } from "../../../ServerCall/Axios/AxiosHelper";
import VerticalNavbarDoctor from "./VerticalNavbarDoctor";

function AppointPatientList() {
  const [data, setData] = useState({
    content: [],
  });

  const [medicines, setMedicines] = useState({
    medicineName: "",
    duration: "",
    quantity: "",
    medicineCharges: "",
  });

  const [health, setHealth] = useState({});

  useEffect(() => {
    GetAppointmentList(JSON.parse(localStorage.data).user.employee.doctor.id)
      .then((serverData) => {
        console.log(serverData);
        setData({
          content: [...data.content, ...serverData],
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading");
      });
  }, []);

  const [mo, setMo] = useState(false);
  const tog = (id) => {
    getHealthHistory(id);
    setMo(!mo);
  };

  const [modal, setModal] = useState(false);
  const toggle = (id) => {
    getHealthHistory(id);
    setModal(!modal);
  };

  const resetData = () => {
    setHealth({});
    setMedicines({
      medicineName: "",
      duration: "",
      quantity: "",
      medicineCharges: "",
    });
  };

  const getHealthHistory = (id) => {
    resetData();
    PrivateAxios.get(`patient/` + id + `/healthhistory/paymentstatus`).then(
      (response) => {
        var result = response.data;
        console.log(result);
        setHealth(result);
      }
    );
  };

  const [admitStatus, setAdmitStatus] = useState(false);

  const medHandleChange = (event, property) => {
    setMedicines({ ...medicines, [property]: event.target.value });
  };

  const handleChange = (event, property) => {
    setHealth({ ...health, [property]: event.target.value });
  };

  const handleFormSubmit = () => {
    debugger;
    updatePatientStatus(health, admitStatus).then((servervalue) => {
      toggle();
      toast.success("Patient Prescription updated");
    });
  };

  const addMedicine = () => {
    PrivateAxios.post(
      `healthhistory/` + health.id + `/medicine`,
      medicines
    ).then((response) => {
      tog();
      toast.success("medicine Added successfully");
    });
  };

  // ---------------------------------------------------------------------

  return (
    <Base>
      <br />
      <br />
      <br />
      <Row>
        <Col sm={{ size: 3 }}>
          <VerticalNavbarDoctor />
        </Col>
        <Col sm={{ size: 9 }}>
          <Table hover responsive size="" striped className="">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Blood Group</th>
                <th>Contact</th>
                <th>E-Mail</th>
                <th>Add Medicines</th>
                <th>Add Prescription</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.content?.map((patient) => {
                  return (
                    <tr key={patient?.id}>
                      <th scope="row">{patient?.id}</th>
                      <td>
                        {patient?.user?.firstName +
                          " " +
                          patient?.user?.lastName}
                      </td>
                      <td>{patient?.user?.gender}</td>
                      <td>{patient?.user?.dob}</td>
                      <td>{patient?.user?.bloodGroup}</td>
                      <td>{patient?.user?.mobileNo}</td>
                      <td>{patient?.user?.email}</td>
                      <td>
                        <Button
                          outline
                          color="success"
                          className="my-1"
                          onClick={() => {
                            tog(patient.id);
                          }}
                        >
                          Add Medicines
                        </Button>
                      </td>
                      <td>
                        <Button
                          outline
                          color="primary"
                          className="my-1"
                          onClick={() => {
                            toggle(patient.id);
                          }}
                        >
                          Add Prescription
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        scrollable={true}
        size={"md"}
      >
        <ModalHeader toggle={toggle}>
          Add Prescription and Medicines
        </ModalHeader>
        <ModalBody>
          <>
            <Form onSubmit={handleFormSubmit}>
              <FormGroup>
                <Label for="diseases">Enter Diseases</Label>
                <Input
                  type="text"
                  id="diseases"
                  value={health.diseases}
                  onChange={(e) => {
                    handleChange(e, "diseases");
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label for="prescriptionInstruction">
                  Enter Prescription Instruction
                </Label>
                <Input
                  type="text"
                  id="prescriptionInstruction"
                  onChange={(e) => {
                    handleChange(e, "prescriptionInstruction");
                  }}
                  value={health.prescriptionInstruction}
                />
              </FormGroup>

              <FormGroup className="text-center">
                <Label>Admit Patient</Label>
                <ButtonGroup>
                  <Button
                    color="primary"
                    outline
                    onClick={() => setAdmitStatus(true)}
                    active={admitStatus === true}
                    className="ms-5"
                  >
                    Yes
                  </Button>
                  <Button
                    color="primary"
                    outline
                    onClick={() => setAdmitStatus(false)}
                    active={admitStatus === false}
                  >
                    No
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          </>
        </ModalBody>
        <ModalFooter>
          <Container className="text-center ">
            <Button outline color="primary" onClick={() => handleFormSubmit()}>
              Update
            </Button>
            <Button
              outline
              color="secondary"
              className="ms-2"
              onClick={resetData}
            >
              Reset
            </Button>
          </Container>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={mo}
        toggle={tog}
        centered={true}
        scrollable={true}
        size={"lg"}
      >
        <ModalHeader toggle={tog}>Add Medicines</ModalHeader>
        <ModalBody>
          <Row className="mt-5 mb-5">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card outline color="dark">
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="medicineName">Enter Medicine Name</Label>
                      <Input
                        type="text"
                        id="medicineName"
                        onChange={(e) => {
                          medHandleChange(e, "medicineName");
                        }}
                        value={medicines.medicineName}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="duration">Enter Medicine Duration</Label>
                      <Input
                        type="text"
                        id="duration"
                        onChange={(e) => {
                          medHandleChange(e, "duration");
                        }}
                        value={medicines.duration}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="quantity">Enter Medicine Quantity</Label>
                      <Input
                        type="number"
                        placeholder="Enter Here"
                        id="quantity"
                        onChange={(e) => {
                          medHandleChange(e, "quantity");
                        }}
                        value={medicines.quantity}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="medicineCharges">
                        Enter Medicine Charges
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter Here"
                        id="medicineCharges"
                        onChange={(e) => {
                          medHandleChange(e, "medicineCharges");
                        }}
                        value={medicines.medicineCharges}
                      />
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Container className="text-center">
            <Button outline color="primary" onClick={() => addMedicine()}>
              Add Medicine
            </Button>
            <Button onClick={tog} outline color="secondary" className="ms-3">
              Cancel
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
        </ModalFooter>
      </Modal>
    </Base>
  );
}

export default AppointPatientList;
