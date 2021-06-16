import styled from "styled-components";
import bgimg from "./../../img/mahsulotQushish.svg";

export const ListUl = styled.ul`
  text-align: center;
  // padding: 15px 5px;
  // background-color: #f9f9f9;
  border-radius: 6px;
  display: inline-block;
  @media (max-width: 1330px) {
    margin: 0 5px;
  }
`;

export const ListWrapper = styled.div`
  @media (max-width: 1330px) {
    width: 100%;
    overflow: scroll;
    // padding: 0 5px;
  }
`;

export const ItemLi = styled.li`
  border-top: 1px solid #dfdfdf;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  :first-child {
    background-color: #002734;
    height: 50px;
    div {
      p {
        color: #fff;
      }
      border: none;
    }
    :hover {
      background-color: #002734;
    }
  }
  :nth-child(2):hover {
    background-color: #eaeaea;
  }
  :nth-child(3) {
    background-color: transparent;
    cursor: inherit;
    div {
      border: none;
    }
  }
  :nth-child(3):hover {
    background-color: transparent;
    div {
      border: none;
    }
  }
  :hover {
    background-color: #d7d7d7;
  }
`;

export const Message = styled.div`
  display: inline-block;
  width: 50%;
  padding: 0 15px;
  margin-top: 15px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  input {
    width: 100%;
  }
`;

export const MessageText = styled.p`
  padding: 5px 10px;
  color: #000;
  font-size: 12px;
  color: #191a1c;
  font-weight: 400;
  font-family: "Roboto";
`;

export const AddItemButton = styled.button`
  background-color: rgb(0, 109, 124);
  color: #ffffff;
  border: none;
  width: 100%;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  display: inline-block;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid #004a86;
  border-radius: 4px;
  font-size: 18px;
  padding: 5px 10px;
  :focus {
    outline: none;
  }
`;

export const EditDeleteSave = styled.div`
  display: inline-block;
  color: rgb(0, 109, 124);
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const CatigoryEdit = styled.div`
  disply: inline-block;
  color: rgb(0, 109, 124);
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigoryDelete = styled.div`
  disply: inline-block;
  color: rgb(0, 109, 124);
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigorySave = styled.div`
  disply: inline-block;
  color: rgb(0, 109, 124);
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigoryClose = styled.div`
  disply: inline-block;
  color: rgb(0, 109, 124);
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const AddCatigory = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddProductButton = styled.button`
  background: url(${bgimg});
  outline: none;
  border: none;
  width: 33px;
  height: 33px;
  cursor: pointer;
`;

export const InputGroup = styled.div`
  border-radius: 6px;
  padding: 20px 40px;
  @media (max-width: 500px){
    padding: 0;
  }
`;

export const ModalOyna = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  visibility: visible;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;
