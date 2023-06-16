import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import { Layout, Space, Tag, Tabs } from "antd";
// import type { TabsProps } from 'antd';
import { apiStatistics } from '@/api';
const { Content } = Layout;
const { TabPane } = Tabs;

const { getBranchRp } = apiStatistics


function Information() {

  const tabStyle = {
    fontSize: '32px', 
    // color: '#0159a1',
    fontWeight: 'bold'
  };

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
              fontSize: 20,
              color: '#1677ff'
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
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: 'rgb(230 231 232)'
      }}
    >
      <div style={{ margin: "auto 5%", width: '90%' }}>
      <Space
        className='cantainer'
        direction="vertical"
        size="middle"
        // align=" "
        style={{
          display: 'flex',
          width: '80vw',
        }}
      >
        <Tabs
          defaultActiveKey="1"
          type="line"
          size="large"
          >
            <TabPane tab={<span style={tabStyle}>消費紀錄</span>} key="1">
              暫無資料
            </TabPane>
          </Tabs>
        <ReactEcharts
          option={chartData}
          style={{ width: '50%', height: '50vh', backgroundColor: '#ffffff', }}
          // onEvents={{
            //   click: (params) => handleSeatClick(params.name),
            // }}
            />
      </Space>  
      </div>
    </Content>
  </>
  );
}
export default Information;
