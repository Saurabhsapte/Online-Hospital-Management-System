import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Row,
  Col,
  PaginationLink,
  PaginationItem,
  Pagination,
} from "reactstrap";
import { GetPatientForAccountant } from "../../../ServerCall/Accountant/AccountantAxios";
import Base from "../../Base/Base";
import { PrivateAxios } from "../../../ServerCall/Axios/AxiosHelper";
import JsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import VericalNavbarAccountant from "./VericalNavbarAccountant";

function PatientAccountList() {
  const [data, setData] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });
  const [pat, setPat] = useState({
    id: "",
    paidAmount: "",
    TotalAmount: "",
    RemainingAmount: "",
    days: "",
    doctorFee: "",
    medicineCharges: "",
    wardCharges: "",
    pay: 0,
  });
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

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
    GetPatientForAccountant(pageNumber,pageSize)
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

  const user = data?.content;

  const resetData = () => {
    pat.id = "";
    pat.paidAmount = "";
    pat.TotalAmount = "";
    pat.RemainingAmount = "";
    pat.days = "";
    pat.doctorFee = "";
    pat.medicineCharges = "";
    pat.wardCharges = "";
    pat.pay = 0;
    setPat({});
  };

  const getHealthHistory = (id) => {
    PrivateAxios.get(`patient/` + id + `/healthhistory/paymentstatus`).then(
      (response) => {
        var result = response.data;
        debugger;
        pat.id = result.id;
        let dis = new Date(result.dischargeDate);
        let adm = new Date(result.admitDate);
        var days = (dis - adm) / (60 * 1000 * 60 * 24);
        pat.days = days;
        var wardCharges = pat.days * pat.wardCharges;
        setPat({ ...pat, wardCharges: wardCharges });
        var med = 0;
        result.medicines.map((m) => {
          med = med + m.medicineCharges;
        });
        pat.medicineCharges = med;
        //setPat({ ...pat, "medicineCharges": med });
        var total = pat.doctorFee + pat.wardCharges + pat.medicineCharges;
        //setPat({ ...pat, "TotalAmount": total });
        pat.TotalAmount = total;
        var rem = total - result.paidAmount;
        pat.RemainingAmount = rem;
        setPat({ ...pat, paidAmount: result.paidAmount });
      }
    );
    toggle();
  };

  const UpdatePaidAmount = () => {
    //debugger;
    PrivateAxios.put(`healthhistory/` + pat.id + `/amount/` + pat.pay).then(
      (response) => {
        debugger;
        var result = response.data;
        //resetData();
        toggle();
        toast.success("Payment Done Successfully");
      }
    );
  };

  const UpdatePayment = (id) => {
    resetData();
    PrivateAxios.get(`patients/` + id).then((response) => {
      // debugger;
      var result = response.data;
      pat.doctorFee = result.doctor.doctorFee;
      pat.wardCharges = result.ward.wardCharges;
      getHealthHistory(id);
    });
  };
  const handleChange = (event, property) => {
    console.log(pat);
    setPat({ ...pat, [property]: event.target.value });
  };

  const GenerateInvoice = () => {
    var doc = new JsPDF("p", "pt", "letter");
    // Supply data via script
    var body = [
      ["Doctor Fee ", pat.doctorFee],
      ["Medicine Charges ", pat.medicineCharges],
      ["Ward Charges ", pat.wardCharges],
      ["Total Amount ", pat.TotalAmount],
      ["Paid Amount ", pat.paidAmount],
    ];
    // generate auto table with body
    var y = 10;
    doc.setLineWidth(2);
    doc.text(200, (y = y + 30), "Hospital Management System");
    doc.autoTable({
      body: body,
      startY: 70,
      theme: "grid",
    });
    // save the data to this file
    doc.save("hms");
  };

  return (
    <div>
      <Base>
        <br />
        <br />
        <br />
        <Row>
          <Col sm={{ size: 3 }}>
            <VericalNavbarAccountant />
          </Col>
          <Col sm={{ size: 9 }}>
            <Container>
              <Table hover responsive size="" striped className="w-100  p-3">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Contact</th>
                    <th>E-Mail</th>
                    <th>Update Payment / Generate Invoice</th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data?.content?.map((user) => {
                      return (
                        <tr key={user?.user.id}>
                          <th scope="row">{user?.id}</th>
                          <td>{user?.user.firstName}</td>
                          <td>{user?.user.gender}</td>
                          <td>{user?.user.dob}</td>
                          <td>{user?.user.mobileNo}</td>
                          <td>{user?.user.email}</td>
                          <td>
                            <Button
                              onClick={() => {
                                UpdatePayment(user.id);
                              }}
                              style={styles.button}
                              className="btn btn-sm btn-success"
                            >
                              Update Payemnt
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
            </Container>
          </Col>
        </Row>
        <Modal
          isOpen={modal}
          toggle={toggle}
          centered={true}
          scrollable={true}
          size={"md"}
        >
          <ModalHeader toggle={toggle}>Update Patient Payment</ModalHeader>
          <ModalBody>
            <>
              <Table>
                <tbody>
                  <tr>
                    <th>doctor fee = </th>
                    <td>{pat.doctorFee}</td>
                  </tr>
                  <tr>
                    <th>Ward Charges for {pat.days} days = </th>
                    <td>{pat.wardCharges}</td>
                  </tr>
                  <tr>
                    <th>Medicine Charges = </th>
                    <td>{pat.medicineCharges}</td>
                  </tr>
                  <tr>
                    <th>Total Amount = </th>
                    <td>{pat.TotalAmount}</td>
                  </tr>
                  <tr>
                    <th>Paid Amount = </th>
                    <td>{pat.paidAmount}</td>
                  </tr>
                  <tr>
                    <th>Remaining Amount = </th>
                    <td>{pat.RemainingAmount}</td>
                  </tr>
                  <tr>
                    <th>Amount To pay = </th>
                    <td>
                      <Input
                        type="number"
                        placeholder="Enter Here"
                        id="pay"
                        onChange={(e) => {
                          handleChange(e, "pay");
                        }}
                        value={pat.pay}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <Button
                        outline
                        color="primary"
                        onClick={UpdatePaidAmount}
                      >
                        Pay
                      </Button>
                    </th>
                    <th>
                      <td>
                        <Button
                          outline
                          color="primary"
                          onClick={GenerateInvoice}
                        >
                          Invoice
                        </Button>
                      </td>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </>
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
export default PatientAccountList;
