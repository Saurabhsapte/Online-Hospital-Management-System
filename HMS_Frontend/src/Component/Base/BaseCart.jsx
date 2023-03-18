import React from 'react'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const BaseCart = ({children})  =>{
  
  return (
    <div className="container-fluid p-0 m-0">
      <Navbar/>
      {children}
      <Footer/>
    </div>
);
}

export default BaseCart
