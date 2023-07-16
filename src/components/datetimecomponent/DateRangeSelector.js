"use client"
import React, { useState } from "react"
import { DateRangePicker } from "react-date-range"
import { defaultStaticRanges } from "./defaultRanges"
import { format } from "date-fns"
import { BiFilterAlt } from "react-icons/bi"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file

import PropTypes from "prop-types"

const DateRangeSelector = ({ ranges, onChange, onSubmit, ...rest }) => {
	const [selectedDateRange, setSelectedDateRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	})
	const [show, setShow] = useState(false)
	const [showDateRange, setShowDateRange] = useState(false)
	const handleShow = () => setShowDateRange(!showDateRange)
	console.log(showDateRange)
	const dateRangeRef = React.useRef(null);

	function formatDateDisplay(date, defaultText) {
		if (!date) return defaultText
		return format(date, "mm/dd/yyyy")
	}

	const handleSelect = (ranges) => {
		setSelectedDateRange(ranges.selection)
		console.log(ranges.selection)
	}

	// const onClickDone = () => {
	//      onSubmit(selectedDateRange);
	//      setShow(true);
	// };

	const onClickClear = () => {
		setSelectedDateRange({
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		})
		setShow(false)
	}
	const handleShowDateRange = () => {
		setShow(true)
		setShowDateRange(false)
	}
	React.useEffect(() => {
		const handleClickOutside = (event) => {
		  if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
			setShowDateRange(false);
		  }
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		  };
		}, [dateRangeRef]);



	return (
		<div ref={dateRangeRef}>
			<button
				className='p-2'
				onClick={handleShow}
			>
				<BiFilterAlt className='text-[25px] inline dark:text-white' />{" "}
				<span className='text-[15px] ml-3 dark:text-white'>Filter</span>
			</button>
			<div
				className={`shadow-sm rounded-main absolute left-20 bg-white z-40 ${showDateRange ? " " : "hidden"
					}`}
			>
				<DateRangePicker
					className="dark:bg-secondary  .date-range-picker "
					onChange={handleSelect}
					showSelectionPreview={true}
					moveRangeOnFirstSelection={false}
					months={1}
					ranges={[selectedDateRange]}
					s
					direction='vertical'
					style={{ width: '300px', height: '150px',fontSize: '10px'  }}
				/>
				
					{/* <button
						className=' p-2 bg-black text-white rounded-main px-7 mr-2'
						onClick={handleShowDateRange}
					>
						Done
					</button> */}
					{/* <button
						className='p-2 border text-red-500 rounded-main px-7'
						onClick={onClickClear}
					>
						Clear
					</button> */}

			</div>
		</div>
	)
}

DateRangeSelector.defaultProps = {
	ranges: defaultStaticRanges,
}

DateRangeSelector.propTypes = {
	/**
	 * On Submit
	 */
	onSubmit: PropTypes.func,
}

export default DateRangeSelector;
