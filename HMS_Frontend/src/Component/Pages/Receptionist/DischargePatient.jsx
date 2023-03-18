import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";
import { PrivateAxios } from "../../../ServerCall/Axios/AxiosHelper";
import { GetPatientForDischarge } from "../../../ServerCall/Receiptionist/ReceptionistAxios";
import Base from "../../Base/Base";
import VerticalNavbarReceptionist from "./VerticalNavbarReceptionist";

function DischargePatient() {
  const [data, setData] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [health, setHealth] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    console.log(currentPage)
    changePage(currentPage)
  }, [currentPage]);

 
  const changePage = (pageNumber = 0, pageSize=10) => {
    if (pageNumber > data.pageNumber && data.lastPage) {
        return
    }
    if (pageNumber < data.pageNumber && data.pageNumber === 0) {
        return
    }
    GetPatientForDischarge(pageNumber,pageSize)
      .then((serverData) => {
        setData({
          // Concatinent the pageContent with new data -> new data with existing data
          content: [...serverData.content],
          totalPages: serverData.totalPages,
          totalElements: serverData.totalElements,
          pageSize: serverData.pageSize,
          lastPage: serverData.lastPage,
          pageNumber: serverData.pageNumber,
        });
      console.log(data);
    }).catch(error => {
        toast.error("Error in loading")
    })
  }

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const resetData = () => {
    setHealth({});
  };

  const getHealthHistory = (id) => {
    resetData();
    PrivateAxios.get(`patient/` + id + `/healthhistory/paymentstatus`).then(
      (response) => {
        var result = response.data;
        setHealth(result);
      }
    );
    toggle();
  };

  const confirm = () => {
    ///healthhistory/{Id}/discharge
    debugger;
    PrivateAxios.put(`healthhistory/` + health.id + `/discharge`).then(
      (response) => {
        toggle();
        toast.success("Patient Discharge Successfully");
      }
    );
    resetData();
  };

  return (
    <div>
      <Base>
        <br />
        <br />
        <br />
        <Row>
          <Col sm={{ size: 3 }}>
            <VerticalNavbarReceptionist />
          </Col>
          <Col sm={{ size: 9 }}>
            <Table hover responsive size="" striped className="w-100  p-3">
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Contact</th>
                  <th>E-Mail</th>
                  <th>Discharge</th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data?.content?.map((user) => {
                    return (
                      <tr key={user?.user.id}>
                        <th scope="row">{user?.id}</th>
                        <td>
                          {user?.user?.firstName + " " + user?.user?.lastName}
                        </td>
                        <td>{user?.user?.gender}</td>
                        <td>{user?.user?.dob}</td>
                        <td>{user?.user?.mobileNo}</td>
                        <td>{user?.user?.email}</td>
                        <td>
                          <Button
                            onClick={() => {
                              getHealthHistory(user?.id);
                            }}
                            style={styles.button}
                            className="btn btn-sm btn-success"
                          >
                            Discharge Patient
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                <Container className='mt-3'>
                        <Pagination size='ms'>
                            <PaginationItem onClick={() => changePage(data.pageNumber-1)} disabled={data.pageNumber === 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {[...Array(data.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} active={index === data.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                            ))}
                    
                            <PaginationItem onClick={() => changePage(data.pageNumber+1)} disabled={data.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                </Container>
              </tbody>
            </Table>
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
            <Button outline color="primary" className="ms-3" onClick={confirm}>
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
const styles = {
  h3: {
    textAlign: "center",
    margin: 20,
  },
  button: {
    marginRight: 10,
  },
};
export default DischargePatient;
