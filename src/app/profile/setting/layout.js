import SettingNavMenu from "@/components/profile/SettingNavMenu";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="bg-[whitesmoke] dark:bg-black">
      <div className="flex w-full lg:w-[1140px]  justify-center  gap-5  mx-auto py-5 ">
        <SettingNavMenu />
        
        {children}
      </div>
    </div>
  );
}
