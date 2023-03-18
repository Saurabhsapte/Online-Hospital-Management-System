import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row, Table,Pagination,PaginationItem,PaginationLink } from "reactstrap";
import { loadAllEmployee } from "../../../ServerCall/Admin/Admin";
import Base from "../../Base/Base";
import VerticalNavbarAdmin from "./VerticalNavbarAdmin";

function AllEmployee() {
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

 
  const changePage = (pageNumber = 0, pageSize=10) => {
    if (pageNumber > data.pageNumber && data.lastPage) {
        return
    }
    if (pageNumber < data.pageNumber && data.pageNumber === 0) {
        return
    }
    loadAllEmployee(pageNumber,pageSize).then(serverData => {
      setData({
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
          <Col sm={{ size: 8 }}>
            <Table hover responsive size="" striped className="w-100  p-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>Qualification</th>
                  <th>DOB</th>
                  <th>Contact</th>
                  <th>E-Mail</th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data?.content?.map((user) => {
                    return (
                      <tr key={user?.user.id}>
                        <th scope="row">{user?.id}</th>
                        <td>
                          {user?.user.firstName + " " + user?.user.lastName}
                        </td>
                        <td>{user?.user.roles[0].name}</td>
                        <td>{user?.user.gender}</td>
                        <td>{user?.qualificaton}</td>
                        <td>{user?.user.dob}</td>
                        <td>{user?.user.mobileNo}</td>
                        <td>{user?.user.email}</td>
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

export default AllEmployee;
