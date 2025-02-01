"use client";

import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";



import { AddCircleOutlined, LogoutOutlined } from "@mui/icons-material";
// import Loader from "@/components/loader/Loader";
import Footer from "@/components/Footer";
// import Whatsapp from "@/components/whatsapp/whatsapp";

export default function Home() {
  const router = useRouter();
  const [addpro, setAddPro] = useState(false);


  const [query, setquery] = useState("");
  // const [login, setlogin] = useState(false);

  const [Loginitem, setLoginItem] = useState(null);
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm from your Nova Tech and would like to chat.");
    window.open(`https://wa.me/923184322655?text=${message}`, "_blank")
  };

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
      <div className="z-30 fixed bottom-8 right-10 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-2xl">
        <AiOutlineWhatsApp onClick={handleWhatsApp} size={35} />
        <span className="text-lg font-medium">Chat</span>
      </div>
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
