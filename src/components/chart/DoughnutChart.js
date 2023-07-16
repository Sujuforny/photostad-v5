'use client'
import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
// export const data = {
//     labels: ['Watermark', 'Generate Certificate'],
//     // set lebel color
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [12, 19],
//             backgroundColor: [
              
//                 'orange', 'blue'

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',

//             ],
//             borderWidth: 1,
//         },
//     ],
// };

export function DoughnutChart({certificate,watermark}) {
    const data = {
        labels: ['Watermark', 'Generate Certificate'],
        // set lebel color
        datasets: [
            {
                label: '# of Votes',
                data: [watermark, certificate],
                backgroundColor: [
                  
                    'orange', 'blue'
    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
    
                ],
                borderWidth: 1,
            },
        ],
    };
    return <div className='w-[250px] '>
        <Doughnut data={data}/>
    </div>;
}
