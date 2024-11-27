"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import emailjs from "emailjs-com";

function PlaceOrder() {
  const router = useRouter();
  const totalPrice = router.query?.totalPrice || 0;

  // Parse the cartItems from the query string (handle potential errors)
//   const parsedCartItems = JSON.parse(cartItems) || []; // Return empty array if parsing fails

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
      totalPrice,
    };
console.log(totalPrice)
    try {
      // Sending the customer and order data to EmailJS
      const response = await emailjs.send(
        "service_fx6cqwa", // Replace with your EmailJS service ID
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
    <div className="flex items-center justify-center h-screen w-full ">
      <form onSubmit={submitHandler}>
        <input
          className="custom-input"
          value={email}
          type="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="custom-input"
          value={firstName}
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <input
          className="custom-input"
          value={lastName}
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.query.value)} // Corrected typo
        />
        <br />
        <input
          className="custom-input"
          value={address}
          type="text"
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          className="custom-input"
          value={phone}
          type="text"
          placeholder="Your Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          className="custom-input"
          value={postalCode}
          type="text"
          placeholder="Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <br />
        <button
          className="w-full h-[40px] bg-[#212121] mb-[8px] text-white font-medium mt-[20px]"
          type="submit"
        >
          Confirm order
        </button>
        <h2 className="text-center">Payment method: Cash on delivery</h2>
      </form>
    </div>
  );
}

export default PlaceOrder;