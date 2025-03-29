"use client"
import React,{useState} from "react";
import {toast} from 'react-toastify';
import {useRouter} from 'next/navigation';
import axios from "axios";
import { DOMAIN } from "@/utils/constants"; 


const LoginForm = () => {

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loeding,setLoeding] = useState(false);


    const formSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();

        

        if (email === "") return toast.error("Email is Required");
        if (password === "") return toast.error("Password is Required");  

        try {
          setLoeding(true);
          await axios.post(`${DOMAIN}/api/users/login`,{email,password});
          router.replace("/");
          setLoeding(false);
          router.refresh();
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
          setLoeding(false);
        } 
       
        
    }
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
    <input 
    className="mb-4 border rounded p-2 text-xl" 
    type="email" 
    placeholder="Enter your Email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    
    <input 
    className="mb-4 border rounded p-2 text-xl"  
    type="password" 
    placeholder="Enter your password" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <button disabled={loeding} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
       {loeding? "loeding...":"login"}
    </button>
  </form>
  )
}

export default LoginForm