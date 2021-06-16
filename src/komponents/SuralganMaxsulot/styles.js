import styled from "styled-components";

export const ListWrapper = styled.div`
  @media (max-width: 1260px) {
    width: 100%;
    overflow: scroll;
    // padding: 0 5px;
  }
`;

export const ListUl = styled.ul`
  text-align: center;
  border-radius: 6px;
  display: inline-block;
  @media (max-width: 1260px) {
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
  text-align: center;
`;

export const EditDeleteSave = styled.div`
  display: inline-block;
  color: #004a86;
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
  color: #004a86;
  cursor: pointer;
  font-size: 20px;
  padding: 0 3px;
`;

export const SubmitButton = styled.button`
  background-color: #004a86;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;