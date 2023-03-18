import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  toggle,
  Form,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Row,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { GetAllResources } from "../../../ServerCall/HospitalResources/Resources";
import Base from "../../Base/Base";
import { MYAXIOIS } from "../../../ServerCall/Axios/AxiosHelper";
import { useNavigate } from "react-router-dom";
import VerticalNavbarAdmin from "../Admin/VerticalNavbarAdmin";

function AdminGetResources() {
  const [data, setData] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  const [res, setRes] = useState({
    id: "",
    resource_name: "",
    total_quantity: "",
    occupy_quantity: "",
    remaining_quantity: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    console.log(currentPage)
    changePage(currentPage)
  }, [currentPage]);

 
  const changePage = (pageNumber = 0, pageSize = 10) => {
    if (pageNumber > data.pageNumber && data.lastPage) {
      return
    }
    if (pageNumber < data.pageNumber && data.pageNumber === 0) {
      return
    }
    GetAllResources(pageNumber, pageSize)
      .then((serverData) => {
        setData({
          // Concatinent the pageContent with new data -> new data with existing data
          content: [ ...serverData.content],
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

  const handleChange = (event, property) => {
    debugger;
    // dynamic setting of values
    setRes({ ...res, [property]: event.target.value });
    console.log(res);
  };

  const resetData = () => {
    setRes({
      id: "",
      resource_name: "",
      total_quantity: "",
      occupy_quantity: "",
      remaining_quantity: "",
    });
  };
  const resource = data?.content;

  const [mo, setMo] = useState(false);
  const tog = (i) => {
    setRes({ ...res, id: i });
    setMo(!mo);
  };

  const deleteResource = () => {
    MYAXIOIS.delete(`/resources/` + res.id, resource).then((response) => {
      const result = response.data;
      if (result.success === true) {
        tog();
        resetData();
        toast.success("Resource Deleted Successfully");
      } else {
        toast.error(result["error"]);
      }
    });
  };

  const [modal, setModal] = useState(false);
  const toggle = (i) => {
    setRes({ ...res, id: i });

    setModal(!modal);
  };

  // Call server API,id
  const UpdateResource = () => {
    debugger;
    MYAXIOIS.put(`/resources/` + res.id, res).then((response) => {
      const result = response.data;
      debugger;
      resetData();
      toggle();
      toast.success("Resource updated Successfully");
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
          <Col sm={{ size: 9 }}>
            <Table hover responsive size="" striped className="w-100  p-3">
              <thead>
                <tr>
                  <th>id</th>
                  <th>resource_name</th>
                  <th>total_quantity</th>
                  <th>occupy_quantity</th>
                  <th>remaining_quantity</th>
                  <th>Update Resource</th>
                  <th>Delete Resource</th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data?.content?.map((resource) => {
                    return (
                      <tr key={resource.id}>
                        <th scope="row">{resource.id}</th>
                        <td>{resource.resource_name}</td>
                        <td>{resource.total_quantity}</td>
                        <td>{resource.occupy_quantity}</td>
                        <td>{resource.remaining_quantity}</td>
                        <td>
                          {" "}
                          <button
                            onClick={() => {
                              toggle(resource.id);
                            }}
                            style={styles.button}
                            className="btn btn-sm btn-success"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button
                            onClick={() => {
                              tog(resource.id);
                            }}
                            style={styles.button}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
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
          size={"lg"}
        >
          <ModalHeader toggle={toggle}>Update Resources</ModalHeader>
          <ModalBody>
            <Row className="mt-5 mb-5">
              <Col sm={{ size: 6, offset: 3 }}>
                <Card outline color="dark">
                  <CardBody>
                    <Form>
                      <FormGroup>
                        <Label for="resource_name">Enter Resource Name</Label>
                        <Input
                          type="text"
                          placeholder="Enter Here"
                          id="resource_name"
                          onChange={(e) => {
                            handleChange(e, "resource_name");
                          }}
                          value={res.resource_name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="total_quantity">
                          Enter Resource Total Quantity
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter Here"
                          id="total_quantity"
                          onChange={(e) => {
                            handleChange(e, "total_quantity");
                          }}
                          value={res.total_quantity}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="occupy_quantity">
                          Enter Resource Occupy Quantity
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter Here"
                          id="occupy_quantity"
                          onChange={(e) => {
                            handleChange(e, "occupy_quantity");
                          }}
                          value={res.occupy_quantity}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="remaining_quantity">
                          Enter Resource Remaining Quantity
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter Here"
                          id="remaining_quantity"
                          onChange={(e) => {
                            handleChange(e, "remaining_quantity");
                          }}
                          value={res.remaining_quantity}
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
              <Button outline color="primary" onClick={UpdateResource}>
                Update Resource
              </Button>
              <Button
                onClick={toggle}
                outline
                color="secondary"
                className="ms-3"
              >
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
        <Modal
          isOpen={mo}
          toggle={tog}
          centered={true}
          scrollable={true}
          size={"sm"}
        >
          <ModalHeader toggle={tog}>Are you sure?</ModalHeader>
          <ModalBody>
            <Button
              outline
              color="primary"
              className="ms-3"
              onClick={() => deleteResource()}
            >
              Yes
            </Button>
            <Button outline color="danger" className="ms-3" onClick={tog}>
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

export default AdminGetResources;
