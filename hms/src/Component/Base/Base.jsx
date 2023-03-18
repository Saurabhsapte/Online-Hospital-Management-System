import React from 'react'
import CustomeNavBar from '../CustomeNavBar/CustomeNavBar'
import Foot from '../Home/Footer';

const Base = ({children})  =>{
  
  
  return (
    <div className="container-fluid p-0 m-0">
        <CustomeNavBar  /><br/><br/>
      {children}
      <br/><br/><br/>
      <Foot/>
    </div>
);
}

export default Base
