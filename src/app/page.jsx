import Image from "next/image";
import Navbar from "../components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import DisplayProduct from "@/components/displayProduct/DisplayProduct";
import AddProduct from "@/components/addProduct/AddProduct";

export default function Home() {
  return (
    <div className="  font-[family-name:var(--font-geist-sans)]">
     
      <Navbar />
      <ShopGrid />
      <DisplayProduct />
      <AddProduct />
    </div>
  );
}
