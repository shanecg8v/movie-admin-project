import { StrictModeDroppable } from "./StrictModeDroppable";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  user-select: none;
  padding: 0.5rem;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? "dashed #4099ff" : "solid #ddd")};
`;
const Clone = styled(BoxItem)`
  /* + div {
    display: none !important;
  } */
`;
const ITEMS = [
  { id: "item-1", content: "Item 1" },
  { id: "item-2", content: "Item 2" },
  { id: "item-3", content: "Item 3" },
];

function BoxList() {
  return (
    <StrictModeDroppable droppableId="ITEMS" isDropDisabled={true}>
      {(provided, snapshot) => (
        <BoxWrapper
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {ITEMS.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <>
                  <BoxItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    style={provided.draggableProps.style}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                    {item.content}
                  </BoxItem>
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
