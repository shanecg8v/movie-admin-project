import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./components/StrictModeDroppable";
import BoxList from "./components/BoxList";
import DragContainer from "./components/DragContainer";
import { Select, DatePicker, message } from "antd";
import { ALL_TIME_MINUTE } from "./components/CommonVar";
import { isNumber } from "../../utils/utilFunction";
import ToolBarList from "./components/ToolBarList";
import { PageTitle, ToolBar, Footer, SaveBtn } from "./styles";
import _ from "lodash";
import { apiSession } from "../../api";
import moment from "moment";
import { Layout } from "antd"
const { Content } = Layout;

const { postSessionsList } = apiSession;

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
  destClone.splice(droppableDestination.index, 0, {
    ...item,
    id: uuid(),
    sessionId: "",
    movieId: item._id,
  });
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

//確認加入拖曳進去的時間是否超過總營業時間
function checkFullTime({ dataArr, boxTime }) {
  const myBoxTime = parseInt(boxTime);
  if (!!!isNumber(myBoxTime)) {
    console.error("boxTime輸入時間格式有誤");
    return;
  }
  const sumArrTime = dataArr.reduce((accumulator, item) => {
    return accumulator + parseInt(item.movieTime);
  }, 0);

  if (!!!isNumber(sumArrTime)) {
    console.error("dataArr輸入時間格式有誤");
    return;
  }
  const isFull = sumArrTime + myBoxTime > ALL_TIME_MINUTE ? true : false;

  if (isFull) {
    message.error("當天時間電影設定已超過總營業時間，無法在增加");
  }
  return isFull;
}
//缺限制超過時間就不能再拖拉防呆
const App = () => {
  const [currentSearchObj, setCurrentSearchObj] = useState({
    theaterId: "",
    roomInfo: "",
  });
  const [allDateDataObj, setAllDateDataObj] = useState({});
  const [allDragBoxArr, setAllDragBoxArr] = useState([]);
  const isShow = !!!_.isEmpty(allDateDataObj);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
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
  async function handleSubmit() {
    console.warn("目前電影資料1", allDateDataObj);
    let tmpObj = {};
    for (const [key, value] of Object.entries(_.cloneDeep(allDateDataObj))) {
      tmpObj[key] = postCalcProcess(value, key);
    }
    console.warn("目前電影資料2", tmpObj);

    try {
      const res = await postSessionsList({
        data: {
          sessionData: tmpObj,
        },
      });
    } catch (error) {
      console.log("🚀 ~ file: index.js:251 ~ handleSubmit ~ error:", error);
    }

    //整理送出的資料
    function postCalcProcess(arr, key) {
      let rawStartTime = 0;
      let startTime = new Date(`${key}T08:00:00`); // 設定起始時間為 08:00
      for (let i = 0; i < arr.length; i++) {
        const movieTime = parseInt(arr[i].movieTime);
        rawStartTime += movieTime;
        const minutesToAdd = movieTime % 60;
        const hoursToAdd = Math.floor(movieTime / 60);
        startTime.setMinutes(startTime.getMinutes() + minutesToAdd);
        startTime.setHours(startTime.getHours() + hoursToAdd);
        arr[i] = {
          ...arr[i],
          startTime: rawStartTime,
          datetime: moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
          ...currentSearchObj,
        };
        delete arr[i].id;
        delete arr[i]._id;
      }
      return arr;
    }
  }

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
        <h2>電影上架</h2>
        <ToolBarList
          setAllDateDataObj={setAllDateDataObj}
          setAllDragBoxArr={setAllDragBoxArr}
          setCurrentSearchObj={setCurrentSearchObj}
        />
      </div>
      {isShow && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <BoxList dataArr={allDragBoxArr} />
            <Content>
              {Object.keys(allDateDataObj).length > 0 &&
                Object.keys(allDateDataObj).map((list) => (
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
      )}
    </Content>
    </>
  );
};

export default App;
