import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row, Table } from "reactstrap";
import { GetAllHealthHistory } from "../../../ServerCall/Patient/PatientAxios";
import Base from "../../Base/Base";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  toggle,
} from "reactstrap";
import { MYAXIOIS } from "../../../ServerCall/Axios/AxiosHelper";
import VerticalNavbar from "./VerticalNavbarPatient";

function HealthHistory(args) {
  const [data, setData] = useState({
    content: [],
  });
  const [med, setMedicine] = useState([]);

  useEffect(() => {
    // load post of postId
    GetAllHealthHistory(JSON.parse(localStorage.data).user.patient.id)
      .then((serverData) => {
        //console.log(serverData)
        setData({
          // Concatinent the pageContent with new data -> new data with existing data
          content: [...data.content, ...serverData],
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading");
      });
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // console.log(data?.content);
  const healthhistory = data?.content;

  console.log(data);

  const getMedicines = (id) => {
    MYAXIOIS.get(`/healthhistory/` + id + `/medicine`).then((response) => {
      // content: [...data.content, ...serverData]
      setMedicine(response.data);
      toggle();
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
            <VerticalNavbar />
          </Col>
          <Col sm={{ size: 9 }}>
            <Table hover responsive size="" striped className="w-100  p-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Appointment Date and Time</th>
                  <th>Symptoms</th>
                  <th>Diseases</th>
                  <th>AdmitDate</th>
                  <th>DischargeDate</th>
                  <th>Prescriptions</th>
                  <th>AllocatedBed</th>
                  <th>Medicines</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.content?.map((healthhistory) => {
                    return (
                      <tr key={healthhistory?.healthhistory?.id}>
                        <th scope="row">{healthhistory.id}</th>
                        <td>
                          {healthhistory.patient.user.firstName +
                            " " +
                            healthhistory.patient.user.lastName}
                        </td>
                        <td>
                          {healthhistory.appointmentDate +
                            " " +
                            healthhistory.appointmentTime}
                        </td>
                        <td>{healthhistory.symptoms}</td>
                        <td>{healthhistory.diseases}</td>
                        <td>{healthhistory.admitDate}</td>
                        <td>{healthhistory.dischargeDate}</td>
                        <td>{healthhistory.prescriptionInstruction}</td>
                        <td>{healthhistory.allocatedBed}</td>
                        <td>
                          <Button
                            color="primary"
                            onClick={() => {
                              getMedicines(healthhistory.id);
                            }}
                          >
                            Medicines
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
          size={"lg"}
        >
          <ModalHeader toggle={toggle}>Medicines</ModalHeader>
          <ModalBody>
            <>
              <Table hover responsive size="" striped className="w-100  p-3">
                <tr>
                  <th>Medicine Name</th>
                  <th>Medicine Charges</th>
                  <th>Duration</th>
                </tr>
                {med &&
                  med?.map((medicine) => {
                    return (
                      //debugger;
                      <tr key={medicine?.id}>
                        <td>{medicine.medicineName}</td>
                        <td>{medicine.medicineCharges}</td>
                        <td>{medicine.duration}</td>
                      </tr>
                    );
                  })}
              </Table>
            </>
          </ModalBody>
        </Modal>
      </Base>
    </div>
  );
}

export default HealthHistory;