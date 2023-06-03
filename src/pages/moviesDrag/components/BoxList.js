import { StrictModeDroppable } from "./StrictModeDroppable";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";

const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #8c99ae;
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
  height: 150px;
  border: ${(props) =>
    props.isDragging ? "1px  dashed #4099ff" : "none"};
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
`;
const BoxContent = styled.div`
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

`;
const Clone = styled(BoxItem)`
  /* + div {
    display: none !important;
  } */
`;

function BoxList({ dataArr }) {
  return (
    <StrictModeDroppable droppableId="BOXES" isDropDisabled={true}>
      {(provided, snapshot) => (
        <BoxWrapper
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {dataArr.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <>
                  <Tooltip title={`電影:${item.content} 時長:${item.time}`}>
                    <BoxItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                      imgSrc={item.imgSrc}
                      width={item.width}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      <BoxImg src={item.imgSrc} alt="" />
                      <Time>{item.time}</Time>
                      <BoxContent>{item.content}</BoxContent>
                    </BoxItem>
                  </Tooltip>

                  {/* 下面這個行為是拖動後複製一個在旁邊 */}
                  {snapshot.isDragging && <Clone>{item.content}</Clone>}
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </BoxWrapper>
      )}
    </StrictModeDroppable>
  );
}

export default BoxList;
