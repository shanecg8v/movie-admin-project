import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./components/StrictModeDroppable";
import BoxList from "./components/BoxList";
import DragContainer from "./components/DragContainer";
import { Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_TW";

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
  >div{
    flex: 1;
  }
`;

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
      imgUrl: "https://picsum.photos/seed/12/200/300",
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
    console.log(
      "開始",
      source,
      source.droppableId,
      "結束",
      destination.droppableId
    );
    switch (source.droppableId) {
      //同container互相拖曳
      case destination.droppableId:
        console.log("---", destination.droppableId);
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
      default:
        console.log("default");
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
  console.log("state", allDateDataObj);
  return (
    <>
      <PageTitle>電影上架</PageTitle>
      <ToolBar>
        <Select
          defaultValue={{
            value: "高雄影城",
            label: "高雄影城",
          }}
          style={{
            width: 200,
          }}
          onChange={() => {}}
          options={[
            {
              value: "高雄影城",
              label: "高雄影城",
            },
          ]}
        />
        <Select
          defaultValue={{
            value: "A影廳",
            label: "A影廳",
          }}
          style={{
            width: 200,
          }}
          onChange={() => {}}
          options={[
            {
              value: "A影廳",
              label: "A影廳",
            },
          ]}
        />
        <DatePicker locale={locale} onChange={() => {}} />
      </ToolBar>
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
    </>
  );
};

export default App;
