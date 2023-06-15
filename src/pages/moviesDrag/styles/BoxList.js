import { MyZIndex } from "../components/CommonVar";
import styled from "styled-components";

export const BoxWrapper = styled.div`
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
export const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  width: 100px;
  height: ${(props) => {
    return props.isDragging ? "100px" : "150px";
  }} !important;
  border: ${(props) => {
    return props.isDragging ? "1px  dashed #4099ff" : "none";
  }};
  position: relative;
`;
export const BoxImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
  background-color: white;
`;
export const BoxBreakImg = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
  background-color: ${(props) => {
    const type = props.imgUrl;
    const colorObj = {
      break15: "red",
      break30: "blue",
      break60: "green",
    };
    return colorObj[type];
  }};
`;
export const Time = styled.div`
  color: white;
  position: absolute;
  right: 3px;
  bottom: 50px;
  display: ${(props) => (props.isDragging ? "none" : "block")};
`;
export const BoxContent = styled.div`
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: ${(props) => (props.isDragging ? "none" : "block")};
`;
export const Clone = styled(BoxItem)`
  /* + div {
    display: none !important;
  } */
  opacity: 0.2;
`;
