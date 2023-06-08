import 'echarts/lib/component/grid'
import { Button, Table, Divider, Typography, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import _ from 'lodash'

const { Title } = Typography;
const { getTheaterList, getRooms, getSeatMap } = apiTheater

const Seats = () => {

  const [options, setOptions] = useState(false)
  const [rooms, setRooms] = useState([])
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);

  useEffect(() => {
    getTheaterList().then(({data:{data}})=>{
      const temp = _.map(data, item => {
        return {
          ...item,
          label: item.name,
          value: item._id
        }
      })
      setOptions(temp)
    })
  }, [])

  const onChange = (id) => {
    setSelectedTheaterId(id)
    getRooms(id).then(({data:{data:{rooms}}}) => {
      const temp = _.map(rooms, item => {
        return {
          ...item,
          label: item.name,
          value: item._id
        }
      })
      setRooms(temp)
    })
  }
  const [seatData, setSeatData] = useState([])

  const getSeat = (roomId) => {
    getSeatMap(selectedTheaterId, roomId).then(({data: { data }}) => {
      let { seats } = data[0]
      seats = seats.map(p => {
        return {
          ...p,
          seatNumber: `${p.x} 排 ${p.y}`
        }
      })
      setSeatData(seats)
    })
  }

  const seatSize = 50
  const seatGap = 30
  const seatOffsetX = 0
  const seatOffsetY = 0
  const maxRows = 9
  const maxColumns = 13

  const handleSeatClick = (seatNumber) => {
    setSeatData((prevSeatData) =>
      prevSeatData.map((seat) =>
        seat.seatNumber === seatNumber
          ? { ...seat, situation: 
            seat.situation === '可販售'
            ? '鎖定'
            : seat.situation === '鎖定'
            ? '保留'
            : '可販售',
          }
          : seat
      )
    );
  };

  const getcolor = (params) => {

    const situation = seatData.find((s) => s.seatNumber === params.name)  

    if (situation) {
      switch (situation.situation) {
        case '可販售':
          return 'lightgreen';
        case '鎖定':
          return 'lightgray';
        case '保留':
          return 'lightblue';
        default:
          return 'lightgray';
      }
    }
    return 'lightgreen'
    
  }


  const getOption = () => {
    const option = {
      xAxis: { 
        type: 'value',
        show: false,
        min: 0,
        max: seatSize * maxColumns + seatGap * (maxColumns - 1) + seatOffsetX,
      },
      yAxis: { 
        type: 'value',
        show: false,
        min: 0,
        max: seatSize * maxRows + seatGap * (maxRows - 1) + seatOffsetY,
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const seat = seatData.find((s) => s.seatNumber === params.name )
          return `座位：${seat.seatNumber}<br/>狀態：${seat.situation}`;
        },
      },
      series: [
        {
          type: 'scatter',
          symbol: 'roundRect',
          symbolSize: seatSize,
          itemStyle: {
            color: getcolor
          },
          data: seatData.map((seat) => ({
            key: seat.seatNumber,
            name: seat.seatNumber,
            value: [
              (seat.y - 1) * (seatSize + seatGap) + seatOffsetX,
              (maxRows - seat.x) * (seatSize + seatGap) + seatOffsetY,
            ],
          })),
        },  
        // {
        //   click: (qqq)=> console.log(21313, qqq)
        // }
      ],
    };
    return option;
  };



  return (
    <div style={{ margin: "3%", width: '90%' }}>
      <h2>
        座位  
      </h2>
      <Row justify="center" align="middle" className="mt-3">
        <Col> 
          <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
        </Col>
        <Col span={5} offset={1}>
          <Select
            alias="top"
            style={{ width: 300 }}
            showSearch
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={options} 
          />
        </Col>
        <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
        <Col span={5} offset={1}>
          <Select
            alias="top"
            style={{ width: 300 }}
            showSearch
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={getSeat}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={rooms}
          />
        </Col>
      </Row>
      <Row  justify="center" className="mt-5">
        <h2> 螢幕 </h2>
      </Row>
      <Row justify="center">
        <ReactEcharts
          option={getOption()}
          style={{ width: '900px', height: '600px', backgroundColor: '#ffffff', }}
          onEvents={{
            click: (params) => handleSeatClick(params.name),
          }}
        />
      </Row>
    
  </div>
  )
}
export default Seats
