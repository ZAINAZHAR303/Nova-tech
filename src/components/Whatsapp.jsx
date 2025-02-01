import React from 'react'
import { AiOutlineWhatsApp } from 'react-icons/ai';



export const Whatsapp = () => {
    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hello! I'm from your Nova Tech and would like to chat.");
        window.open(`https://wa.me/923184322655?text=${message}`, "_blank")
      };
    return (
        <div className="z-30 fixed bottom-8 right-10 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-2xl">
            <AiOutlineWhatsApp onClick={handleWhatsApp} size={35} />
            <span className="text-lg font-medium">Chat</span>
        </div>
    )
}
