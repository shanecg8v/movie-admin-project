import 'echarts/lib/component/grid'
import { Layout, Typography, Col, Row, Select, Button, message } from "antd"
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { setTheater, setRoom, setSeats, selectTheater } from "@/store/slice/theaterSlice";
import { useNavigate  } from "react-router-dom";

const { Content } = Layout;

const { Title } = Typography;
const { getTheaterList, getRooms, getSeatMap, patchRoom } = apiTheater

const Seats = () => {


  const { theaterId, roomId, seats} = useSelector(selectTheater)
  
  const dispatch = useDispatch();

  const [options, setOptions] = useState(false)
  const [rooms, setRooms] = useState([])

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
    dispatch(setTheater(id))
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
    dispatch(setRoom(roomId))
    getSeatMap(theaterId, roomId).then(({data: { data }}) => {
      let { seats } = data[0]
      seats = seats.map(p => {
        return {
          ...p,
          seatNumber: `${p.x} 排 ${p.y}`
        }
      })
      setSeatData(seats)
      dispatch(setSeats(seats))
    })
  }

  const seatSize = 32 
  const seatGap = 30
  const seatOffsetX = 100  
  const seatOffsetY = -350

  const maxRows = 20
  const maxColumns = 18

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

  const saveSeats = async () => {
    let results
    try {
      results = await patchRoom({
        theaterId,
        roomId,
        seats: seatData 
      })
      
    } catch (error) {
      return message.error('修改失敗')
    }

    console.log('results', results)
    message.success("修改成功");

  }

  const getOption = () => {
    const option = {
      legend: {},
      xAxis: { 
        type: 'value',
        show: false,
        min: 0,
        max: seatSize * maxColumns + seatGap * (maxColumns - 1) + seatOffsetX,
        axisLabel: {
          align: 'center' 
        }
      },
      yAxis: { 
        type: 'value',
        show: false,
        min: 0,
        max: seatSize * maxRows + seatGap * (maxRows - 1) + seatOffsetY,
        axisLabel: {
          align: 'center' 
        }
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
              (seat.x - 1) * (seatSize + seatGap) + seatOffsetX ,
              (maxRows - seat.y) * (seatSize + seatGap) + seatOffsetY,
            ],
          })),
        },  
      ],
    };
    return option;
  };



  return (
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: 'rgb(230 231 232)'
    }}
  >
    <div style={{ margin: "auto 5%", width: '90%' }}>
      <h2>
        座位  
      </h2>
      <Row className="d-flex justify-content-center align-items-center mb-3">
        <Col> 
          <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
        </Col>
        <Col className="ms-3">
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
        <Col className="ms-3">
          <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
        </Col>
        <Col className="ms-3">
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
      <Row className="d-flex justify-content-center align-items-center mb-3">
        <h2> 螢幕 </h2>
      </Row>
      <Row className="d-flex justify-content-center align-items-center mb-3">
        <ReactEcharts
          option={getOption()}
          style={{ width: '900px', height: '600px', backgroundColor: '#ffffff', }}
          onEvents={{
            click: (params) => handleSeatClick(params.name),
          }}
        />
      </Row>
      <Row
        className="d-flex justify-content-center align-items-center mb-3"
      >
        <Button
          style={{
            width: '50%',
          }}
          size="large"
          width={500}
          onClick={saveSeats}
        >儲存</Button>
      </Row>
    
    </div>
  </Content>
  )
}
export default Seats



