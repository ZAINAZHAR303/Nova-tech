import { LocalMallOutlined, Search, ViewWeek } from "@mui/icons-material";
import React from "react";
// import {logo} from "../assets/logo.jpg"
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 w-full my-4 bg-white  ">
      <h3 className="text-2xl font-bold text-orange-400 ">NOVA TECH</h3>

      <div className="flex gap-4">
        <Search className="" />
        <LocalMallOutlined />
        <ViewWeek />
      </div>
    </nav>
  );
};

export default Navbar;
