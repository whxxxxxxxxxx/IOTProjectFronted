import React from "react";
import { Flex, Radio } from 'antd';
import Charts1 from '../../charts/chart1'
import Charts2 from '../../charts/chart2'
import Charts3 from '../../charts/chart3'
import Charts4 from '../../charts/chart4'
import TimeDisplay from '../../charts/charttry'
import '../../charts/charts.css'


class Charts extends React.Component {
  render() {
    return (
      <div>
        <h1>设备数据可视化展示</h1>
        <div>
          <TimeDisplay></TimeDisplay>
        </div>
        
        <Flex>
          <Charts1></Charts1>
          <Charts2></Charts2>
        </Flex>
        <Flex>
          <Charts3></Charts3>
          <Charts4></Charts4>
        </Flex>
      </div>
    );
  }
}

export default Charts;