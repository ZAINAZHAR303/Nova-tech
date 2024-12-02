"use client";


import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../loader/Loader";

export default function DisplayProduct({ onUpdateHandle, cartHandle, query }) {
  const [products, setProducts] = useState([]);
  const [Loginitem, setLoginItem] = useState(null);
  const [loadings, setLoadings] = useState(false);
  useEffect(() => {
    const storedLogin = localStorage.getItem("selectedItem for login");
    if (storedLogin) {
      setLoginItem(JSON.parse(storedLogin));
    }
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Calculate x position as a percentage
    const y = ((e.clientY - top) / height) * 100; // Calculate y position as a percentage
    setPosition({ x, y });
  };
  const handleMouseLeave = () => {
    setPosition({ x: 50, y: 50 }); // Reset to center (50% 50%)
  };
  // State to hold the fetched products

  const getProducts = async () => {
    
    try {
      setLoadings(true); // Show loading spinner
      const collectionRef = collection(db, "products");
      const docs = await getDocs(collectionRef);
      let data = [];
      docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() }); // Store document ID and data
      });
      setProducts(data);
      setLoadings(false); // Hide loading spinner
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoadings(false); // Hide loading spinner
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
    <div className="grid grid-col-1 md:grid-cols-3 bg-white  xl:grid-cols-4  items-center justify-center mt-[20px]">
      {loadings? (<Loader />):( products
        .filter((item) => item.name.toLowerCase().includes(query))
        .map((item) => (
          <div
            key={item.id}
            className=" flex flex-col items-center justify-center w-full p-4 rounded-lg border-l-1 ">
            {/* React Slick Slider */}
            <Slider
              {...sliderSettings}
              className="w-[209px]  mb-4 flex items-center justify-center">
              <div
                className="custom-div image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <img
                  src={item.image1url}
                  className="zoom-image custom-div object-cover"
                  alt="Product Image 1"
                  style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    
                  }}
                />
              </div>
              <div
                className="custom-div image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <img
                  src={item.image2url}
                  className="zoom-image custom-div object-cover"
                  alt="Product Image 2"
                  style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    // transform: "scale(2)", // Adjust the zoom level here
                  }}
                />
              </div>
              <div
                className="custom-div image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>
                <img
                  src={item.image3url}
                  className="zoom-image custom-div bg-cover"
                  alt="Product Image 3"
                  style={{
                    transformOrigin: `${position.x}% ${position.y}%`,
                    // transform: "scale(2)", // Adjust the zoom level here
                  }}
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
            <button
              onClick={() => cartHandle(item)}
              className="mt-2 px-4 py-2 border-[0.5px] border-[#212121] text-[#212121] font-light rounded transform transition-transform transition-colors duration-300 ease-in-out hover:text-white hover:border-transparent hover:bg-red-500">
              ADD TO CART
            </button>

            {/* Delete Button */}
            {Loginitem ? (
              <div>
                <div className="flex gap-4">
                  <button
                    onClick={() => onDeleteHandler(item.id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95">
                    Delete
                  </button>
                  <button
                    onClick={() => onUpdateHandle(item)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95">
                    Update
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          // </div>
        )))}
     
    </div>
  );
}