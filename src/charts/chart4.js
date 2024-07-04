
import React, { useEffect, useRef } from 'react';  
import ReactECharts from 'echarts-for-react';  
  
const Charts4 = () => {  
  const chartRef = useRef(null);  
  const [deviceData, setDeviceData] = React.useState([]);  
  const [sum, setSum] = React.useState(0);  
  
  useEffect(() => {  
    fetchData();  
  }, []);  
  
  const fetchData = async () => {  
    const myHeaders = new Headers();  
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");  
    const requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };  
      
    try {  
      const response = await fetch("http://172.20.10.2:8001/device/model", requestOptions);  
      const result = await response.json();  
      const data = result.data;  
      let total = 0;  
      data.forEach(item => {  
        total += item.Count;  
      });  
      setDeviceData(data.map(item => ({ name: item.ModelData, value: item.Count })));  
      setSum(total);  
    } catch (error) {  
      console.error('Error fetching data:', error);  
    }  
  };  
  
  const getOption = () => {  
    const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'];  
    return {  
      title: {
        text: '设备类型统计表',
        subtext: '',
        left: 'center',
        textStyle: {
            textAlign: 'center',
            fontSize: 18
        }
    },
    graphic:
        [{
            type: 'text',
            left: 'center',
            top: '52%',
            style: {
                text: sum,
                fill: '#000',
                width: 30,
                height: 30,
                fontSize: 26,
            }
        },
        {
            type: 'text',
            left: 'center',
            top: '62%',
            style: {
                text: '设备',
                fill: '#363636',
                width: 30,
                height: 30,
                fontSize: 22,
            }
        }
        ],
    legend: {
        top: 35,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10
    },
    calculable: true,
    toolbox: {
        show: true,
        orient: 'vertical',
        x: 'right',
        y: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    tooltip:
    {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
        {
            type: 'pie',
            center: ['50%', '60%'],
            radius: ['38%', '60%'],
            avoidLabelOverlap: true,
            label: {
                position: "outside",
                formatter: "{b}\n{d} %",
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: "12",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: true,
            },
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colors[params.dataIndex % colors.length];
                    },
                    borderWidth: 5,
                    borderColor: '#ffffff',
                }
            },
            data: deviceData.map(item => ({
                value: item.value,
                name: item.name
            }))
        }
    ]

    };  
  };  
  
  return ( 
    <div class="panel bottom">
        <ReactECharts option={getOption()} ref={chartRef} /> 
        
    
    </div> 
   
  );  
};  
  
export default Charts4;