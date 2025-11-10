import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardChart({ refreshKey }) {
  const [chartData, setChartData] = useState({});
  const fetchData = async () => {
    const res = await axios.get('/api/finance');
    const dataArr = res.data;
    setChartData({
      labels: dataArr.map((_, i)=>`Entry ${i+1}`),
      datasets: [
        {label:'Sales', data:dataArr.map(d=>Number(d.sales)), backgroundColor:'blue'},
        {label:'Purchases', data:dataArr.map(d=>Number(d.purchases)), backgroundColor:'red'},
        {label:'Expenses', data:dataArr.map(d=>Number(d.expenses)), backgroundColor:'orange'},
        {label:'Profit', data:dataArr.map(d=>Number(d.profit)), backgroundColor:'green'},
        {label:'Profit Margin', data:dataArr.map(d=>Number(d.profitMargin)), backgroundColor:'purple'},
      ]
    });
  };
  useEffect(()=>{fetchData();}, [refreshKey]);
  return <Bar data={chartData} options={{responsive:true, maintainAspectRatio:false}}/>;
}