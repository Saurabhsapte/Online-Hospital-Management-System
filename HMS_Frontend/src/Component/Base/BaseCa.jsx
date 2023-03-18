import React from 'react'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const BaseCa= ({children})  =>{
  
  return (
    <div className="container-fluid p-0 m-0">
      {children}
    </div>
);
}

export default BaseCa
