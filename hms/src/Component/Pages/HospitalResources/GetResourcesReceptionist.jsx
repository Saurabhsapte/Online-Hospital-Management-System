import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row, Table } from "reactstrap";
import { GetAllResources } from "../../../ServerCall/HospitalResources/Resources";
import Base from "../../Base/Base";
import VerticalNavbarReceptionist from "../Receptionist/VerticalNavbarReceptionist";

function GetResourcesReceptionist() {
  const [data, setData] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
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

  // console.log(data?.content);
  const resource = data?.content;
  console.log(resource);
  //debugger;
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
                  <th>id</th>
                  <th>resource_name</th>
                  <th>total_quantity</th>
                  <th>occupy_quantity</th>
                  <th>remaining_quantity</th>
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
      </Base>
    </div>
  );
}

export default GetResourcesReceptionist;
