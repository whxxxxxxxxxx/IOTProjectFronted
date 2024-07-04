import React from 'react';
import { useEffect, useState } from 'react';
import FetchAndRenderChart1 from './charts/inchart1';
import FetchAndRenderChart2 from './charts/inchart2';
const Charts5 = ({deviceid}) => {
  const [interval, setInterval] = useState('2m');  
  
  const handleUnitChange = (e) => {  

    const selectedUnit = e.target.value;  
    const inputNumber = parseInt(document.getElementById('inputNumber').value, 10) || 0;  
    let newInterval = '';  
    switch (selectedUnit) {  
      case "minutes":  
        newInterval = `${inputNumber}m`;  
        break;  
      case "hours":  
        newInterval = `${inputNumber}h`;  
        break;  
      case "days":  
        newInterval = `${inputNumber}d`;  
        break;  
      case "weeks":  
        newInterval = `${inputNumber}w`;  
        break;  
      default:  
        newInterval = '2m';  
    }  
    setInterval(newInterval);  
  };  
    return (
        <div>
          <label htmlFor="timeInput">选择查询时长：</label>  
      <input type="number" id="inputNumber" />  
      <select id="unitSelect" value={interval.split('')[-1]} onChange={handleUnitChange} style={{marginBottom:'10px'}}>  
        <option value="minutes">分钟</option>  
        <option value="hours">小时</option>  
        <option value="days">天</option>  
        <option value="weeks">周</option>  
      </select> 
             
            <FetchAndRenderChart1 id={deviceid} interval={interval} />
            <FetchAndRenderChart2 id={deviceid} interval={interval}/>
        </div>
    );
};

export default Charts5;