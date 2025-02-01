import { AiOutlineWhatsApp } from "react-icons/ai";
import React from "react";

export default function Whatsapp() {
  return (
    <div className="h-screen w-screen ">
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110">
      <AiOutlineWhatsApp size={40} />
    </div>

    </div>    
);
}
