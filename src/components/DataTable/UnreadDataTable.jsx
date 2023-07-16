"use client";

import {
  useDeleteUnreadReqMutation,
  useGetUnreadReqQuery,
} from "@/store/features/tutorial/unreadTotorial/unreadApiSlice";
import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UnreadReqDataTable = () => {
  const [data, setData] = useState([]);
  const themeColor = useTheme();
  const { data: resData, isFetching } = useGetUnreadReqQuery();
  const [deleteReq, { isLoading, isSuccess }] = useDeleteUnreadReqMutation();

  useEffect(() => {
    if (resData) {
      setData(resData?.data?.list);
    }
  }, [resData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Request deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  },[isSuccess]);

  // const handleDelete = (id) => {
  //   const updatedData = data.filter((item) => item.id !== id);
  //   setData(updatedData);
  // };

  const handleMarkAsRead = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, isRead: true };
      }
      return item;
    });
    setData(updatedData);
  };
  // react data table component
  createTheme("light", {
    text: {
      light: "#1b254b",
      dark: "white",
    },
    rows: {
      style: {
        backgroundColor: "white",
        "&:nth-child(odd)": {
          backgroundColor: "black",
        },
      },
    },

    background: {
      default: "#f5f8fe",
    },
  });
  createTheme("dark", {
    text: {
      light: "#1b254b",
      dark: "white",
    },
    background: {
      default: "#111c44",
    },
    rows: {
      style: {
        backgroundColor: "#111c44",
        "&:nth-child(odd)": {
          backgroundColor: "#1b254b",
        },
      },
    },
  });
  const customeStylesLight = {
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    //set odd row background color to whitesmoke and even row to white
    rows: {
      style: {
        backgroundColor: "white",
        "&:nth-child(odd)": {
          backgroundColor: "#f5f8fe",
        },
      },
    },
    header: {
      style: {
        padding: 0,
      },
    },
  };
  const customeStyleDark = {
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    //set odd row background color to whitesmoke and even row to white
    rows: {
      style: {
        backgroundColor: "#0b1437",
        "&:nth-child(odd)": {
          backgroundColor: "#111c44",
        },
      },
    },
    header: {
      style: {
        padding: 0,
      },
    },
  };

  const columns = [
    {
      name: "Request Messages",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("d/mm/yyyy"),
      sortable: true,
    },
    {
      name: "Actions",
      width: "300px",
      cell: (row) => (
        <>
          <button
            className="flex border-none items-center rounded-main h-[40px] mr-3 space-x-2 text-white p-2 px-3 bg-[#E85854] justify-center"
            onClick={() => deleteReq(row.id)}
          >
            <Image
              src={"/assets/icons/trush-square.svg"}
              width={23}
              height={23}
              alt="delete icon"
            />
            <span className="max-sm:hidden">Delete</span>
          </button>
          {!row.isRead && (
            <button
              className="flex  bg-secondary text-white rounded-main space-x-2 items-center p-2 px-3 btn-outline justify-center h-[40px]"
              onClick={() => handleMarkAsRead(row.id)}
            >
              <Image
                src={"/assets/icons/chart-success.svg"}
                width={22}
                height={22}
                alt="delete icon"
                className=" invert"
              />
              <span className="max-sm:hidden">Mark as Read</span>
            </button>
          )}
          <ToastContainer />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="h-screen">
      <DataTable
        columns={columns}
        data={data}
        pagination
        theme={themeColor.theme === "dark" ? "dark" : "light"}
        customStyles={
          themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
        }
      />
    </div>
  );
};

export default UnreadReqDataTable;
