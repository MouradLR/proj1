"use client"
import React,{useState} from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";


const AddArticleForm = () => {
    const router = useRouter();
    const [title,setTitle] = useState("");
    const [description,setDescrption] = useState("");

    const formSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault();

        

        if (title === "") return toast.error("Title is Required");
        if (description === "") return toast.error("Description is Required");  
        
        try {
          await axios.post(`${DOMAIN}/api/articles`, {title, description});
          setTitle("");
          setDescrption("");
          toast.success("New Article Added");
          router.refresh();
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
        }
    }
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
    <input 
    className="mb-4 border rounded p-2 text-xl" 
    type="text" 
    placeholder="Enter Article Title" 
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    
    <textarea
    className="mb-4 p-2 lg:text-xl rounded resize-none"
    rows={5}
    placeholder="Enter Article Description"
    value={description}
    onChange={(e) => setDescrption(e.target.value)}
    >

    </textarea>
    <button type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold">
       Add
    </button>
  </form>
  )
}

export default AddArticleForm