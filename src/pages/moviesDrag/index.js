import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./components/StrictModeDroppable";
import BoxList from "./components/BoxList";
import DragContainer from "./components/DragContainer";

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
  console.log("*****", source,sourceClone, droppableSource);
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  console.log("sour", sourceClone, destClone);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };

  return result;
};

const Content = styled.div`
  /* margin-right: 200px; */
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const ITEMS = [
  { id: "item-1", content: "Item 1" },
  { id: "item-2", content: "Item 2" },
  { id: "item-3", content: "Item 3" },
];

const App = () => {
  const [state, setState] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    console.log("開始", source.droppableId, "結束", destination.droppableId);
    switch (source.droppableId) {
      //同container互相拖曳
      case destination.droppableId:
        console.log("---", destination.droppableId);
        setState((prevState) => ({
          ...prevState,
          [destination.droppableId]: reorder(
            prevState[source.droppableId],
            source.index,
            destination.index
          ),
        }));
        break;
      //上方複製元素置container
      case "ITEMS":
        console.log("***", ITEMS);
        setState((prevState) => ({
          ...prevState,
          [destination.droppableId]: copy(
            ITEMS,
            prevState[destination.droppableId],
            source,
            destination
          ),
        }));
        break;
      default:
        console.log("default");
        setState((prevState) =>{
          return {
            ...prevState,
            ...move(
              prevState[source.droppableId],
              prevState[destination.droppableId],
              source,
              destination
            ),
          };
        }
          
        );
        break;
    }
  };
  console.log("state", state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoxList />
      <Content>
        {Object.keys(state).map((list) => (
          <StrictModeDroppable
            key={list}
            droppableId={list}
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <DragContainer
                provided={provided}
                snapshot={snapshot}
                dragDataObj={state}
                containerKey={list}
              />
            )}
          </StrictModeDroppable>
        ))}
      </Content>
    </DragDropContext>
  );
};

export default App;
