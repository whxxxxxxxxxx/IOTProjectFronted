import React,{useEffect,useState} from "react";
import {Descriptions,Drawer,Button,Form,Input} from "antd";
import {$getone,$getmonitor}from './apis/dataApi';
import Charts5 from './inchart'
export default function DataDetail({opend,setOpend,loadList,deviceidd,setdeviceidd}){
  let [Detaildata,setDetaildata]=useState([])
  let [Location,setLocation]=useState([])
  let [Security,setSecurity]=useState([])
  let [Performance,setPerformance]=useState([])
  let [deviceidc,setdeviceidc]=useState(0)
    useEffect(()=>{
        if(deviceidd!==0){
            $getone(deviceidd).then((data)=>{
              data=data.data
              console.log({data})
              setDetaildata(data)
              const location=data.Location
              setLocation(location)
              const security=data.Security
              setSecurity(security)
            })
            /*$getmonitor(deviceid).then((data)=>{
              data=data.data
              console.log({data})
              data=data.performance_metrics
              setPerformance(data)
            })*/
        }
    },[deviceidd])
    //表单提交方法
    
      //关闭抽屉
    const onClose=()=>{
        
        setdeviceidd(0)//取消编辑状态
        setOpend(false)//关闭抽屉
    }
   
    
    const items = [
        {
          key: '1',
          label: '编号',
          children: Detaildata.SerialNumber,
        },
        {
          key: '2',
          label: '名字',
          children: Detaildata.Name,
        },
        {
          key: '3',
          label: '型号',
          children: Detaildata.ModelData,
        },
        {
          key: '4',
          label: '状态',
          children:Security.EncryptionStatus,
      },
        {
          key: '5',
          label: '位置—纬度',
          children: Location.Latitude,
        },
        {
          key: '6',
          label: '位置—经度',
          children: Location.Longitude,
        },
        /*{
          key: '7',
          label: '速度',
          children: Performance.speed,
        },
        {
            key: '8',
            label: '压力',
            children:Performance.pressure,
        },
        {
            key: '9',
            label: '温度',
            children:Performance.temperature,
        },
        {
            key: '10',
            label: '输出',
            children: Performance.output,
        },*/
      ];
    return (
        <>
        <Drawer title={'设备详情'}
         width={1000} onClose={onClose} open={opend}>
        <Descriptions items={items} column={2} />
        <Charts5 deviceid={deviceidd}></Charts5>
        </Drawer>
        </>
    )
}