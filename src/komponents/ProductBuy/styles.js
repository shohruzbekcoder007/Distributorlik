import styled from "styled-components";
import bgimg from "./../../img/mahsulotQushish.svg";

export const ProductBuyWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const ProductBuyContainer = styled.div`
  text-align: center;
  padding: 15px 5px;
`;

export const ProductBuyCreate = styled.div`
  width: 100%;
  background-color: #d7d7d7;
`;

export const ProductBuyUl = styled.ul`
  width: 100%;
  display: block;
`;

export const ProductBuyli = styled.li`
  width: 100%;
  display: flex;
  align-item: center;
  border-top: 1px solid #dfdfdf;
  background-color: #eaeaea;
  cursor: pointer;
  height: 40px;
  transition: all 0.3s ease;
  :last-child {
    border-bottom: 1px solid #dfdfdf;
    background-color: #d7d7d7;
    height: 50px;
    p {
      display: block;
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }
  }
  :hover {
    background-color: #d7d7d7;
  }
`;

export const ProductBuyLiGet = styled.div`
  width: 100%;
  display: block;
`;

export const ProductBuyLiPost = styled.div`
  width: 100%;
  display: block;
`;

export const Message = styled.div`
  display: inline-block;
  width: 150px;
  border-left: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
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

export const ProductBuyHeader = styled.div`
  width: 100%;
  display: flex;
  align-item: center;
  background-color: #d7d7d7;
  :nth-child(2) {
    margin-bottom: 40px;
  }
  :nth-child(1) {
    // margin-bottom: 40px;
    background: #002734;
    color: #fff;
    div {
      border: none;
    }
  }
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

export const Addbutton = styled.button`
  background-color: rgb(0, 109, 124);
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  height: 40px;
`;

export const Qaytarish = styled.button`
  background-color: rgb(0, 109, 124);
  color: #ffffff;
  border: none;
  padding: 6px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
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

export const SubmitWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
  background-color: rgb(0, 109, 124);
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
`;

export const SearchOmborxona = styled.div`
  width: 500px;
  padding: 15px 5px;
  background-color: #f9f9f9;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SearchInput = styled.input`
  width: 360px;
  height: 40px;
  border: 2px solid #004a86;
  border-radius: 4px;
  margin: 6px 0;
  font-size: 18px;
  padding: 5px 10px;
  :focus {
    outline: none;
  }
  @media (max-width: 500px) {
    width: 200px;
  }
`;

export const RequestButton = styled.button`
  background-color: rgb(0, 109, 124);
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const ScrollWrapper = styled.div`
  @media (max-width: 910px) {
    width: 100%;
    overflow: scroll;
  }
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const HeaderSubmitInfo = styled.div`
  width: 100%;
  height: 71px;
  background-color: #2a3142;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

