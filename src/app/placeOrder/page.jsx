"use client";

import { useState, useEffect, Suspense } from "react";
import emailjs from "emailjs-com";

function PlaceOrder() {
  
  
  const [total, setTotal] = useState("");
  const [cartitems, setCartItems] = useState([]);

  useEffect(() => {
    const storedTotal = localStorage.getItem("totalPrice") || "0";
    setTotal(storedTotal);
    
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [searchParams]); 

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const customerDetails = {
      email,
      firstName,
      lastName,
      address,
      phone,
      postalCode,
      totalPrice: total,
      items: [
        { name: "Product 1", image: "https://example.com/image1.jpg" },
        { name: "Product 2", image: "https://example.com/image2.jpg" },
      ],
    };

    console.log("Total Price:", total);

    try {
      // Sending the customer and order data to EmailJS
      const response = await emailjs.send(
        "service_fx6cqwa",
        "template_uilhudq", // Replace with your EmailJS template ID
        customerDetails, // The customer and order details to send
        "gAXpbzydyb4oTm53K" // Replace with your EmailJS user ID
      );
      console.log("Email sent successfully", response);
      alert("Order confirmation sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send confirmation. Please try again later.");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="grid grid-cols-1 items-center h-screen lg:grid-cols-2 w-full">
      <div className="flex items-center gap-4 flex-col lg:h-full lg:items-start lg:pt-[55px] lg:pl-[50px] rounded-lg w-full p-4 ">
        {cartitems.map((item) => (
          <div
            key={item.id}
            className="h-[125px] w-[400px] border p-4 rounded-md flex items-center justify-start">
            <img
              src={item.image}
              alt={item.name}
              className="h-[120px] w-[120px]"
            />
            <div className="flex flex-col ml-4 gap-2  ">
              <h1 className="text-[20px] font-semibold ">{item.name}</h1>
              <h1 className="text-[15px] font-semibold text-[#FF4545]">
                {item.price} RS.
              </h1>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col items-center justify-center">
        <input
          className="custom-input"
          value={email}
          type="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="custom-input"
          value={firstName}
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="custom-input"
          value={lastName}
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="custom-input"
          value={address}
          type="text"
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="custom-input"
          value={phone}
          type="text"
          placeholder="Your Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="custom-input"
          value={postalCode}
          type="text"
          placeholder="Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <h1 className="flex gap-2 ">
          Total price of your order:
          <p className="text-[#FF4545] font-semibold">{total}</p>
        </h1>
        <button
          className=" h-[40px] bg-[#212121] mb-[8px] text-white w-[80%] lg:w-[500px] font-medium mt-[20px]"
          type="submit">
          Confirm order
        </button>
        <h2 className="text-center">Payment method: Cash on delivery</h2>
      </form>
    </div>
    </Suspense>
  );
  
}

export default PlaceOrder;
