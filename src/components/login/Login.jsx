"use client"

import { useRef, useState } from "react";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  const modelref = useRef();
  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };
 
 
  const loginHandler = async () => {
    const user = {
      email: email,
      password: password,
    };
    
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      
      
      localStorage.setItem(
        "selectedItem for login",
        JSON.stringify(userCredential.user.uid)
        
      );
      location.reload();
    } catch (error) {
      
      console.log("error in login", error);
    }
  };
  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="fixed  inset-0 z-30 h-screen w-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
      >
        <div className="h-[300px] w-[300px] bg-white  rounded-lg flex flex-col items-center justify-center">
      <input
        type="email"
        className="border border-[#2E2E2E] px-4 py-2 w-[80%] rounded-lg focus:outline-none transition-all duration-300 ease-in-out transform opacity-100"
        placeholder="enter your auther email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="enter your password"
        onChange={(e) => setPassword(e.target.value)}
        className="border border-[#2E2E2E] px-4 py-2 rounded-lg  w-[80%] focus:outline-none transition-all duration-300 ease-in-out transform opacity-100"
      />
      
      <button className="w-[80%] h-[40px] bg-[#212121] text-white font-medium mt-[20px] " onClick={loginHandler}>Login</button>
      </div>
      
    </div>
  );
}
