"use client"
import React,{useState} from "react";
import {useRouter} from 'next/navigation';

const SearchArticleInput = () => {
    const router = useRouter();
    const [searchtext,setSearchText] = useState("");
    

    const formSubmitHandler = (e:React.FormEvent) =>{
        e.preventDefault();

        console.log({searchtext});
        router.push(`/articles/search?searchText=${searchtext}`);

        
    }
  return (
    <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
    <input 
    className="w-full p-3 rounded text-xl border-none text-gray-900" 
    type="search" 
    placeholder="Search for Article" 
    value={searchtext}
    onChange={(e) => setSearchText(e.target.value)}
    />
    
   
  </form>
  )
}

export default SearchArticleInput