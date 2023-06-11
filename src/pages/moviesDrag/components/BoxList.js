import { StrictModeDroppable } from "./StrictModeDroppable";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import { convertToTime } from "../../../utils/utilFunction";
import {
  BoxWrapper,
  BoxItem,
  BoxImg,
  BoxBreakImg,
  Time,
  BoxContent,
  Clone,
} from "../styles/BoxList";

function BoxList({ dataArr }) {
  return (
    <StrictModeDroppable droppableId="BOXES" isDropDisabled={true}>
      {(provided, snapshot) => (
        <BoxWrapper
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {dataArr.map((item, index) => {
            const { _id:id, movieCName, movieTime, imgUrl, width } = item;
            const tmpTime = convertToTime(movieTime);
            const isBreakBlock = movieCName.indexOf("間格時間") !== -1;
            function getBreakColorKey(movieCName) {
              if (movieCName === "間格時間15分") {
                return "break15";
              } else if (movieCName === "間格時間30分") {
                return "break30";
              } else if (movieCName === "間格時間60分") {
                return "break60";
              }
            }
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <Tooltip title={`電影:${movieCName} 時長:${tmpTime}`}>
                      <BoxItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                        width={width}
                      >
                        {isBreakBlock ? (
                          <BoxBreakImg imgUrl={getBreakColorKey(movieCName)} />
                        ) : (
                          <BoxImg src={imgUrl} alt="" />
                        )}
                        <Time isDragging={snapshot.isDragging}>{tmpTime}</Time>
                        <BoxContent isDragging={snapshot.isDragging}>
                          {movieCName}
                        </BoxContent>
                      </BoxItem>
                    </Tooltip>

                    {/* 下面這個行為是拖動後複製一個在旁邊 */}
                    {snapshot.isDragging && (
                      <Clone>
                        <BoxImg src={imgUrl} alt="" />
                        <Time>{tmpTime}</Time>
                        <BoxContent>{movieCName}</BoxContent>
                      </Clone>
                    )}
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </BoxWrapper>
      )}
    </StrictModeDroppable>
  );
}

export default BoxList;
