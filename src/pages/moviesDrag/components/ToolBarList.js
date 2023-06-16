import { Select, DatePicker, message, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { apiSession, apiTheater } from "../../../api";
import locale from "antd/es/date-picker/locale/zh_TW";
import moment from "moment";
import dayjs from "dayjs";
import _ from "lodash";
import { ToolBar } from "../styles";
import { v4 as uuid } from "uuid";

const { getFrontTheaterList } = apiTheater;
const { RangePicker } = DatePicker;

const { getSessionsList } = apiSession;

function ToolBarList(props) {
  const { setAllDateDataObj, setAllDragBoxArr, setCurrentSearchObj } = props;
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateValue, setDateValue] = useState([null, null]);
  const rangePickerRef = useRef(null);
  const disabledDate = (current) => {
    if (!dateValue) {
      return false;
    }
    const tooLate = dateValue[0] && current.diff(dateValue[0], "days") >= 7;
    const tooEarly = dateValue[1] && dateValue[1].diff(current, "days") >= 7;
    return !!tooEarly || !!tooLate;
  };

  const handleCinemaChange = (value) => {
    setSelectedCinema(value);
    setSelectedRoom("");
  };

  const handleRoomChange = (value) => {
    setSelectedRoom(value);
  };

  const getCinemaById = (cinemaId) => {
    return allData.find((cinema) => cinema._id === cinemaId);
  };

  const cinemaOptions = allData.map((cinema) => ({
    label: cinema.name,
    value: cinema._id,
  }));

  const selectedCinemaData = getCinemaById(selectedCinema);
  const roomOptions =
    selectedCinemaData && selectedCinemaData.rooms
      ? selectedCinemaData.rooms.map((room) => ({
          label: room.name,
          value: room._id,
        }))
      : [];
  const handleRangePickerChange = (dates) => {
    if (dates && dates[0]) {
      const endDate = dates[0].clone().add(7, "days");
      setDateValue([dates[0], endDate]);
    } else if (dates && dates[1]) {
      const startDate = dates[1].clone().subtract(7, "days");
      setDateValue([startDate, dates[1]]);
    }
    // 手動關閉日曆面板
    rangePickerRef.current.blur();
  };
  const handleSearch = async () => {
    try {
      if (dateValue && selectedCinema && selectedRoom) {
        setCurrentSearchObj(prev=>{
          return {
            theaterId: selectedCinema,
            roomInfo: selectedRoom,
          };
        });
        const startDate = dayjs(dateValue[0]).format("YYYY-MM-DD");
        const endDate = dayjs(dateValue[1]).format("YYYY-MM-DD");
        const tmpObj = {
          cinemaId: selectedCinema,
          roomId: selectedRoom,
          startDate,
          endDate,
        };
        //測試資料使用
        // const tmpObj = {
        //   cinemaId: "64664fc9421a72b472ed34ee",
        //   roomId: "646650c55be7e59dcab209e5",
        //   startDate: "2023-06-01",
        //   endDate: "2023-06-10",
        // };
        const {
          data: { data },
        } = await getSessionsList({ params: tmpObj });
        const { movieList, sessionData } = data;
        const modifiedSessionData = _.mapValues(sessionData, (value) => {
          return value.map((item) => ({
            ...item,
            id: uuid(),
          }));
        });
        setAllDateDataObj(modifiedSessionData);
        setAllDragBoxArr(movieList);
      } else {
        // 處理日期、影城或影廳未選擇的情況
        message.error("請選擇日期、影城和影廳");
        throw new Error("請選擇日期、影城和影廳");
      }
    } catch (error) {
      console.log("🚀 ~ file: ToolBarList.js:106 ~ handleSearch ~ error:", error)
      
    }
  };
  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        const {
          data: { data },
        } = await getFrontTheaterList();
        setAllData(data);
      } catch (error) {
        console.log("🚀 ~ file: ToolBarList.js:26 ~ fetchData ~ error:", error);
      }
    }
  }, []);

  return (
    <>
      <ToolBar>
        <Select
          placeholder="選擇影城"
          value={selectedCinema || undefined}
          onChange={handleCinemaChange}
          options={cinemaOptions}
          style={{
            width: 200,
          }}
          size="large" 
        />
        <Select
          placeholder="選擇影廳"
          value={selectedRoom || undefined}
          onChange={handleRoomChange}
          options={roomOptions}
          disabled={!selectedCinema}
          style={{
            width: 200,
          }}
          size="large" 
        />
        <RangePicker
          ref={rangePickerRef}
          value={dateValue}
          disabledDate={disabledDate}
          onCalendarChange={handleRangePickerChange}
          locale={locale}
          onChange={handleRangePickerChange}
          format={"YYYY-MM-DD"}
          // onOpenChange={onOpenChange}
          // changeOnBlur
        />
        {/* <DatePicker locale={locale} onChange={() => {}} /> */}
        <Button 
          onClick={handleSearch}
          size="large" 
        >
          查詢
        </Button>
      </ToolBar>
    </>
  );
}
export default ToolBarList;
