import React, { useState } from "react";
import { Container } from "reactstrap";
import Base from "../Base/Base";
import BaseCart from "../Base/BaseCart";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Home() {
  const [data, setData]= useState({
    fullname:'',
    phone:'',
    email:'',
    msg:','
  });
  const InputEvent = (event) =>{
   const {name, value}= event.target;

   setData((preVal) =>{
    return {
      ...preVal,
      [name]: value,
    };
   });
  };
  const formSubmit = (e) => {e.preventDefault();};
  return (
    <BaseCart>
    <>
      
    <div className="my-5">
     <h1 className="text-center">
      Contact Us
     </h1>
    </div>
    <div className="container contact_div">
    <div className="row">
      <div className="col-md-6 col-10 mx-auto">
    <form onSubmit={formSubmit}>
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Full Name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" name="full name" value={data.fullname} onChange={InputEvent} placeholder="Enter Your Name" />
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" name="phone number" value={data.phone} onChange={InputEvent} placeholder="Enter Your Phone Number" />
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1"  name="email" value={data.email} onChange={InputEvent}  placeholder="name@example.com" />
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Message</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="msg" value={data.msg} onChange={InputEvent}></textarea>
</div>
<div class="col-12">
    <button class="btn btn-outline-primary" type="submit">Submit form</button>
  </div>
    </form>
      </div>

    </div>
      </div>
    </></BaseCart>
  );
}

export default Home;
