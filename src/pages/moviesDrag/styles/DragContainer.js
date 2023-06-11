import { DeleteTwoTone } from "@ant-design/icons";
import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  background: #dbdbdb;
  height: 160px;
  padding: 10px 10px 10px 10px;
`;

export const Container = styled.div`
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
export const BoxBreakItem = styled.div`
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
export const BoxItem = styled.div`
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
export const Notice = styled.div`
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
export const Handle = styled.div`
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
export const Title = styled.div`
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
export const DelBtn = styled(DeleteTwoTone)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
`;
export const BreakDelBtn = styled(DeleteTwoTone)`
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
