"use client";
import React from "react";
import { BtnThemeToggle } from "./BtnThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { LiaBarsSolid } from "react-icons/lia";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="navbar navbar-no-boxShadow h-[80px] bg-white dark:bg-[#1e1e1e] sticky top-0 z-50 ">
      <div className="px-5 navbar navbar-no-boxShadow bg-white  sticky top-0 z-50 dark:bg-[#1e1e1e] w-full xl:w-[1290px] mx-auto max-sm:px-5">
        <div className="navbar-start">
          <Link href={"/"}>
            {theme === "dark" ? (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogov2.png"
                alt="logo img"
              />
            ) : (
              <Image
                height={50}
                width={131}
                className="md:w-[131px] w-[100px]"
                src="/assets/image/mainlogo-blackv2.png"
                alt="logo dark img"
              />
            )}
          </Link>
        </div>
        <div className="navbar-center hidden gap-4 lg:block">
          <Link
            href={"/"}
            className="navbar-item hover:text-black dark:hover:text-white text-black dark:text-white"
          >
            Home
          </Link>
          <a href="" className="navbar-item hover:text-black dark:hover:text-white text-black dark:text-white">
            Watermark
          </a>
          <a href={'/'} className="navbar-item hover:text-black dark:hover:text-white text-black dark:text-white">
            Certificate
          </a>
          <Link href={'/aboutus'} className="navbar-item hover:text-black dark:hover:text-white text-black dark:text-white whitespace-nowrap">
            About Us
          </Link>
          {/* <a className="navbar-item hover:text-black dark:hover:text-white dark:text-white text-black">
            Dashboard
          </a> */}
        </div>
        <div className="navbar-end gap-3">
          <BtnThemeToggle />
         <Link href={'/login'}>
         <button className="rounded-main btn bg-red-500 text-white hidden lg:block">
            log in
          </button>
         </Link>
         <Link href={'/signup'}>
         <button className="rounded-main btn bg-red-500 text-white hidden lg:block">
            Sign Up
          </button>
         </Link>
         
        </div>
        {/* drobdown responsive */}
        <div className="dropdown block lg:hidden ml-3">
          <label tabindex="0">
            <LiaBarsSolid className="text-black dark:text-white text-xl " />
          </label>
          <div className="dropdown-menu dropdown-menu-bottom-left">
            <Link href={'/profilesetting'} className="dropdown-item text-sm">Profile</Link>
           
            <Link href={'/'} tabindex="-1" className="dropdown-item text-sm">
              Home
            </Link>
            <Link href={'/'} tabindex="-1" className="dropdown-item text-sm">
              Watermark
            </Link>
            <Link href={'/'} tabindex="-1" className="dropdown-item text-sm">
              Certificate
            </Link>
            <Link href={'/aboutus'} tabindex="-1" className="dropdown-item text-sm">
              About Us
            </Link>

            <Link href={'/login'} tabindex="-1" className="dropdown-item text-sm">
              log in
            </Link>
            <Link href={'/singup'} tabindex="-1" className="dropdown-item text-sm">
              Sign up
            </Link>
            <Link href={'profile/setting'} tabindex="-1" className="dropdown-item text-sm">
              Setting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
