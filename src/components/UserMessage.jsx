"use client";

import React, { useEffect } from 'react';

const UserMessage = ({ color, message, duration = 1000,hideMessage }) => {
    console.log(color);
  useEffect(() => {
    const timer = setTimeout(() => {
      
      hideMessage();
    }, duration);

    
    return () => clearTimeout(timer);
  }, [duration, hideMessage]);

  return (
    <div style={{ backgroundColor: color, }} className={`  h-[3rem] w-[80%] rounded-xl flex items-center justify-center fixed top-8`}>
      <p>{message}</p>
    </div>
  );
};

export default UserMessage;