"use client";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BASE_URL } from '@/lib/baseUrl';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const BarChart = () => {
    const [editCertificateByMonth, setEditCertificateByMonth] = useState([]);
    const [editWatermarkByMonth, setEditWatermarkByMonth] = useState([]);
    useEffect(() => {
        const fetchWatermarkData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/v1/dashboard-overviews`);
                const responseData = await response.json();
                const data = await responseData.data;
                const dailyEditWatermark = await data.editWatermarkByMonth;
                const dailyEditCertificate = await data.editCertificateByMonth;
                setEditWatermarkByMonth(dailyEditWatermark);
                setEditCertificateByMonth(dailyEditCertificate);

            } catch (error) {
                console.error("error: " + error);
            }
        };
        fetchWatermarkData();
    }, []);

    const labels = editWatermarkByMonth.map(month =>
        month.month
    );
    const data = {
        labels,
        datasets: [
            {
                label: 'Watermark',
                data: editWatermarkByMonth.map(month =>
                    month.totalEdit
                ),
                borderColor: 'rgb(255, 255, 255,)',
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
            },
            {
                label: 'Certificate',
                data: editCertificateByMonth.map(month =>
                    month.totalEdit
                ),
                borderColor: 'rgb(255, 255, 255,)',
                backgroundColor: 'rgba(53, 162, 235, 0.4)',
            },
        ],

    };
    return (
        <>
            <div className=' md:col-span-2 relative p-4 border h-full lg:h-[280px] w-full bg-white'>
                <Bar data={data} />
            </div>
        </>
    );
};
export default BarChart;

{/* <div className=' md:col-span-2 relative p-4 border h-full lg:h-[280px] w-full bg-white'>
        <Bar data={chartData} options={chartOptions} />
      </div> */}
