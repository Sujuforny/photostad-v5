"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DeleteIcon from "@/components/icon/DeleteIcon";
import {
  useDeleteTutorialMutation,
  useGetTutorialQuery,
} from "@/store/features/tutorial/tutorialApiSlice";

import AddNewModal from "../modal/tutorial/AddNewModal";
import UpdateModal from "../modal/update/UpdateModal.jsx/UpdateModal";
import SeoModal from "../modal/tutorial/SeoModal";
import DateRangeSelector from "../datetimecomponent/DateRangeSelector";
import { ToastContainer } from "react-toastify";
import moment from "moment";

export function TutorialDatatable() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const { data: tutorials, isLoading, isSuccess } = useGetTutorialQuery();
  const [deleteTutorial, { isLoading: isDeleting }] =
    useDeleteTutorialMutation();

  const handleDeleteTutorial = (id) => {
    deleteTutorial(id);
    alert("Tutorial deleted successfully");
  };

  const filteredItems = tutorials?.data?.list?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

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

  const columns = [
    {
      name: "Title",

      selector: (row) => row.name,
    },
    {
      name: "created at",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
    },
    {
      name: "views",
      selector: (row) => row.viewCount,
    },

    {
      name: "Actions",
      selector: (row) => (
        <div>
          <SeoModal id={row.id} />
          <UpdateModal id={row.id} />
          <button
            // onClick={() => handleDeleteTutorial(row.id)}
            onClick={() => handleDeleteTutorial(row.id)}
            className="rounded-main p-2.5  text-white "
          >
            <DeleteIcon stroke={"red"} />
          </button>
        </div>
      ),
    },
  ];

  // safe
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div className="flex justify-between z-30 flex-wrap w-full p-0 ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-secondary  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <DateRangeSelector />
          <ToastContainer
            position="center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          /> 
        </form>
        {/* <FormMdTtr /> */}
        <AddNewModal />
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  // safe to use
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
    subHeader: {
      style: {
        padding: "0px",
        margin: "0px",
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
    subHeader: {
      style: {
        padding: 0,
        margin: 0,
      },
    },
  };
  // chage theme of the table to dark and light
  const themeColor = useTheme();
  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 w-full h-full z-50 flex justify-center items-center bg-white  border-white">
        <Image
          width={400}
          height={400}
          alt="loading..."
          className=" object-contain text-center  bg-white  border-white"
          // src="https://gifdb.com/images/high/confused-anime-sakura-loading-buff-tt8pr2zlspinjdlv.gif"
          src="/assets/loading/giphy.gif"
        />
      </div>
    );
  }

  return (
    <>
      <DataTable
        style={{ backgroundColor: "black" }}
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // theme={ `theme === 'dark' ? 'dark' : 'light'`}
        // if themeColor.theme === 'dark' ? 'dark' : 'light'
        theme={themeColor.theme === "dark" ? "dark" : "light"}
        customStyles={
          themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
        }
      />
    </>
  );
}
