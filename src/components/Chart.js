import React, { useState, useEffect }  from "react";
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
  LineElement
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
      display: false
    },
  },
  scales: {
   y: {
       stacked: true,
       beginAtZero: true
   },
   x: {
       beginAtZero: true
     }
  }
 };
var title="";
var design="";
var unit="";
function Chart(props) {
  console.log(props);
  if(props.type === 'temperature'){
    title="Temperatura";
    design="temperature-box";
    unit=" °C";
  }else if (props.type==='weight'){
    title="Peso";
    design="weight-box";
    unit=" Kg";
  }else {
    title="Humedad";
    design="humedad-box";
    unit=" g/m3";
  }
  const [data, setData] = useState(null);
  const [average, setAverage] = useState(null);
  const [last, setLast] = useState(null);
  useEffect(() => {
    fetch("https://refoenergyean-production.up.railway.app/temperature_sensor/show_all_temperatures/", {
      method: "GET",
      headers: {
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const temperatures = data.map(row => parseFloat(row.temperature));
        const sum = temperatures.reduce((total, currentValue) => total + currentValue, 0);
        const averaget = sum / temperatures.length;
        setLast(temperatures[temperatures.length-1]);
        setAverage(averaget);
        const info={
          labels:data.map(row => row.creation_date),
          datasets:[{
              label:props.type,
              data:data.map(row => row.temperature),
              borderWidth:1,
              backgroundColor: props.color,
              borderColor:props.color
          }]
      };
        setData(info);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex-container">
      <div>
        <p className="bold">{title}</p><br />
        <div className={design}>
          <p className="bold">Ultimo Dato</p>  {last !== null ? `${last.toFixed(2)} ` : "Cargando..."} {unit}
        </div>
        <br />
        <div className={design}>
          <p className="bold">Promedio</p>  {average !== null ? `${average.toFixed(2)} ` : "Cargando..."} {unit}
        </div>


      </div>
      <div style={{ position: "relative", height: "30vh", width: "80%" }}>
        {data && <Line data={data} options={options} />}
      </div>
    </div>
    
  );
}

export default Chart;





