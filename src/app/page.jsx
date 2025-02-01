"use client";

import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";



import { AddCircleOutlined, LogoutOutlined, WhatsApp } from "@mui/icons-material";

import Footer from "@/components/Footer";
import { Whatsapp } from "@/components/Whatsapp";


export default function Home() {
  const router = useRouter();
  const [addpro, setAddPro] = useState(false);


  const [query, setquery] = useState("");
  // const [login, setlogin] = useState(false);

  const [Loginitem, setLoginItem] = useState(null);


  useEffect(() => {
    const storedLogin = localStorage.getItem("selectedItem for login");
    if (storedLogin) {
      setLoginItem(JSON.parse(storedLogin));
    }
  }, []);
  const logOutHandler = () => {
    localStorage.removeItem("selectedItem for login");
  };
  // Function to handle data from child

  const onUpdateHandle = (item) => {
    localStorage.setItem("selectedItem for Update", JSON.stringify(item));
    router.push("/updateProForm");
  };

  return (
    <div className=" bg-white  font-[family-name:var(--font-geist-sans)]">
    <Whatsapp />
      <Navbar setquery={setquery} />
      <ShopGrid />
      {Loginitem ? (
        <div className="flex items-center mt-4 ml-4 gap-4 ">
          <AddCircleOutlined onClick={() => setAddPro(true)} />

          <LogoutOutlined onClick={logOutHandler} />
        </div>
      ) : null}


      <DisplayProduct

        onUpdateHandle={onUpdateHandle}
        // cartHandle={cartHandle}
        query={query} />
      <Footer />

      {addpro && <AddProduct onClose={() => setAddPro(false)} />}

    </div>
  );
}
