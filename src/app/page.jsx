"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";
import { useRouter } from "next/navigation";
import {useState,useEffect } from "react";

import Login from "@/components/login/Login";

export default function Home() {
  const router = useRouter();
  const[addpro, setAddPro] = useState(false)
  const [message, setMessage] = useState("");
  const[Loginitem,setLoginItem] =useState(null)
  
  useEffect(() => {
    const storedLogin = localStorage.getItem("selectedItem for login");
    if (storedLogin) {
      setLoginItem(JSON.parse(storedLogin));
    }
  }, []);
const logOutHandler = ()=>{
  localStorage.removeItem("selectedItem for login",);
}
  // Function to handle data from child
  const cartHandle = (item) =>{
    console.log(item)
    localStorage.setItem("selectedItem for cart", JSON.stringify(item));
  }
  const onUpdateHandle = (item) => {
    console.log("item world");
    console.log(item)
    localStorage.setItem("selectedItem for Update", JSON.stringify(item));
    router.push("/updateProForm");
  }

  return (
    <div className="  font-[family-name:var(--font-geist-sans)]">
     
      <Navbar />
      <ShopGrid />
      {Loginitem ?
       <div>
        <button className="mt-4  px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"onClick={() => setAddPro(true)}>Add new product</button> <br/>
        <button className="mt-4  px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={logOutHandler}>Logout</button>
        </div>
:null}
            <Login/>
      <DisplayProduct onUpdateHandle={onUpdateHandle} cartHandle={cartHandle} />
      
      {
        addpro && <AddProduct onClose={() => setAddPro(false)} />
      }
      {/* <CartProducts /> */}
      
    </div>
  );
}
