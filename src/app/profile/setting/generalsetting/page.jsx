"use client";
import SideSettingNav from "@/components/profile/SideSettingNav";
import { useTheme } from "next-themes";
import React from "react";
import {CiCircleChevLeft} from 'react-icons/ci'

export default function Page() {
  const { theme, setTheme } = useTheme();
  //handle change theme on click

  return (
    <div className="w-[90%] mx-auto bg-white dark:bg-slate-800 p-5 rounded-[16px] ">
      {/* drawer */}
      <div className="md:hidden">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left" >
        <h1 className="font-semibold dark:text-white text-[32px]  ">
        <CiCircleChevLeft className="inline"/> General Setting
      </h1>
        </label>
        <label className="overlay" htmlFor="drawer-left"></label>
        <div className="drawer bg-transparent">
          <div className="drawer-content pt-10 flex flex-col h-full">
            <SideSettingNav />
          </div>
        </div>
      </div>
     
      {/* end of drawer */}

      <h1 className="font-semibold dark:text-white max-sm:hidden text-[32px]  ">
        General Setting
      </h1>

      <p className="mt-5 font-light dark:text-white mb-3">
        Choose your langauge
      </p>
      <select className="select bg-white dark:bg-slate-400 dark:text-white select-bordered w-full max-w-xs">
        <option selected>Khmer</option>
        <option className="">English</option>
      </select>
      <h2 className="my-3 font-light dark:text-white ">Appearance </h2>
      <p className="mb-3 dark:text-white ">
        Customize your experience with our website by choosing between dark mode
        and light mode
      </p>
      <div className="flex space-x-5">
        <div
          className="cursor-pointer dark:text-white"
          onClick={() => setTheme("dark")}
        >
          <div className="w-20 h-20 mb-2 bg-slate-400 rounded-[16px]">
            <div className="rounded-[16px] p-2 w-16 h-16 relative top-4 left-4 bg-black">
              <p className="text-white">ABC</p>
            </div>
          </div>
          Dark Mode
        </div>
        <div
          className="cursor-pointer dark:text-white"
          onClick={() => setTheme("light")}
        >
          <div className="w-20 h-20 bg-slate-400 mb-2 rounded-[16px]">
            <div className="rounded-[16px] p-2 w-16 h-16 relative top-4 left-4 bg-white">
              <p className="dark:text-black">ABC</p>
            </div>
          </div>
          light Mode
        </div>
      </div>
      <button className="bg-red-400 mt-6 p-2.5 rounded-[16px] text-white">
        save change
      </button>
    </div>
  );
}