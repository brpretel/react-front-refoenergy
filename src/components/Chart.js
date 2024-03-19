import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Cases Solved",
      data: [10, 20, 30, 40, 40, 50, 60, 70, 80, 80, 50, 40],
      backgroundColor: "rgba(0, 123, 255, 0.5)",
    },
    {
      label: "Escalations",
      data: [10, 20, 30, 40, 40, 50, 60, 70, 80, 80, 50, 40],
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Overall Performance",
    },
  },
};

export default function Chart() {
  return (
    <div style={{ position: "relative", height: "40vh", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}