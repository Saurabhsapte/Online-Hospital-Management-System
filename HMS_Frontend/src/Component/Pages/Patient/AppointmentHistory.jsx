import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import { GetAllAppintmentHistory } from "../../../ServerCall/Patient/PatientAxios";
import Base from "../../Base/Base";
import { PrivateAxios } from "../../../ServerCall/Axios/AxiosHelper";
import VerticalNavbar from "./VerticalNavbarPatient";

function AppintmentHistory(args) {
  const [data, setData] = useState({
    content: [],
  });

  console.log("Inside appointment history");

  const [res, setRes] = useState({
    id: "",
  });

  useEffect(() => {
    // load post of postId
    GetAllAppintmentHistory(JSON.parse(localStorage.data).user.patient.id)
      .then((serverData) => {
        console.log(serverData);
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

  const resetData = () => {
    setRes({
      id: "",
    });
  };

  const cancelAppointment = () => {
    debugger;
    PrivateAxios.delete(`/healthhistory/` + res.id).then((response) => {
      const result = response.data;
      if (result.success === true) {
        toggle();
        resetData();
        toast.success("Appointment Deleted Successfully");
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const [modal, setModal] = useState(false);
  const toggle = (i) => {
    res.id = i;
    setModal(!modal);
  };

  const healthhistory = data?.content;

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
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Symptoms</th>
                  <th>Cancel Appointment</th>
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
                        <td>{healthhistory.appointmentDate}</td>
                        <td>{healthhistory.appointmentTime}</td>
                        <td>{healthhistory.symptoms}</td>
                        <td>
                          {" "}
                          <Button
                            onClick={() => {
                              toggle(healthhistory?.id);
                            }}
                            style={styles.button}
                            className="btn btn-sm btn-danger"
                          >
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
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
                onClick={() => cancelAppointment()}
              >
                Yes
              </Button>
              <Button outline color="danger" className="ms-3" onClick={toggle}>
                No
              </Button>
            </ModalBody>
          </Modal>
        </Row>
      </Base>
    </div>
  );
}
const styles = {
  h3: {
    textAlign: "center",
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
};

export default AppintmentHistory;
