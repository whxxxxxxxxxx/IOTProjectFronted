
import React, { useEffect, useRef } from 'react';  
import * as echarts from 'echarts';  
  
const Charts2 = () => {  
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
  
        const response = await fetch("http://172.20.10.2:8001/device/name", requestOptions);  
        const result = await response.json();  
  
        const deviceData = Object.entries(result.data).map(([name, value]) => ({  
          name: name,  
          value: value  
        }));  
  
        // 柱状图颜色数组  
        const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'];  
  
        // 基于准备好的DOM，初始化ECharts图表  
        const chart_two = echarts.init(chartRef.current);  
  
        // 指定图表的配置项和数据  
        const option = { 
          title: {
            text: '设备分布状况',
            subtext: '',
            left: 'center'
        },
        grid: {
          left: '10%',
          top: '25%',
          right: '10%',
          bottom: '10%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
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
    calculable: true,

          xAxis: [  
            {  
              type: 'category',  
              data: deviceData.map(item => item.name),  
              axisLabel: {  
                fontSize: 8  
              },  
            }  
          ],  
          yAxis: [  
            {  
              type: 'value',  
              axisLabel: {  
                fontSize: 15  
              },  
            }  
          ],  
          series: [  
            {  
              data: deviceData.map((item, index) => ({  
                value: item.value,  
                itemStyle: {  
                  color: colors[index % colors.length] // 使用颜色数组中的颜色，循环应用到每个系列  
                }  
              })),  
              type: 'bar'  
            }  
          ]  
          // ... 省略其他配置项，保持不变  
        };  
  
        chart_two.setOption(option);  
  
        // 确保在组件卸载时清理图表实例  
        return () => {  
          if (chartRef.current) {  
            echarts.dispose(chartRef.current);  
          }  
        };  
      } catch (error) {  
        console.log('error', error);  
      }  
    };  
  
    fetchData();  
  }, []); // 空的依赖数组表示这个effect只会在组件首次渲染时运行  
  
  return (  
    <div class="panel bottom">
         
      <div class="chart"  ref={chartRef}></div>
      <div class="panel-footer"></div>
    </div> 
  );
};  
  
export default Charts2;