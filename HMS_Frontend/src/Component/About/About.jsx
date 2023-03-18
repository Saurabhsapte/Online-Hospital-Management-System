import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";
import web from "../../images/nh.jpg"
import Base from "../Base/Base";
import BaseCart from "../Base/BaseCart";
import Common from "../Common/Common";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


const About = () => {
  return (
    <BaseCart>

    <>
      <Common   name="About Page"  visit="/contact" btname="Contact Now"/>
      {/* <Common   name="About Page" imgsrc={web} visit="/contact" btname="Contact Now"/> */}
      </>
      </BaseCart>
  );
}

export default About;
