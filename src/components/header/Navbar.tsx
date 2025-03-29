"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

interface NavbarProps{
  isAdmin:boolean;
}

export const Navbar = ({isAdmin}:NavbarProps) => {
    const [toggle,setToggle] =useState(true);
  return (
    <div>
          <nav className={styles.navbar}>
            <div>
               <Link href="/" className={styles.logo}>
               MOURAD 
               <GrTechnology />
               LAHRACHE
               </Link>
               <div className={styles.menu}>
                {toggle ? ( < IoClose  onClick={()=> setToggle(prev => !prev)}/>):( <AiOutlineMenu onClick={()=> setToggle(prev => !prev)}/>)}
               
               </div>
            </div>
            <div className={styles.navLinksWrapper}
            style={{
                clipPath : toggle && "polygon(0 100%, 100% 100%, 100% 0, 0 0) " || " "
            }}
            >
            <ul className={styles.navLinks}>
                <Link onClick={()=> setToggle(false)} href="/"         className={styles.navLink}>Home</Link>
                <Link onClick={()=> setToggle(false)} href="/articles?pageNumber=1" className={styles.navLink}>Articles</Link>
                <Link onClick={()=> setToggle(false)} href="/about"    className={styles.navLink}>About</Link>
                {isAdmin && (
                   <Link onClick={()=> setToggle(false)} href="/admin"    className={styles.navLink}>Admin Dashboard</Link>

                )}
            </ul>
            </div>
          
        </nav>
    </div>
  )
}

export default Navbar