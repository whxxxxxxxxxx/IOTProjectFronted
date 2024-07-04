import React, { Component } from "react";
import './charts.css'
import * as echarts from "echarts";
import { render } from "react-dom";
import {Descriptions,Drawer,Button,Form,Input} from "antd";
export default function Chart5({childrenDrawer,setChildrenDrawer,deviceidc,setdeviceidc})
{
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
      };
      
    return (
        <>
        <Drawer title="视图"
          width={800}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}>
        Charts
        
        
        </Drawer>
        </>
    )
}