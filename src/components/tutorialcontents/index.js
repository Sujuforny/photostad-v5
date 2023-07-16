"use client";
import { BASE_URL } from "@/lib/baseUrl";
import { useGetTutorialQuery } from "@/store/features/tutorial/tutorialApiSlice";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import CardTutorial from "./components/CardTutorial";

const TutorialContent = () => {
  const { data: tutorials, isSuccess } = useGetTutorialQuery();
  const viewImagePrefix = "https://photostad-api.istad.co/files/";

  return (
    <div>
      <h1 className="text-center max-sm:text-[24px] pb-14  text-5xl font-bold dark:text-white text-slate-950">
        Tutorial Content
      </h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {isSuccess &&
          tutorials?.data?.list.map((tutorial, index) => (
           
            <CardTutorial key={index} id={tutorial?.id} name={tutorial?.name} slug={tutorial?.slug} thumbnail={`${viewImagePrefix}${tutorial.thumbnail.name}`}/>
            
         
          ))}
      </div>
    </div>
  );
};

export default TutorialContent;
