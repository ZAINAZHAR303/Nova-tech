
import { useState } from "react";
import { auth } from "../../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const loginHandler= async()=>{
    const user = {
      email: email,
      password: password
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
               console.log("userLogin",userCredential.user.uid);
               localStorage.setItem("selectedItem for login", JSON.stringify(userCredential.user.uid));
            
            
           
    
    } catch (error) {
      console.log("error in login", error);
      
    }           
  }
  return (
    <div style={{backgroundColor:"red",marginTop:40}}>
      <input type='email' placeholder='enter your auther email' onChange={(e)=>setEmail(e.target.value)} /><br/>
      <input type='password' placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={loginHandler}>Login</button>
    </div>
  )
}
