import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import TimeLine from "@/assets/image/timeline.png";
import { convertToTime } from "../../../utils/utilFunction";
import { ALL_TIME_MINUTE } from "./CommonVar";
import {
  ContainerWrapper,
  Container,
  BoxBreakItem,
  BoxItem,
  Notice,
  Handle,
  Title,
  DelBtn,
  BreakDelBtn,
} from "../styles/DragContainer";


function DragContainer(props) {
  const { provided, snapshot, dragDataObj, containerKey, setAllDateDataObj } =
    props;

  function handleDel({ containerKey, boxId }) {
    setAllDateDataObj((prev) => {
      const currentContainerArr = prev[containerKey];
      const filterDataArr = currentContainerArr.filter(
        (item) => item.id !== boxId
      );
      return {
        ...prev,
        [containerKey]: filterDataArr,
      };
    });
  }
  function convertWidth(num) {
    return (parseInt(num) / ALL_TIME_MINUTE) * 100 + "%";
  }
  return (
    <ContainerWrapper>
      <Title>{containerKey}</Title>
      <Container
        ref={provided.innerRef}
        isDraggingOver={snapshot.isDraggingOver}
        imgSrc={TimeLine}
      >
        {dragDataObj[containerKey].length
          ? dragDataObj[containerKey].map((item, index) => {
              const { id, movieCName, movieTime, imgUrl } = item;
              const tmpTime = convertToTime(movieTime);
              const tmpWidth = convertWidth(movieTime);
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
                    <Handle {...provided.dragHandleProps} width={tmpWidth}>
                      <Tooltip title={`電影:${movieCName} 時長:${tmpTime}`}>
                        {isBreakBlock ? (
                          <BoxBreakItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            style={provided.draggableProps.style}
                            imgSrc={getBreakColorKey(movieCName)}
                          >
                            <BreakDelBtn
                              imgSrc={imgUrl}
                              twoToneColor="#e70303"
                              onClick={() => {
                                handleDel({ containerKey, boxId: id });
                              }}
                            />
                          </BoxBreakItem>
                        ) : (
                          <BoxItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            style={provided.draggableProps.style}
                            imgSrc={imgUrl}
                          >
                            <DelBtn
                              twoToneColor="#e70303"
                              onClick={() => {
                                handleDel({ containerKey, boxId: id });
                              }}
                            />
                          </BoxItem>
                        )}
                      </Tooltip>
                    </Handle>
                  )}
                </Draggable>
              );
            })
          : !provided.placeholder && <Notice>Drop items here</Notice>}
        {provided.placeholder}
      </Container>
    </ContainerWrapper>
  );
}
export default DragContainer;
