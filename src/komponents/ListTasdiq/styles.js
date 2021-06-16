import styled from "styled-components";

export const ListWrapper = styled.div`
  @media (max-width: 1320px) {
    width: 100%;
    overflow: scroll;
  }
`;

export const ListUl = styled.ul`
  text-align: center;
  border-radius: 6px;
  display: inline-block;
  @media (max-width: 1320px) {
    margin: 0 5px;
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
  :last-child {
    border-bottom: 1px solid #dfdfdf;
    background-color: #d7d7d7;
  }
  :first-child {
    background-color: #002734;
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
  :hover {
    background-color: #d7d7d7;
  }
`;

export const Message = styled.div`
  display: inline-block;
  width: 165px;
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

export const EditDeleteSave = styled.div`
  display: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const CatigoryEdit = styled.div`
  disply: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigoryDelete = styled.div`
  disply: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigorySave = styled.div`
  disply: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigoryClose = styled.div`
  disply: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const CatigoryPrint = styled.div`
  disply: inline-block;
  color: #006d7c;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const Qaytarish = styled.button`
  background-color: #006d7c;
  color: #ffffff;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
`;

export const Oynacha = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a8;
  z-index: 1000;
`;

export const MahsulotCard = styled.div`
  display: block;
`;

export const LoginContainer = styled.div`
  widht: 300px;
  min-height: 220px;
  padding: 15px;
  border: 2px solid #eeeeee;
  border-radius: 10px;
  display: inline-block;
  background-color: #ffffff;
`;

export const LoginTitle = styled.h3`
  font-size: 20px;
  text-align: center;
  padding-bottom: 4px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid #004a86;
  border-radius: 4px;
  margin: 6px 0;
  font-size: 18px;
  padding: 5px 10px;
  :focus {
    outline: none;
  }
`;

export const SubmitWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
  background-color: #004a86;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  text-align: center;
  font-size: 18px;
  // color: red;
`;
