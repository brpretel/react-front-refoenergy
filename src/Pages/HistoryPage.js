import React, { useState, useEffect, useCallback } from "react";
import "../style/History.css";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';

function HistoryPage() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(7);
  const API_URL = process.env.REACT_APP_API_URL;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handleFilterChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
      setEndDate(null); // Reset end date when start date changes
    } else if (type === 'end') {
      setEndDate(date);
    }
  };


  const toISODateString = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = useCallback(async () => {
    if (!startDate || !endDate) {
      console.error("Debe especificar tanto la fecha de inicio como la fecha de fin.");
      return;
    }
    try {
      const formattedStartDate = toISODateString(startDate);
      const formattedEndDate = toISODateString(endDate);

      const urls = [
        `${API_URL}/temperature_sensor/show_all_temperatures/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
        `${API_URL}/humidity_sensor/show_all_humidities/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
        `${API_URL}/weight_sensor/show_all_weights/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      ];

      const responses = await Promise.all(
        urls.map(url => axios.get(url))
      );

      const combinedData = responses.reduce((acc, response, index) => {
        const sensorType = index === 0 ? 'temperatura' : index === 1 ? 'humedad' : 'peso';
        const sensorData = response.data.map(item => ({
          id: item.id,
          creation_date: new Date(item.creation_date).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          valor: item[index === 0 ? 'temperature' : index === 1 ? 'humidity' : 'weight'],
          tipo: sensorType
        }));
        return acc.concat(sensorData);
      }, []);

      const sortedData = combinedData.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));

      setData(sortedData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [API_URL, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, fetchData]);
  return (
    <div className="dashboard-layout">
      <div className="graph-container">
        <div className="filter">
        <div className="date-picker-container">
          <label className="title_date" htmlFor="start_date">Fecha de Inicio:</label>
            
            <DatePicker
                id="start_date"
                selected={startDate}
                onChange={(date) => handleFilterChange(date, 'start')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                timeCaption="Hora"
                className="calendar-input"
                placeholderText="Selecciona una fecha"
              />
          </div>
          <div>
          <div className="date-picker-container">
            <label className="title_date" htmlFor="end_date">Fecha de Fin:</label>
            <DatePicker
                id="end_date"
                selected={endDate}
                onChange={(date) => handleFilterChange(date, 'end')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                timeCaption="Hora"
                className="calendar-input"
                placeholderText="Selecciona una fecha"
                minDate={startDate}
              />
              </div>
          </div>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Registro</th>
              <th>Fecha</th>
              <th>Valor</th>
              <th>Tipo de registro</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.creation_date}</td>
                <td>{item.valor}</td>
                <td>{item.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 0 && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
        )}
      </div>
    </div>
  );
}
export default HistoryPage;