import { StrictModeDroppable } from "./StrictModeDroppable";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import { convertToTime } from "../../../utils/utilFunction";
import { MyZIndex } from "./CommonVar";

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #8c99ae;
  position: sticky;
  top: 20px;
  z-index: ${MyZIndex.sticky};
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 100%;
    height: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;
const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  width: 100px;
  height:${(props) =>{
    return props.isDragging ? "100px" : "150px";
  }} !important;
  border: ${(props) => {
    return props.isDragging ? "1px  dashed #4099ff" : "none";
  }};
  position: relative;
`;
const BoxImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
`;
const Time = styled.div`
  color: white;
  position: absolute;
  right: 3px;
  bottom: 50px;
  display: ${(props) => (props.isDragging ? "none" : "block")};
`;
const BoxContent = styled.div`
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: ${(props) => (props.isDragging ? "none" : "block")};
`;
const Clone = styled(BoxItem)`
  /* + div {
    display: none !important;
  } */
  opacity: 0.2;
`;

function BoxList({ dataArr }) {


  return (
    <StrictModeDroppable droppableId="BOXES" isDropDisabled={true}>
      {(provided, snapshot) => (
        <BoxWrapper
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {dataArr.map((item, index) => {
            const { id, movieCName,movieTime, imgUrl, width } = item;
            const tmpTime = convertToTime(movieTime);
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
                        <BoxImg src={imgUrl} alt="" />
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
