"use client";

import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function PlaceOrder() {
  const [total, setTotal] = useState("");
  const [cartitems, setCartItems] = useState([]);
  const [concatenatedString, setConcatenatedString] = useState("");

  // Load cart items and total price from localStorage
  useEffect(() => {
    const storedTotal = localStorage.getItem("totalPrice") || "0";
    setTotal(JSON.parse(storedTotal));

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Concatenate cart items into a string
  useEffect(() => {
    const fetchCombinedString = () => {
      const formattedString = cartitems
        .map((item, index) => {
          return `Item ${index + 1}:\n` +
            `Name: ${item.name || "N/A"}\n` +
            `Price: ${item.price || "N/A"}\n` +
            `Image: ${item.image || "N/A"}\n`;
        })
        .join("\n");
      setConcatenatedString(formattedString);
    };

    fetchCombinedString();
  }, [cartitems]);

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    postalCode: Yup.string()
      .matches(/^\d+$/, "Postal code must be numeric")
      .required("Postal code is required"),
  });

  const submitHandler = async (values, { resetForm }) => {
    const customerDetails = {
      ...values,
      totalPrice: total,
      concatenatedString,
    };

    try {
      // Sending the customer and order data to EmailJS
      const response = await emailjs.send(
        "service_fx6cqwa",
        "template_uilhudq",
        customerDetails,
        "gAXpbzydyb4oTm53K"
      );
      console.log("Email sent successfully", response);
      alert("Order confirmation sent!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send confirmation. Please try again later.");
    }
  };

  return (
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
            <div className="flex flex-col ml-4 gap-2">
              <h1 className="text-[20px] font-semibold">{item.name}</h1>
              <h1 className="text-[15px] font-semibold text-[#FF4545]">
                {item.price} RS.
              </h1>
            </div>
          </div>
        ))}
      </div>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          phone: "",
          postalCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        {() => (
          <Form className="w-full flex flex-col items-center justify-center">
            <Field
              name="email"
              type="email"
              placeholder="Your email"
              className="custom-input"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />

            <Field
              name="firstName"
              type="text"
              placeholder="First Name"
              className="custom-input"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500" />

            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="custom-input"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500" />

            <Field
              name="address"
              type="text"
              placeholder="Your Address"
              className="custom-input"
            />
            <ErrorMessage name="address" component="div" className="text-red-500" />

            <Field
              name="phone"
              type="text"
              placeholder="Your Phone Number"
              className="custom-input"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500" />

            <Field
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              className="custom-input"
            />
            <ErrorMessage name="postalCode" component="div" className="text-red-500" />

            <h1 className="flex gap-2">
              Total price of your order:
              <p className="text-[#FF4545] font-semibold">{total}</p>
            </h1>
            <button
              className="h-[40px] bg-[#212121] mb-[8px] text-white w-[80%] lg:w-[500px] font-medium mt-[20px]"
              type="submit">
              Confirm order
            </button>
            <h2 className="text-center">Payment method: Cash on delivery</h2>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PlaceOrder;
