import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
export const PageTitle = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: #00a886;
  margin-bottom: 24px;
`;

export const ToolBar = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  > div {
    flex: 1;
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const SaveBtn = styled.button`
  width: 112px;
  height: 40px;
  background: #8c99ae;
  border-radius: 4px;
  color: white;
  border: none;
  margin-top: 24px;
`;
