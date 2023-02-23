import React from 'react';


import Footer from '../partials/Footer';
import Menu from './main/menu';

function Main() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      
      <Menu/>


      <Footer />
    </div>
  );
}

export default Main;