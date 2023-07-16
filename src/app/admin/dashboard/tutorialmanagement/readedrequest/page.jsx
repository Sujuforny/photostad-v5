"use client";

import ReadedDataTable from "@/components/DataTable/ReadedDataTable";
import { BASE_URL } from "@/lib/baseUrl";
import { selectRequestTutorialTotal } from "@/store/features/tutorial/requestTutorial/requestTutorialSlice";
import { fetchUnreadReq, selectTotalUnread } from "@/store/features/tutorial/unreadTotorial/unreadTotorialSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const [readedReq, setReadedReq] = useState(null);
  const total = useSelector(selectRequestTutorialTotal);
  const tolalUnread = useSelector(selectTotalUnread);

  const dispatch = useDispatch();

  const fetchReadedRequest = async () => {
    const res = await fetch(
      `${BASE_URL}/request-tutorials/is-read?isRead=true&page=1`
    );
    const data = await res.json();
    setReadedReq(data.data.total);
  };

  useEffect(() => {
    fetchReadedRequest();
    dispatch(fetchUnreadReq());
  }, []);

  
  return (
    <div className="w-full p-5 mx-auto db-bg h-full dark:bg-primary">
      {/* header section */}
      <div className="db-bg dark:bg-primary sticky top-20 z-40">
        <h1
          className={
            "text-[32px] text-light dark:text-white font-semibold mb-5"
          }
        >
          Tutorial Management
        </h1>
        {/* breadcrumbs */}
				<div className='text-sm mb-3 breadcrumbs'>
					<ul className='font-extralight text-light dark:text-white'>
						<li>
							<Link className="text-black dark:text-white" href={"/admin/dashboard"}>Admin</Link>
						</li>
						<li>
							<Link className="text-black dark:text-white" href={"/admin/dashboard/tutorialmanagement"}>
								Tutorial Management
							</Link>
						</li>
						<li>
							<Link className="text-black dark:text-white" href={"/admin/dashboard/tutorialmanagement/readedrequest"}>
								Readed Request
							</Link>
						</li>
					</ul>
				</div>
      </div>
      {/* end of header section */}

      <main className="lg:h-screen h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* box 1 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">
              Total Requests
            </h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
              {total}
            </h2>
          </div>
          {/* box 2 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">Readed</h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
              {readedReq}
            </h2>
          </div>
          {/* box 3 */}
          <div className="bg-white rounded-main shadow-sm dark:bg-secondary flex flex-col justify-center items-center h-[170px]">
            <h2 className="font-light text-light dark:text-white ">Unread</h2>
            <h2 className="font-black text-[40px] text-light dark:text-white ">
              {tolalUnread}
            </h2>
          </div>
        </div>
        <h1 className='font-semibold text-center text-[24px] my-14 dark:text-white'>
					List of Requests Tutorial&#40;{" "}
					<span className='text-red-600'>Readed</span> &#41;{" "}
				</h1>
        {/* react data table component */}
        <ReadedDataTable/>
      </main>
    </div>
  );
}
