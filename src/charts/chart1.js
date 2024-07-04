

import React, { useEffect, useRef } from 'react';  
import * as echarts from 'echarts';  
  
const Charts1 = () => {  
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
  
        const response = await fetch("http://172.20.10.2:8001/device/status", requestOptions);  
        const result = await response.json();  
  
        let enabledCount = 0;  
        let disabledCount = 0;  
  
        result.data.forEach(item => {  
          if (item.EncryptionStatus === "Enabled") {  
            enabledCount += item.Count;  
          } else if (item.EncryptionStatus === "Disabled") {  
            disabledCount += item.Count;  
          }  
        });  
  
        // 设置图表的选项  
        const chart_one = echarts.init(chartRef.current);  
        const option = {  
          title: {
            text: '设备在线状态统计',
            subtext: '',
            left: 'center'
        },
        legend: {
            orient: 'vertical',
            left: 32,
            top: 22,
            data: ['Enabled', 'Disabled']
        },
        toolbox: {
            show: true,
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
        calculable: true,
        clockwise: true,
        tooltip:
        {
            tigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        series: [
            {
                name: 'Device Status',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                clockwise: true,
                avoidLabelOverlap: true,
                label: {
                    position: "outside",
                    formatter: "{b}\n{d} %",
                },
                data: [
                    { value: enabledCount, name: 'Enabled' },
                    { value: disabledCount, name: 'Disabled' }
                ]

            }
        ]

        };  
        chart_one.setOption(option);  
  
      } catch (error) {  
        console.log('error', error);  
      }  
    };  
  
    fetchData();  
  
    // 确保在组件卸载时清理图表实例  
    return () => {  
      if (chartRef.current) {  
        echarts.dispose(chartRef.current);  
      }  
    };  
  }, []); // 空的依赖数组表示这个effect只会在组件首次渲染时运行  
  
  return( <div class="panel top">
  
<div class="chart" ref={chartRef}></div>
<div class="panel-footer"></div>
</div>);  
};  
  
export default Charts1;