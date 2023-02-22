import React, { FC, useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { Line } from 'react-chartjs-2';
import currentColor from './component_functions';

Chart.register(CategoryScale);

interface temperatureData {
  payloads: {
    readonly object: number,
    readonly ambient: number,
    readonly time: string
  }[]
}

const DataChart:FC<temperatureData> = ({payloads}) => {

const [chartData, setChartData] = useState({
  labels: payloads.map((data) => data.time),
  datasets: [
    {
      label: 'Object temperature',
      data: payloads.map((data) => data.object),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: '#cfa125aa',
      borderWidth: 1,
    },
    {
      label: 'Ambient temperature',
      data: payloads.map((data) => data.ambient),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ]});

  useEffect(() => {
    // Get the last message from the payloads array
    // for easier access
    const lastMessage = payloads[payloads.length - 1];

    setChartData({
      labels: payloads.map((data) => data.time),
      datasets: [
        {
          label: 'Object temperature',
          data: payloads.map((data) => data.object),
          backgroundColor: 
            currentColor(lastMessage.object, 'background'),
          borderColor: 
            currentColor(lastMessage.object, 'border'),
          borderWidth: 2,
        },
        {
          label: 'Ambient temperature',
          data: payloads.map((data) => data.ambient),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: '#db8c46aa',
          borderWidth: 1,
        },
      ],
	})
}, [payloads]);

  return (
    <div className='chart col-span-2'>
      <Line className='h-full min-h-[350px]'
        data={chartData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Temperature chart - Unit °C'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor : '#000000a1',
            },
            legend: {
              display: true,
              position: 'bottom',
              fullSize: false,
            }
          },
      }}/>
    </div>
  );
}

export default DataChart;