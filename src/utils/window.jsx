import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.className === 'modal') {
        onClose();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal bg-gray-500 bg-opacity-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="modal-content bg-white w-700 h-500 p-8">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
