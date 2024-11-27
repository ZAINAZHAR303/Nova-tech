"use client"
import { LocalMallOutlined, Search, ViewWeek } from "@mui/icons-material";
import React, { useState } from "react";
import CartProducts from "./CartProducts";
// import {logo} from "../assets/logo.jpg"
const Navbar = ({setquery}) => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch,setShowSearch] = useState(false)

  return (
    <>
    <nav className="flex justify-between items-center p-4 w-full my-4 bg-white  ">
    {!showSearch && (
        <h3 className="text-2xl font-bold text-orange-400">NOVA TECH</h3>
      )}
      {
        showSearch &&(
          <input
            type="text"
            placeholder="Search"
            className="border border-black px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ease-in-out transform opacity-100"
            onChange={(e) => setquery(e.target.value.toLowerCase())}
            style={{ opacity: showSearch ? 1 : 0, transform: showSearch ? 'scale(1)' : 'scale(0.9)' }}
          />
        )
      }
      <div className="flex gap-4">
        <Search className="" onClick={() => setShowSearch(!showSearch)} />
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
