import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'antd';
const FetchAndRenderChart1 = ({ id, interval }) => {
    const [chartInstance, setChartInstance] = useState(null);
    const [isPartial, setIsPartial] = useState(true);
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://172.20.10.2:8001/data/${id}/performanceMetrics/${interval}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
                    },
                });
                const result = await response.json();
                const resultData = result.data;
                setData(resultData);
                processData(resultData, interval, 20, setSelectedData);
                processData(resultData, interval, 100, setAllData);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, [id, interval]);

    useEffect(() => {
        const chartDom = document.getElementById('chart1');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            setChartInstance(myChart);

            return () => {
                if (myChart) {
                    myChart.dispose();
                }
            };
        }
    }, []);

    useEffect(() => {
        if (chartInstance && selectedData.length > 0) {
            chartInstance.setOption(getOption(selectedData, interval, '传感器数据'));
        }
    }, [chartInstance, selectedData, interval]);

    const processData = (data, interval, timePointCount, setDataFunc) => {
        const step = Math.ceil(data.length / timePointCount);
        const selectedData = [];
        for (let i = 0; i < data.length; i += step) {
            selectedData.push(data[i]);
        }
        setDataFunc(selectedData);
    };

    const getOption = (data, interval, title) => {
        const timestamps = data.map((item) => {
            const date = new Date(item.Ts);
            if (/[mh]$/.test(interval)) {
                return date.toTimeString().substring(0, 8);
            } else {
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${month}-${day}`;
            }
        });

        const temperatures = data.map((item) => item.Temperature);
        const pressures = data.map((item) => item.Pressure);
        const speeds = data.map((item) => item.Speed);
        const outputs = data.map((item) => item.Output);

        return {
            title: {
                text: title,
                top: 10,
                textStyle: {
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'axis',
            },
            toolbox: {
                show: true,
                left: 'center',
                top: 50,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548,
                            },
                        },
                    },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },
            legend: {
                show: true,
                top: 20,
                data: ['温度', '压力', '速度', '输出'],
                textStyle: {
                    fontSize: 12,
                },
            },
            grid: {
                top: '35%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: timestamps,
                name: '时间',
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '温度',
                    type: 'line',
                    data: temperatures,
                    smooth: true,
                },
                {
                    name: '压力',
                    type: 'line',
                    data: pressures,
                    smooth: true,
                },
                {
                    name: '速度',
                    type: 'line',
                    data: speeds,
                    smooth: true,
                },
                {
                    name: '输出',
                    type: 'line',
                    data: outputs,
                    smooth: true,
                },
            ],
        };
    };

    const handleShowProgressDataDetail = () => {
        if (chartInstance) {
            if (isPartial) {
                chartInstance.setOption(getOption(allData, interval, '所有传感器数据'));
            } else {
                chartInstance.setOption(getOption(selectedData, interval, '传感器数据'));
            }
            setIsPartial(!isPartial);
        }
    };

    return (
        <div>
            <div id="chart1" style={{ width: '100%', height: '400px',background:'#f8f8ff'}}></div>
            <Button id="showProgressDataDetailBtn" onClick={handleShowProgressDataDetail} style={{borderColor:'blue',color:'blue',marginTop:'10px',marginBottom:'10px'}} size="small">
                显示详细数据
            </Button>
        </div>
    );
};

export default FetchAndRenderChart1;
