import { Select, DatePicker, message,Button } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { apiTheater } from "../../../api";
import locale from "antd/es/date-picker/locale/zh_TW";
import moment from "moment";
import dayjs from "dayjs";
const { getFrontTheaterList } = apiTheater;
const { RangePicker } = DatePicker;

const ToolBar = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  > div {
    flex: 1;
  }
`;
function ToolBarList() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateValue, setDateValue] = useState([null, null]);
  console.log("***", dateValue[0], dayjs(dateValue[0]).format("YYYY-MM-DD"));
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
          label: room._id,
          value: room._id,
        }))
      : [];
  const handleRangePickerChange = (dates) => {
    if (dates && dates[0]) {
      const endDate = dates[0].clone().add(7, "days");
      console.log("🚀 ~ file: ToolBarList.js:64 ~ handleRangePickerChange ~ endDate:", endDate)
      
      setDateValue([dates[0], endDate]);
    } else if (dates && dates[1]) {
      const startDate = dates[1].clone().subtract(7, "days");
      setDateValue([startDate, dates[1]]);
    }
    // 手動關閉日曆面板
    rangePickerRef.current.blur();
  };   
  const handleSearch = async()=>{
    console.log(dateValue,selectedCinema,selectedRoom)
    if (dateValue && selectedCinema && selectedRoom) {
      const startDate = dayjs(dateValue[0]).format("YYYY-MM-DD");
      const endDate = dayjs(dateValue[1]).format("YYYY-MM-DD");
      const tmpObj = {
        cinemaId: selectedCinema,
        roomId: selectedRoom,
        startDate,
        endDate,
      };
      console.log(tmpObj);
      // 執行資料庫查詢或其他操作
    } else {
      // 處理日期、影城或影廳未選擇的情況
      console.log("請選擇日期、影城和影廳");
    }
  }   
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
        <Button type="primary" onClick={handleSearch}>
          查詢
        </Button>
      </ToolBar>
    </>
  );
}
export default ToolBarList;
