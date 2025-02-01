"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { doc, getDoc } from "firebase/firestore"; // Import getDoc from firestore
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Loader from "@/components/loader/Loader";
import CartProducts from "@/components/CartProducts";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { Whatsapp } from "@/components/Whatsapp";

export default function Page() {
  const [id, setId] = useState(null);
  const [key, setKey] = useState(null);
  const [storedItem, setStoredItem] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  const [showCart, setShowCart] = useState(false);
  
  const cartHandle = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item already exists, increase its quantity
      cart[existingItemIndex].quantity += 1;
      console.log("Item quantity increased:", cart[existingItemIndex].quantity);
    } else {
      cart.push({ ...item, quantity: 1 });
      console.log("New item added to the cart with quantity 1.");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowCart(true); // Show the cart
  };

  useEffect(() => {
    const product = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("id");
      const productKey = params.get("key");

      setId(productId); // Set the 'id' from URL
      setKey(productKey);

      if (productKey === "6789") {
        const itemsInComp = JSON.parse(localStorage.getItem("selectedProduct")) || {};
        setStoredItem(itemsInComp); // Set the product details from localStorage
      } else {
        console.log("fetch from db");

        if (productId) {
          const getProducts = async () => {
            try {
              // Check if id is valid
              const docRef = doc(db, "products", id); // Use 'doc' to specify the document by ID
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                console.log("Fetched product:", docSnap.data());
                setStoredItem(docSnap.data());  // Set the fetched product data
              } else {
                console.log("No such product found!");
                setStoredItem(null);
              }
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };

          getProducts(); // Call the function to fetch product by ID
        } else {
          console.error("Invalid product ID or product ID not found in URL.");
        }
      }

      console.log("data in the component", productId, productKey);
    };
    product();
  }, [id, key]); // Re-run effect when 'id' or 'key' changes

  // Store images in an array (filter out undefined values)
  const images = storedItem ? [storedItem.image1url, storedItem.image2url, storedItem.image3url].filter(Boolean) : [];

  // Set the first image as default large image once the storedItem is available
  useEffect(() => {
    if (images.length > 0) {
      setLargeImage(images[0]); // Set the first image as large image
    }
  }, [storedItem]); // Only run this effect when storedItem is updated

  if (!storedItem) {
    return (
      <div>
        <Navbar />
        {/* Loading section */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl text-gray-600">
            <Loader/>
          </div>
        </div>
        <Footer />
      </div>
    ); // Ensure loading state until storedItem is fetched
  }

  return (
    <div className="bg-white">
     <Whatsapp />
      <Navbar />


      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Card Container */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Section: Images */}
          <div className="w-full lg:w-1/2 p-3 flex flex-col items-center">
            {/* Large Image Display */}
            <div className="w-full max-w-md h-[310px] overflow-hidden rounded-lg shadow-lg">
              {largeImage ? (
                <img
                  src={largeImage}
                  alt="Product"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              ) : (
                <div>Loading Image...</div>
              )}
            </div>

            {/* Small Thumbnails */}
            <div className="flex gap-4 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 rounded-lg cursor-pointer border-2 shadow-md ${
                    largeImage === image ? "border-red-500 scale-110" : "border-gray-300"
                  } transition-all duration-200 hover:scale-110`}
                  onClick={() => setLargeImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Section: Product Info */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center bg-gray-50">
            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{storedItem.name}</h1>

            {/* Product Description */}
            <p className="text-sm sm:text-lg text-gray-600 mt-2">{storedItem.description}</p>

            {/* Pricing Section */}
            <div className="mt-3">
              <p className="text-lg text-gray-500 line-through">RS.{storedItem.oldPrice}</p>
              <p className="text-2xl font-semibold text-red-500">RS.{storedItem.price}</p>
            </div>

            {/* Add to Cart Button */}
            <button onClick={() => cartHandle(storedItem)} className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-[#FF6347] to-[#FF4500] text-white font-medium rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2">
              <FaCartPlus className="text-xl" />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <Footer />
      {showCart && (
        <div className="absolute right-0 top-16 z-10">
          <CartProducts onClose={() => setShowCart(false)} />
        </div>
      )}
    </div>
    
  );
}
