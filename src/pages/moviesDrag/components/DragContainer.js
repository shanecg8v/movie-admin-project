import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const ContainerWrapper = styled.div`
  display: flex;
  background: #dbdbdb;
  min-height: 160px;
  padding: 50px 10px 10px 10px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 8px;
  border:1px ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
`;
const BoxItem = styled.div`
  display: flex;
  height: 100%;
  user-select: none;
  padding: 0.5rem;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px
    ${(props) => {
      console.log("測試", props.isDragging);
      return props.isDragging ? "dashed #4099ff" : "solid #ddd";
    }};
`;
const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;
const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;
const Title = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  width: 20%;
  padding: 10px;
`;
const titleMap = {
  monday: "週一",
  tuesday: "週二",
  wednesday: "週三",
  thursday: "週四",
  friday: "週五",
  saturday: "週六",
  sunday: "週日",
};

function DragContainer(props) {
  const { provided, snapshot, dragDataObj, containerKey } = props;

  return (
    <ContainerWrapper>
      <Title>{titleMap[containerKey]}</Title>
      <Container
        ref={provided.innerRef}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {dragDataObj[containerKey].length
          ? dragDataObj[containerKey].map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <Handle {...provided.dragHandleProps}>
                    <BoxItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.content}
                    </BoxItem>
                  </Handle>
                )}
              </Draggable>
            ))
          : !provided.placeholder && <Notice>Drop items here</Notice>}
        {provided.placeholder}
      </Container>
    </ContainerWrapper>
  );
}
export default DragContainer;
