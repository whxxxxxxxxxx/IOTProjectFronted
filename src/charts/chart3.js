

//chart3.js  散点图
import React, { useEffect, useRef } from 'react';  
import * as echarts from 'echarts';  
  
const Charts3 = () => {  
  const chartRef = useRef(null);  
  
  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const myHeaders = new Headers();  
        myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");  
  
        const requestOptions = {  
          method: 'GET',  
          headers: myHeaders,  
          redirect: 'follow'  
        };  
  
        const response = await fetch("http://172.20.10.2:8001/device/location", requestOptions);  
        const result = await response.json();  
        const data = result.data; // 假设result.data是设备位置数据数组  
  
        // 创建ECharts实例并设置配置项  
        const chart_three = echarts.init(chartRef.current);  
  
        const pstArray = getLocation(data);  
        const axisData = pstArray.map(item => [item.latitude, item.longitude]);  
  
        const option = {  
          title: {
            text: '设备经纬度分布图',
            subtext: '',
            left: 'center',
            textStyle: {
                textAlign: 'center',
                fontSize: 16
            }
        },
        tooltip: {   //提示框组件
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c} ({d}%)"
        },
        toolbox: {       //配置工具箱组件
            show: true, // 修正拼写错误
            left: 364,
            top: 28,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        xAxis: {
            name: '纬度',
            type: 'value',
            scale: true,
            min: -90,
            max: 90,
            interval: 20
        },
        yAxis: { // 修正属性名
            name: '经度',
            type: 'value',
            scale: true,
            min: -180,
            max: 180,
            interval: 30
        },
        series: [
            {
                type: 'scatter',   // 表示类型为散点型  
                data: axisData,
                symbolSize: 10
            }
        ]

        };  
  
        chart_three.setOption(option);  
  
        // 清理函数，在组件卸载时调用  
        return () => {  
          if (chart_three) {  
            chart_three.dispose();  
          }  
        };  
      } catch (error) {  
        console.log('error', error);  
      }  
    };  
  
    // 调用fetchData函数获取数据并渲染图表  
    fetchData();  
  }, []); // 空的依赖数组表示这个effect只会在组件首次渲染时运行  
  
  // 提取经纬度信息的函数  
  const getLocation = (data) => {  
    return data.map(item => ({  
      latitude: item.Latitude,  
      longitude: item.Longitude  
    }));  
  };  
  
  return (  
    <div class="panel top">
        <h2>散点图-设备转速</h2>
      <div class="chart" ref={chartRef}></div>
      <div class="panel-footer"></div>
    </div>
  );  
};  
  
export default Charts3;
