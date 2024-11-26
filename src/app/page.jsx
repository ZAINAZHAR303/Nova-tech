"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const onUpdateHandle = (item) => {
    console.log("item world");
    console.log(item)
    localStorage.setItem("selectedItem", JSON.stringify(item));
    router.push("/updateProForm");
  }

  return (
    <div className="  font-[family-name:var(--font-geist-sans)]">
     
      <Navbar />
      <ShopGrid />
      <DisplayProduct onUpdateHandle={onUpdateHandle} />
      <AddProduct />
    </div>
  );
}
