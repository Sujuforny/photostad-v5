"use client";

import { useGetAdminQuery } from "@/store/features/auth/authApiSlice";
import { selectCurrentAccessToken, selectCurrentUser } from "@/store/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Outlet({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSelector(selectCurrentAccessToken);
  const user = useSelector(selectCurrentUser);
  const{data:userToken }= useGetAdminQuery()
  const [role,setRole]=useState("")
  console.log("token", token);
    console.log("user", user);
    console.log("user role : ", userToken?.data?.roles[0].name);

    useEffect(()=>{
      if(userToken){
        setRole(userToken?.data?.roles[0].name)
      }
    },[userToken])

  if (pathname === "/" && token) {
   
    return children;
  } else if (pathname === "/profile" && !token) {
   
    router.push("/login");
  } 

//  if(pathname.includes("/profile") && !token){
//   toast.info("You must login first to access this page");
  
//     router.push("/login");
//   }
 
//   if(pathname.includes("/admin") && !token){
//     toast.info("You must login first to access this page");
//     router.push("/login");
//   }
//   if(pathname.includes("/admin") && token && role !== "ADMIN"){
//     toast.info("You must login as admin to access this page");
//     router.push("/");
//   }

  return (
    <>
    {children}
    </>
  );
}
