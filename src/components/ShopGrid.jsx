import React from "react";

const ShopGrid = () => {
  return (
    <div className="relative w-screen h-screen mb-20 overflow-hidden">
 
  <video
    src="demo.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  ></video>

 
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

  
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
  <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
    Welcome to Nova Tech
  </h1>
  <p className="text-lg md:text-2xl mt-4 animate-slide-up">
    Timeless Watches for Every Moment
  </p>
</div>

</div>

  );
};

export default ShopGrid;
