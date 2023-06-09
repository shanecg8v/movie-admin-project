import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./components/StrictModeDroppable";
import BoxList from "./components/BoxList";
import DragContainer from "./components/DragContainer";
import { Select, DatePicker, message } from "antd";
import { ALL_TIME_MINUTE } from "./components/CommonVar";
import { isNumber } from "../../utils/utilFunction";
import ToolBarList from "./components/ToolBarList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };

  return result;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
const PageTitle = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: #00a886;
  margin-bottom: 24px;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  > div {
    flex: 1;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SaveBtn = styled.button`
  width: 112px;
  height: 40px;
  background: #8c99ae;
  border-radius: 4px;
  color: white;
  border: none;
  margin-top: 24px;
`;
//確認加入拖曳進去的時間是否超過總營業時間
function checkFullTime({ dataArr, boxTime }) {
  if (!!!isNumber(boxTime)) {
    console.error("boxTime輸入時間格式有誤");
    return;
  }
  const sumArrTime = dataArr.reduce((accumulator, item) => {
    return accumulator + item.movieTime;
  }, 0);
  if (!!!isNumber(sumArrTime)) {
    console.error("dataArr輸入時間格式有誤");
    return;
  }
  const isFull = sumArrTime + boxTime > ALL_TIME_MINUTE ? true : false;

  if (isFull) {
    message.error("當天時間電影設定已超過總營業時間，無法在增加");
  }
  return isFull;
}
//缺限制超過時間就不能再拖拉防呆
const App = () => {
  const [allDateDataObj, setAllDateDataObj] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [allDragBoxArr, setAllDragBoxArr] = useState([
    {
      id: "break15",
      _id: "break15",
      movieCName: "間隔時間15分鐘",
      movieTime: 15,
      imgUrl: "break15",
    },
    {
      id: "break30",
      _id: "break30",
      movieCName: "間隔時間30分鐘",
      movieTime: 30,
      imgUrl: "break30",
    },
    {
      id: "break60",
      _id: "break60",
      movieCName: "間隔時間60分鐘",
      movieTime: 60,
      imgUrl: "break60",
    },
    {
      id: "item-1",
      _id: "644f92a2dd795250f85ce15a",
      movieCName: "鬼滅",
      movieTime: 165,
      imgUrl: "https://picsum.photos/seed/red/200/300",
    },
    {
      id: "item-2",
      _id: "644f92a2dd795250f85ce15b",
      movieCName: "蜘蛛人",
      movieTime: 120,
      imgUrl: "https://picsum.photos/seed/green/200/300",
    },
    {
      id: "item-3",
      _id: "644f92a2dd795250f85ce15c",
      movieCName: "蝙蝠俠",
      movieTime: 150,
      imgUrl: "https://picsum.photos/seed/125/200/300",
    },
    {
      id: "item-4",
      _id: "644f92a2dd795250f85ce15d",
      movieCName: "超人",
      movieTime: 150,
      imgUrl: "https://picsum.photos/seed/12/200/300",
    },
    {
      id: "item-6",
      _id: "644f92a2dd795250f85ce156",
      movieCName: "美人魚",
      movieTime: 135,
      imgUrl: "https://picsum.photos/seed/fish/200/300",
    },
    {
      id: "item-7",
      _id: "644f92a2dd795250f85ce157",
      movieCName: "美國隊長",
      movieTime: 150,
      imgUrl: "https://picsum.photos/seed/USA/200/300",
    },
    {
      id: "item-8",
      _id: "644f92a2dd795250f85ce158",
      movieCName: "那些年",
      movieTime: 125,
      imgUrl: "https://picsum.photos/seed/year/200/300",
    },
    {
      id: "item9",
      _id: "644f92a2dd795250f85ce159",
      movieCName: "三國",
      movieTime: 300,
      imgUrl: "https://picsum.photos/seed/89/200/300",
    },
    {
      id: "item-00",
      _id: "644f92a2dd795250f85ce15000",
      movieCName: "鹿鼎記",
      movieTime: 165,
      imgUrl: "https://picsum.photos/seed/90/200/300",
    },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    // console.log(
    //   "開始",
    //   source,
    //   source.droppableId,
    //   "結束",
    //   destination.droppableId
    // );
    let isFull = false;
    switch (source.droppableId) {
      //同container互相拖曳
      case destination.droppableId:
        setAllDateDataObj((prevState) => ({
          ...prevState,
          [destination.droppableId]: reorder(
            prevState[source.droppableId],
            source.index,
            destination.index
          ),
        }));
        break;
      //上方複製元素置container
      case "BOXES":
        isFull = checkFullTime({
          dataArr: allDateDataObj[destination.droppableId],
          boxTime: allDragBoxArr[source.index].movieTime,
        });
        if (isFull) {
          return;
        }
        setAllDateDataObj((prevState) => ({
          ...prevState,
          [destination.droppableId]: copy(
            allDragBoxArr,
            prevState[destination.droppableId],
            source,
            destination
          ),
        }));
        break;
      //不同container box互相拖曳
      default:
        isFull = checkFullTime({
          dataArr: allDateDataObj[destination.droppableId],
          boxTime: allDateDataObj[source.droppableId][source.index].movieTime,
        });
        if (isFull) {
          return;
        }
        setAllDateDataObj((prevState) => {
          return {
            ...prevState,
            ...move(
              prevState[source.droppableId],
              prevState[destination.droppableId],
              source,
              destination
            ),
          };
        });
        break;
    }
  };
  function handleSubmit() {
    console.warn("目前電影資料", allDateDataObj);
    let tmpObj = {};
    for (const [key, value] of Object.entries(allDateDataObj)) {
      console.log(`${key}: ${value}`);
      tmpObj[key] = calculateStartTime(value);
    }
    console.log("***", tmpObj);
    function calculateStartTime(arr) {
      let startTime = new Date("2023-06-09T08:00:00"); // 設定起始時間為 08:00

      for (let i = 0; i < arr.length; i++) {
        const movieTime = arr[i].movieTime;
        const minutesToAdd = movieTime % 60;
        const hoursToAdd = Math.floor(movieTime / 60);

        startTime.setMinutes(startTime.getMinutes() + minutesToAdd);
        startTime.setHours(startTime.getHours() + hoursToAdd);

        arr[i].startTime = startTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
      }

      return arr;
    }
  }
  return (
    <>
      <PageTitle>電影上架</PageTitle>
      <ToolBarList />
      <DragDropContext onDragEnd={onDragEnd}>
        <BoxList dataArr={allDragBoxArr} />
        <Content>
          {Object.keys(allDateDataObj).map((list) => (
            <StrictModeDroppable
              key={list}
              droppableId={list}
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <DragContainer
                  provided={provided}
                  snapshot={snapshot}
                  dragDataObj={allDateDataObj}
                  containerKey={list}
                  setAllDateDataObj={setAllDateDataObj}
                />
              )}
            </StrictModeDroppable>
          ))}
        </Content>
      </DragDropContext>
      <Footer>
        <SaveBtn onClick={handleSubmit}>儲存</SaveBtn>
      </Footer>
    </>
  );
};

export default App;
