import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderStatusChart = ({ orderStats }) => {
  const data = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [
          orderStats?.pending || 0,
          orderStats?.shipped || 0,
          orderStats?.delivered || 0,
          orderStats?.cancelled || 0,
        ],
        backgroundColor: [
          "#ff9800",
          "#fbc02d",
          "#1976d2",
          "#d32f2f",
          "#4caf50",
        ],
      },
    ],
  };

  return <Bar data={data} />;
};

export default OrderStatusChart;
