"use client";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DisplayProduct({onUpdateHandle,cartHandle}) {
  const [products, setProducts] = useState([]);
  const[Loginitem,setLoginItem] =useState(null)

  useEffect(() => {
    const storedLogin = localStorage.getItem("selectedItem for login");
    if (storedLogin) {
      setLoginItem(JSON.parse(storedLogin));
    }
  }, []);

  // State to hold the fetched products

  const getProducts = async () => {
    try {
      const collectionRef = collection(db, "products");
      const docs = await getDocs(collectionRef);
      let data = [];
      docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() }); // Store document ID and data
      });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onDeleteHandler = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      await deleteDoc(docRef);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  

  useEffect(() => {
    getProducts();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,

  };

  return (
    <div className="flex flex-col items-center justify-center mt-[20px]">
      {products.map((item) => (
        <div
          key={item.id}
          className=" flex flex-col items-center justify-center w-full p-4 rounded-lg ">
          {/* React Slick Slider */}
          <Slider {...sliderSettings} className="w-[400px] bg-green-200 mb-4 flex items-center justify-center">
            <div className="custom-div">
              <img
                src={item.image}
                className=" custom-div object-cover"
                alt="Product Image 1"
              />
            </div>
            <div className="custom-div">
              <img
                src={item.image1}
                className="custom-div object-cover"
                alt="Product Image 2"
              />
            </div>
            <div className="custom-div">
              <img
                src={item.image2}
                className="custom-div bg-cover"
                alt="Product Image 3"
              />
            </div>
          </Slider>

          {/* Product Details */}
          <p className="text-sm text-gray-700 text-[13px] my-[10px]">
            {item.description}
          </p>
          <h2 className="text-xl text-[15px] text-[#171717] font-medium">
            {item.name}
          </h2>
          <p className="text-lg  font-semibold my-[8px] text-[#FF4545]">
            RS: {item.price}
          </p>

          {/* Delete Button */}
          {
            Loginitem? <div>
            <button
              onClick={() => onDeleteHandler(item.id)}
              className="mt-4  px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
            <button
              onClick={()=>onUpdateHandle(item)}
              className="mt-4  px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              update
            </button>
            
            </div>
          :null  
          }
          <button onClick={()=>cartHandle(item)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-red-700">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
