import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import TimeLine from "@/assets/image/timeline.png";
import { DeleteTwoTone } from "@ant-design/icons";
import { convertToTime } from "../../../utils/utilFunction";
import { ALL_TIME_MINUTE } from "./CommonVar";
const ContainerWrapper = styled.div`
  display: flex;
  background: #dbdbdb;
  height: 160px;
  padding: 10px 10px 10px 10px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding-top: 40px;
  padding-left: 12px;
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background-image: ${(props) => `url(${props.imgSrc})`};
  background-repeat: no-repeat;
  background-size: 100%;
`;
const BoxBreakItem = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  user-select: none;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background-color: ${(props) => {
    const type = props.imgSrc;
    const colorObj = {
      break15: "red",
      break30: "blue",
      break60: "green",
    };
    return colorObj[type];
  }};
  border: 1px
    ${(props) => {
      return props.isDragging ? "dashed #4099ff" : "1px solid #ddd";
    }};
`;
const BoxItem = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  user-select: none;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  background-image: ${(props) => `url(${props.imgSrc})`};
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px
    ${(props) => {
      return props.isDragging ? "dashed #4099ff" : "1px solid #ddd";
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
  width: ${(props) => props.width};
`;
const Title = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  width: 20%;
  padding: 10px;
`;
const DelBtn = styled(DeleteTwoTone)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
`;
const BreakDelBtn = styled(DeleteTwoTone)`
  position: absolute;
  bottom: -30px;
  right: ${(props) => {
    const type = props.imgSrc;
    const gapObj = {
      break15: "-8px",
      break30: "-5px",
      break60: "5px",
    };
    return gapObj[type];
  }};
  width: 20px;
  height: 20px;
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
      <Title>{titleMap[containerKey]}</Title>
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
              const isBreakBlock = imgUrl.indexOf("break") !== -1;

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
                            imgSrc={imgUrl}
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
