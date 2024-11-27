"use client"
import { LocalMallOutlined, Search, ViewWeek } from "@mui/icons-material";
import React, { useState } from "react";
import CartProducts from "./CartProducts";
// import {logo} from "../assets/logo.jpg"
const Navbar = () => {
  const [showCart, setShowCart] = useState(false);


  return (
    <>
    <nav className="flex justify-between items-center p-4 w-full my-4 bg-white  ">
      <h3 className="text-2xl font-bold text-orange-400 ">NOVA TECH</h3>

      <div className="flex gap-4">
        <Search className="" />
        <LocalMallOutlined onClick={() => setShowCart(true)} />
        <ViewWeek className="rotate-90 "   />
      </div>
      {/* {showCart && <CartProducts onClose={() => setShowCart(false)} />} */}
    </nav>
    {showCart && (
      <div className="absolute right-0 top-16 z-10">
        <CartProducts onClose={() => setShowCart(false)} />
      </div>
    )}
    </>
  );
};

export default Navbar;
