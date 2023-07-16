"use client"
import { useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { BASE_URL } from "@/lib/baseUrl";
import DateRangeSelector from "../datetimecomponent/DateRangeSelector";


const CertificateDataTable = () => {
	const [data, setData] = useState([]);


	const fetchCertificateInfo=()=>{
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch(`${BASE_URL}statistics/certificate-download`, requestOptions)
			.then(response => response.json())
			.then(result => setData(result.data.list))

			.catch(error => console.log('error', error));
	}
	useEffect(()=>{
		fetchCertificateInfo()
	},[])

	const columns = [
		{
			name: "Certificate ID",
			selector: row => row.certificateId,
			sortable: true,
		},
		{
			name: "Format",
			selector:row => row.format,
			sortable: true,
		},
		{
			name: "compression size ",
			selector:  row => row.compression,
			sortable: true,
		},
		{
			name: "Date",
			selector:  row => moment(row.createdAt).format("YYYY-MM-DD"),
			sortable: true,
		},
		{
			name: "User",
			selector:  row => row.userDownload.username,
			sortable: true,
		},
	]
	

	const subHeaderComponentMemo = useMemo(() => {

		return (

			<div className="absolute left-0 m-0 p-0">
				<DateRangeSelector />
			</div>
		
		)
	}, [])
	const customeStylesLight = {
		subHeader: {
			style: {
				padding: 0,
				margin: 0,
			},
		},
		headCells: {
			style: {
				fontSize: "16px",

			},
		},
		header: {
			style: {
				padding: 0,
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
		subHeader: {
			style: {
				padding: 0,
				margin: 0,
			}
		},
		headCells: {
			style: {
				fontSize: "16px",
			},
		},
		//set odd row background color to whitesmoke and even row to white
		rows: {
			style: {
				backgroundColor: "#111c44", 
				"&:nth-child(odd)": {
					backgroundColor: "#0b1437",
				},
			},
		},
		select: {
			style: {
				color: "black",
			},
		},
		header: {
			style: {
				padding: 0,
			},
		},
		pagination: {
			style: {
				backgroundColor: "#0b1437",
				color: "white",
			},
			paginationButton: {
				style: {
					backgroundColor: "white",
					color: "black",
				},
			},
			paginationButtonActive: {
				style: {
					backgroundColor: "blue",
					color: "white",
				},
			},
			paginationSelect: {
				style: {
					color: 'black'
				}

			}
		},
		table: {
			style: {
				borderRadius: '16px'
			}
		}
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

		// set body borderRadius to 16px


	})
	const themeColor = useTheme()
	
	return (
		<DataTable
			columns={columns}
			data={data}
			title="Generated Certificate Overview"
			pagination
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			paginationRowsPerPageOptions={[5, 10, 15]}
			theme={themeColor.theme === "dark" ? "dark" : "light"}
			customStyles={
				themeColor.theme === "dark" ? customeStyleDark : customeStylesLight
			}
		/>
	)
}

export default CertificateDataTable;