import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "../style/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      stacked: false, // Cambiar a false para permitir múltiples puntos
      beginAtZero: true,
    },
    x: {
      beginAtZero: true,
    },
  },
};

function Chart({ type, color, isMounted }) {
  let title = "";
  let design = "";
  let unit = "";

  if (type === "temperature") {
    title = "Temperatura";
    design = "temperature-box";
    unit = " °C";
  } else if (type === "weight") {
    title = "Peso";
    design = "weight-box";
    unit = " Kg";
  } else {
    title = "Humedad";
    design = "humedad-box";
    unit = " g/m³";
  }

  const [data, setData] = useState(null);
  const [average, setAverage] = useState(null);
  const [last, setLast] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isMounted) return;

    const connectWebSocket = (url) => {
      socketRef.current = new WebSocket(url);

      socketRef.current.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      socketRef.current.onmessage = (event) => {
        console.log("Received message from WebSocket");
        const newData = JSON.parse(event.data);
        console.log("Data received from WebSocket:", newData);

        const groupedData = {};
        newData.forEach((row) => {
          const date = row.creation_date.split(" ")[0]; // Obtener solo la fecha
          if (!groupedData[date]) {
            groupedData[date] = [];
          }
          groupedData[date].push(parseFloat(row[type]));
        });

        const labels = Object.keys(groupedData);
        const datasets = [];
        labels.forEach((label) => {
          groupedData[label].forEach((value, index) => {
            if (!datasets[index]) {
              datasets[index] = {
                label: `${type} ${index + 1}`,
                data: [],
                borderWidth: 1,
                backgroundColor: color,
                borderColor: color,
                showLine: false, //  mostrar solo los puntos
                pointRadius: 4, // tamaño del punto
              };
            }
            datasets[index].data.push({ x: label, y: value });
          });
        });

        const allValues = Object.values(groupedData).flat();
        const sum = allValues.reduce(
          (total, currentValue) => total + currentValue,
          0
        );
        const averageValue = sum / allValues.length;
        setLast(allValues[allValues.length - 1]);
        setAverage(averageValue);

        const info = {
          labels: labels,
          datasets: datasets,
        };
        setData(info);
      };

      socketRef.current.onerror = (error) => {
        console.log(`WebSocket error:`, error);
      };

      socketRef.current.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `Closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          console.log("Connection died, attempting to reconnect...");
          setTimeout(() => connectWebSocket(url), 1000);
        }
      };
    };

    const urls = {
      weight:
        "wss://refoenergyean-production.up.railway.app/weight_sensor/ws/weight",
      temperature:
        "wss://refoenergyean-production.up.railway.app/temperature_sensor/ws/temperature",
      humidity:
        "wss://refoenergyean-production.up.railway.app/humidity_sensor/ws/humidity",
    };

    if (type in urls) {
      connectWebSocket(urls[type]);
    }

    return () => {
      console.log("Closing WebSocket connection");
      if (socketRef.current) socketRef.current.close();
    };
  }, [color, type, isMounted]);

  return (
    <div className="flex-container">
      <div className="chart-data-box">
        <p className="bold">{title}</p>
        <br />
        <div className={design}>
          <p className="bold">Ultimo Dato</p>{" "}
          <div className="value">
            {last !== null ? `${last.toFixed(2)} ` : "Cargando..."}
          </div>{" "}
          <div className="unit">{unit}</div>
        </div>
        <div className="space"></div>
        <div className={design}>
          <p className="bold">Promedio</p>{" "}
          <div className="value">
            {average !== null ? `${average.toFixed(2)} ` : "Cargando..."}
          </div>{" "}
          <div className="unit">{unit}</div>
        </div>
      </div>
      <div
        className="chart-graphic"
        style={{ position: "relative", height: "30vh", width: "80%" }}
      >
        {data && <Line data={data} options={options} />}
      </div>
    </div>
  );
}

export default Chart;
