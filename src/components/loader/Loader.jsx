import React from 'react';
import './loader.css'; // Import the loader.css file

const Loader = () => {
  return (
    <div className="loader-container h-screen w-screen flex  justify-center items-center  ">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
