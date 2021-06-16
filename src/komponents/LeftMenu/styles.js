import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: translate(0px);
    opacity: 1;
  }
  to {
    transform: translate(-1000px);
    opacity: 0;
  }
`;

const rotate1 = keyframes`
  from {
    transform: translate(-1000px);
    opacity: 0;
  }
  to {
    transform: translate(0px);
    opacity: 1;
  }
`;

export const MenuLeft = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-name: ${(props) => (props.animate == "true" ? rotate : rotate1)};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  background-color: #ececec;
  width: 300px;
  height: 100vh;
  float: left;
`;

export const LeftMenuHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #004a86;
  display: flex;
  align-items: center;
  position: relative;
`;

export const LeftMenuHeaderText = styled.h3`
  padding: 10px;
  color: #ffffff;
`;

export const LeftMenuHeaderClose = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  i{
    color: red;
  }
`;

// export

export const LeftMenuList = styled.ul`
  width: 100%;
`;

export const LeftMenuListItem = styled.li`
  width: 100%;
  padding: 10px 10px;
  cursor: pointer;
  font-weight: bold;
  color: #191a1c;
  :hover {
    background-color: #d7d7d7;
    color: #004a86;
  }
`;
