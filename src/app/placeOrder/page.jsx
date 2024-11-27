"use client";
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Page() {
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
        };

        try {
            // Sending the customer data to EmailJS
            const response = await emailjs.send(
                "service_fx6cqwa",     // Replace with your EmailJS service ID
                "template_uilhudq",    // Replace with your EmailJS template ID
                customerDetails,       // The customer details to send
                "gAXpbzydyb4oTm53K"         // Replace with your EmailJS user ID
            );
            console.log('Email sent successfully', response);
            alert('Order confirmation sent!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send confirmation. Please try again later.');
        }
    };

    return (
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={submitHandler}>
                <input value={email} type="email" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} /><br />
                <input value={firstName} type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} /><br />
                <input value={lastName} type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} /><br />
                <input value={address} type="text" placeholder="Your Address" onChange={(e) => setAddress(e.target.value)} /><br />
                <input value={phone} type="text" placeholder="Your Phone Number" onChange={(e) => setPhone(e.target.value)} /><br />
                <input value={postalCode} type="text" placeholder="Postal Code" onChange={(e) => setPostalCode(e.target.value)} /><br />
                <button type="submit">Confirm order</button>
            </form>
            <h2>Payment method: Cash on delivery</h2>
        </div>
    );
}
