import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

const DataChart = () => {
  const rawData = [
  {
    id: 1,
    year: 2016,
    objectTemp: 20.4,
    ambientTemp: 23
  },
  {
    id: 2,
    year: 2017,
    objectTemp: 24.4,
    ambientTemp: 23
  },
  {
    id: 3,
    year: 2018,
    objectTemp: 21.4,
    ambientTemp: 23
  },
  {
    id: 4,
    year: 2019,
    objectTemp: 22.4,
    ambientTemp: 23
  },
  {
    id: 5,
    year: 2020,
    objectTemp: 25.6,
    ambientTemp: 23
  }
];

const [chartData, setChartData] = useState({
  labels: rawData.map((data) => data.year),
  datasets: [
    {
      label: 'Object temperature',
      data: rawData.map((data) => data.objectTemp),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Ambient temperature',
      data: rawData.map((data) => data.ambientTemp),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ]});

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
            legend: {
              display: false,
            }
          }
      }}/>
    </div>
  );
}

export default DataChart;