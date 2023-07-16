"use client";

import Link from "next/link";
import React from "react";

import { useTheme } from "next-themes";
import SettingIcon from "../icon/SettingIcon";
import UserAccIcon from "../icon/UserAccIcon";
import { CiCircleChevLeft } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function SideSettingNav() {
  // call theme
 const router = useRouter()
 const handleBack = () => {
  router.back()
 }
  return (
    
    <aside className="sidebar justify-start w-[318px] h-screen bg-white dark:bg-slate-800 rounded-main  ">
      <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
        <nav className="menu rounded-md">
          <section className="menu-section px-4">
            <div onClick={handleBack} className="cursor-pointer">
              <CiCircleChevLeft className="inline mr-2 text-[20px] font-bold text-black dark:text-white" />
              <span className="menu-title inline text-black dark:text-white">Back</span>
            </div>
            <ul className="menu-items text-black dark:text-white">
              <Link href={"/profile/setting"}>
                <li className="menu-item text-black dark:text-white dark:hover:text-black">
                  <UserAccIcon />

                  <span>Profile Management</span>
                </li>
              </Link>

              <li>
                <input type="checkbox" id="menu-168" className="menu-toggle" />
                <label className="menu-item justify-between  text-black dark:text-white dark:hover:text-black" htmlFor="menu-168">
                  <div className="flex gap-2 text-black dark:text-white dark:hover:text-black">
                    <SettingIcon />
                    <span>General</span>
                  </div>

                  <span className="menu-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>

                <div className="menu-item-collapse">
                  <div className="min-h-0">
                    <Link href={"/profile/setting/generalsetting"}>
                      <label className="menu-item ml-6 text-black dark:text-white dark:hover:text-black">General setting</label>
                    </Link>
                    <Link href={"/profile/setting/passwordandemail"}>
                      <label className="menu-item ml-6 text-black dark:text-white dark:hover:text-black">
                        Password and Email
                      </label>
                    </Link>
                    <Link href={"/profile/setting/moreinfo"}>
                      {" "}
                      <label className="menu-item ml-6 text-black dark:text-white dark:hover:text-black">
                        More information
                      </label>{" "}
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </nav>
      </section>
    </aside>
    
  );
}
