import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  UncontrolledCarousel,
} from "reactstrap";
import web from "../../images/nh.jpg";
import Base from "../Base/Base";
import Common from "../Common/Common";
import image from "../Home/mother-child.jpg";
import we from "../../images/sd.jpg";
import CreateCorosol from "../carsoul";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BaseCart from "../Base/BaseCart";

const Home = () => {
  return (
    <BaseCart>
    <div className="container-fluid">
          <CreateCorosol></CreateCorosol>

          {/* <Common name="Home Page" visit="/services" btname="Get Started" /> */}

          {
            <Common
              name="Home Page"
              imgsrc={web}
              visit="/Login"
              btname="Get Started"
            />
          }
          <Card className="px-5">
            <CardHeader>
              <h2>Mission</h2>
            </CardHeader>
            <CardBody>
              <b>
                <p className="px-5">
                  We are committed to maintain the highest standard of care and
                  respond to the needs of the community in a compassionate
                  manner.To provide state-of-the-art, high quality and
                  cost-effective healthcare services and latest information to
                  improve and maintain health for the well-being of the
                  community. To unrelentingly pursue the creation of value for
                  our customers, employees and society at large.To foster a
                  therapeutic relationship based on compassion that is felt,
                  quality that is measurable and cost that is affordable. To
                  become partners in health promotion with every section of
                  society.
                </p>
              </b>
            </CardBody>
        </Card>
      </div></BaseCart>
  );
};

export default Home;
