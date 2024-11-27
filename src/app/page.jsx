"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartProducts from "@/components/CartProducts";

export default function Home() {
  const router = useRouter();
  const[addpro, setAddPro] = useState(false)
  const [message, setMessage] = useState("");
  const[query,setquery] = useState("")

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
     
      <Navbar setquery={setquery} />
      <ShopGrid />
      <DisplayProduct onUpdateHandle={onUpdateHandle} cartHandle={cartHandle} query={query} />
      <button onClick={() => setAddPro(true)}>hello Product</button>
      {
        addpro && <AddProduct onClose={() => setAddPro(false)} />
      }
      {/* <CartProducts /> */}
    </div>
  );
}
