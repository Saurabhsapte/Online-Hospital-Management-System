import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";
import web from "../../images/nh.jpg"
import Base from "../Base/Base";


const Common = (props) => {
  return (
    <>
      <section id="header" className="d-flex align-items-center">
      <div className="container-fluid ">
            <div classNamerow='row'>
                <div className="col-10 mx-auto">
                  <div className="row">

                  
                 <div   className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center">
                  <h1> Welcome to<strong className="brand-name"> HMS </strong> {props.name}
                  </h1>
                   <h2 className="my-3">
                   We are the team of talented health care Professionals
                   </h2>
                   <div className="mt-3">
                    <NavLink to={props.visit} className="btn-get-started">
                      
                      {props.btname}
                      </NavLink>

                   </div>
                 </div>
                 <div className="col-lg-6 order-1 order-lg-2 header-img"></div>
                 {/* <img  src= {web} className="img-fluid animated" alt="home img"/> */}
                </div>
                </div>
            </div>
        </div>
      </section>
      
      </>
  );
}

export default Common;
