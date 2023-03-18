import React from "react";
import { Container } from "reactstrap";
import Base from "../Base/Base";
import Card from "../../Component/Card/Card";
import Sdata from "../Sdata/Sdata";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BaseCart from "../Base/BaseCart";

function Services() {
  return ( <BaseCart>   
        <div className="my-5">
          <h1 className="text-center">Our Services</h1>
        </div>
        <div className="container-fluid mb-5">
          <div classNamerow="row">
            <div className="col-10 mx-auto">
              <div className="row gy-4">
                {Sdata.map((val, ind) => {
                  return (
                    <Card
                      key={ind}
                      imgsrc={val.imgsrc}
                      title={val.title}
                      desc={val.desc}
                    />
                  );
                })}
              </div>
            </div>
          </div>
      </div></BaseCart>

  );
}

export default Services;
