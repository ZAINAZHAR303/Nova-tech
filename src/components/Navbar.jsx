"use client";
import {
  AccountCircleOutlined,
  LocalMallOutlined,
  Search,
  ViewWeek,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import CartProducts from "./CartProducts";
import Login from "./login/Login";

const Navbar = ({ setquery }) => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loginFun, setLoginFun] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [cartAmount, setCartAmount] = useState("");
  // Update `isMobileView` based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initialize on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart data or an empty array
    setCartAmount(cart.length);
  }, []);
  return (
    <>
      <nav className="flex justify-between relative items-center p-4 w-full my-4 bg-white">
        {!showSearch || !isMobileView ? (
          <div className="flex flex-row-reverse items-center gap ">
            {/* <h3 className="text-2xl font-bold text-black md:block">
              NOVATECH
            </h3> */}
            <img className="h-[40px] w-[40px] border " src="logo.png" alt="lgog" />
          </div>
        ) : null}
        {showSearch || !isMobileView ? (
          <div className="md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:w-[400px]">
            <input
              type="text"
              placeholder="Search"
              className="border border-black px-4 py-2 rounded-3xl shadow-md focus:outline-none transition-all duration-300 ease-in-out transform opacity-100 md:w-full"
              onChange={(e) => setquery(e.target.value.toLowerCase())}
            />
          </div>
        ) : null}
        <div className="flex gap-4">
          <Search
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          />
          <div className=" relative ">
            <LocalMallOutlined onClick={() => setShowCart(true)} />
            <div className="h-4 w-4 bg-[#33D286] rounded-full flex justify-center items-center absolute -top-1 left-3">
              <p className="text-white text-xs font-semibold ">{cartAmount}</p>

            </div>
          </div>
          {!showSearch || !isMobileView ? (
            <>
          <AccountCircleOutlined onClick={() => setLoginFun(!loginFun)} />
          <ViewWeek className="rotate-90" />
          </>
          ):null
        }

        </div>
      </nav>
      {showCart && (
        <div className="absolute right-0 top-16 z-10">
          <CartProducts onClose={() => setShowCart(false)} />
        </div>
      )}
      {loginFun && (
        <div>
          <Login onClose={() => setLoginFun(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
