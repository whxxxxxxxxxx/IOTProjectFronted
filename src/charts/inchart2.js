import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Button } from 'antd';
const FetchAndRenderChart2 = ({ id, interval }) => {
    const [chartInstance, setChartInstance] = useState(null);
    const [isPartial, setIsPartial] = useState(true);
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://172.20.10.2:8001/data/${id}/status/${interval}`, {
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
        const chartDom = document.getElementById('chart2');
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
            chartInstance.setOption(getOption(selectedData, interval, 'Running_Status Data'));
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

        const powerstates = data.map(item => (item.PowerState === 'ON' ? 3 : 0));
        const operationalstatus = data.map(item => {
            if (item.OperationalStatus === 'Running') return 2;
            else if (item.OperationalStatus === 'Stopped') return 0;
            else return -2;
        });
        const mode = data.map(item => (item.Mode === 'Auto' ? 1 : -1));

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
                formatter: function (params) {
                    let content = '';
                    params.forEach(function (item) {
                        const seriesName = item.seriesName;
                        const value = item.value;
                        let description = '';
                        switch (seriesName) {
                            case 'Mode':
                                description = value === 1 ? 'Auto模式' : (value === -1 ? 'Manual模式' : '');
                                break;
                            case 'PowerState':
                                description = value === 3 ? 'ON' : (value === 0 ? 'OFF' : '');
                                break;
                            case 'OperationalStatus':
                                description = value === 2 ? 'Running' : (value === 0 ? 'Stopped' : (value === -2 ? 'Error' : ''));
                                break;
                            default:
                                description = '';
                                break;
                        }
                        content += `${seriesName}: ${description} <br> `;
                    });
                    return content;
                },
            },
            legend: {
                data: ['PowerState', 'OperationalStatus', 'Mode'],
                top: 10,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                show: true,
                left: 'center',
                top: 28,
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
            xAxis: {
                type: 'category',
                data: timestamps,
                name: 'time',
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'PowerState',
                    type: 'line',
                    step: 'start',
                    data: powerstates,
                },
                {
                    name: 'OperationalStatus',
                    type: 'line',
                    step: 'start',
                    data: operationalstatus,
                },
                {
                    name: 'Mode',
                    type: 'line',
                    step: 'start',
                    data: mode,
                },
            ],
        };
    };

    const handleShowStatusDataDetail = () => {
        if (chartInstance) {
            if (isPartial) {
                chartInstance.setOption(getOption(allData, interval, '所有Running_Status数据'));
            } else {
                chartInstance.setOption(getOption(selectedData, interval, 'Running_Status数据'));
            }
            setIsPartial(!isPartial);
        }
    };

    return (
        <div>
            <div id="chart2" style={{ width: '100%', height: '400px',background:'#f8f8ff' }}></div>
            
            <Button id="showStatusDataDetailBtn" onClick={handleShowStatusDataDetail} style={{borderColor:'blue',color:'blue',marginTop:'10px'}} size="small">
                显示详细数据
            </Button>
        </div>
    );
};

export default FetchAndRenderChart2;
