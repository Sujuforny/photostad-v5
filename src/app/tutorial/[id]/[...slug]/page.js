"use client";
import { useGetTutorialByIdQuery } from "@/store/features/tutorial/tutorialApiSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [content, setContent] = useState();
  const { data, isLoading, error } = useGetTutorialByIdQuery(id);
  console.log(data?.data?.htmlContent, " data of tutorial");
  useEffect(() => {
    if (data) {
      setContent(data?.data?.htmlContent);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <div className="w-9/12 mx-auto h-screen">
          <div className="grid grid-cols-4 gap-2 mb-5">
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
          </div>

          <div className="w-full h-96 rounded-main skeleton"></div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
            <div className="w-full h-2 rounded-full skeleton"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div
        id="html-content"
        className="w-7/12 mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Page;
