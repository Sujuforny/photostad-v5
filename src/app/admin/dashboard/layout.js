"use client";
import AsideBar from "@/components/admin-dashboard/AsideBar";
import { BtnThemeToggle } from "@/components/theme/BtnThemeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";

export default function Layout({ children }) {
  // theme check on logo
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarOpen = () => {
    setIsOpen(!isOpen);
  };
  // handle click anywhere beside sidebar area set isOpen to false
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        document.getElementById("default-sidebar") &&
        !document.getElementById("default-sidebar").contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    //click to remove hidden class and click again to add hidden class
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) {
      document.getElementById("dropdown-example").classList.remove("hidden");
    } else {
      document.getElementById("dropdown-example").classList.add("hidden");
    }
  };

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const handleDropdownOpen2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    if (isDropdownOpen2) {
      document.getElementById("dropdown2").classList.remove("hidden");
    } else {
      document.getElementById("dropdown2").classList.add("hidden");
    }
  };

  return (
    <div className="">
      {/* side ba */}
      <aside
        id="default-sidebar"
        className={`fixed   top-0 left-0 z-50  bg-black dark:bg-secondary  h-screen transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full w-full ">
          <AsideBar />

          {/* <MultiLevelDropdown /> */}
        </div>
      </aside>

      {/* end of side bar */}
      {/* nav bar */}
    
        <nav className="sticky  top-0 z-40 ">
          <div className="flex bg-white dark:bg-secondary items-center justify-between h-16 px-6 py-10   border-gray-200  ">
            <div className="flex items-center">
              <button
                className="text-gray-500 rounded-md dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:hidden"
                onClick={handleSidebarOpen}
              >
                <span className="sr-only">Open sidebar</span>
                <CgMenuLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-3">
              <BtnThemeToggle />

              <Image
                className="invert dark:invert-0"
                src={"/assets/icons/profile-2user.svg"}
                width={24}
                height={24}
                alt="element icon"
              />
              <h1 className="dark:text-white p-1.5">Cheat Setha</h1>
            </div>
          </div>
        </nav>
        {/* children display */}
        <div className="ml-[280px] max-sm:ml-0 dark:bg-primary">{children}</div>
 
    </div>
  );
}
