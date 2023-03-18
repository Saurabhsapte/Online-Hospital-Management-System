import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Foot() {
  return (
    <MDBFooter bgColor='light' className='fixed-bottom text-center text-lg-start text-muted'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='/'>
          HMS.com
        </a>
      </div>
    </MDBFooter>
  );
}