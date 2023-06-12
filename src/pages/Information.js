import NiceModal from '@ebay/nice-modal-react';
import ExampleModal from '../components/Modal/ExampleModal';
import ReactEcharts from 'echarts-for-react';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button, Table, Divider, Typography, Card, Col, DatePicker, Form, Row, Select, Space, Tag, Tabs } from "antd";
// import type { TabsProps } from 'antd';
import { apiStatistics } from '@/api';

const { getBranchRp } = apiStatistics


function Information() {

  const [size, setSize] = useState('small');

  const [chartData, setChartData] = useState({
    legend: {},
    title: {},
    dataset: {
      dimensions: ['product','totalPrice'],
      source: []
    },
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: []}],
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip:{
      trigger: 'item',
    }
  });

  useEffect(() => {
    const fetchData = async () => {

      const { data } = await getBranchRp({
        sd: new Date(),
        ed: new Date()
      });

      const xData = data.map(item => item.name);
      const yData = data.map(item => item.totalPrice);

      
      setChartData(prevChartData => {
        return {
          title: {
            text: "月營收",
            left: 15,
            top: 15,
            textStyle: {
              fontSize: 20
            },
          },
          xAxis: { ...prevChartData.xAxis, data: xData },
          series: [{ ...prevChartData.series[0], data: yData }],
   
          dataset: {
            source: data
          }
        };
      });
    }


    fetchData();
  }, []);

  
  return (
  <>
    <Tabs
      defaultActiveKey="1"
      type="line"
      size={size}
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Card Tab ${id}`,
          key: id,
          children: `Content of card tab ${id}`,
        };
      })}
    />

    <ReactEcharts
      option={chartData}
      style={{ width: '70%', height: '50vh', backgroundColor: '#ffffff', }}
      // onEvents={{
      //   click: (params) => handleSeatClick(params.name),
      // }}
    />

  </>
  );
}
export default Information;
