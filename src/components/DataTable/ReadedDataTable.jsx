"use client"
import { useGetReadedTutorialQuery } from "@/store/features/tutorial/readedTutorial/readedTutorialApiSlice"
import {useTheme} from "next-themes"
import Image from "next/image"
import React, {useEffect, useState} from "react"
import DataTable, {createTheme} from "react-data-table-component"

const ReadedDataTable = () => {
    const themeColor = useTheme()
    const [data, setData] = useState([])
    const {data:resData,isFetching} = useGetReadedTutorialQuery()
    
    useEffect(()=>{
        if(resData){
            setData(resData?.data?.list)
        }
    },[resData])
    if(isFetching){
        return <h1 className="text-3xl text-center ">Fetching data</h1>
    }
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id)
        setData(updatedData)
    }

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
    })
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
    })
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
    }
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
    }

    const columns = [
        {
            name: "Request Messages",
            selector: "message",
            sortable: true,
        },
        {
            name: "Date",
            selector: "date",
            sortable: true,
        },
        {
            name: "Actions",
            width: "150px",

            cell: (row) => (
                <>
                    <button
                        className="flex border-none items-center  rounded-main mr-3 text-white p-2 px-3 space-x-2 bg-[#E85854] justify-center"
                        onClick={() => handleDelete(row.id)}>
                        <Image
                            src={"/assets/icons/trush-square.svg"}
                            width={23}
                            height={23}
                            alt='delete icon'

                        />
                        <span className="max-sm:hidden">Delete</span>
                    </button>

                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            theme={themeColor.theme === "dark" ? "dark" : "light"}
            customStyles={
                themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
            }
        />
    )
}

export default ReadedDataTable
