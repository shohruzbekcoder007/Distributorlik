import styled from "styled-components";
import searchLogo from "./../../img/searchHeader.svg";

export const TopHeader = styled.div`
  height: 71px;
  display: flex;
  color: #ffffff;
  padding-right: 20px;
  padding-left: 71px;
  font-size: 11px;
  align-items: center;
  letter-spacing: 0px;
  font-family: "Roboto";
  justify-content: space-between;
  background-color: #36394c;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  max-width: 100%;
`;

export const TopHeaderText = styled.h3`
  font-weight: 400;
  letter-spacing: -0.1px;
  font-size: 20px;
  span {
    font-weight: 700;
  }
  .bgc {
    color: #fcaf17;
  }
  @media (max-width: 370px){
    display: none;
  }
`;

export const TopHeaderTel = styled.a`
  font-weight: 400;
  cursor: pointer;
  position: relative;
  font-size: 24px;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 0 5px;
`;

export const TopHeaderAdd = styled.div`
  font-weight: 400;
  cursor: pointer;
  position: relative;
  font-size: 24px;
  margin-right: 30px,
  ::before {
    content: "";
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    left: -25px;
    top: -4px;
  }
`;

export const MenuBar = styled.div`
  padding-right: 10px;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
`;

export const LeftSideBarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: sart;
  height: 71px;
  width: 71px;
  padding-top: 5px;
  position: absolute;
  top: 0;
  left: 0;
  img {
    width: 65px;
    height: 56px;
  }
`;

export const LeftSideBarImg = styled.img`
  display: inline-block;
  position: absolute;
`;

export const SearchHeader = styled.input`
  width: 480px;
  height: 43px;
  border: 1px solid #4b6b75;
  border-radius: 100px;
  background-color: transparent;
  color: #ffffff;
  padding: 0 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  outline: none;
  position: relative;
  @media (max-width: 600px){
    padding: 0 20px;
    width: 360px;
  }
  @media (max-width: 450px){
    width: 300px;
  }
  @media (max-width: 370px){
    width: 250px;
  }
`;

export const SearchButton = styled.button`
  width: 26px;
  height: 26px;
  position: absolute;
  right: 20px;
  top: 8px;
  background-color: transparent;
  background: url(${searchLogo});
  border: none;
  outline: none;
  cursor: pointer;
`;

export const SearchButtonIconc = styled.div`
  width: 26px;
  height: 26px;
  background-color: transparent;
  background: url(${searchLogo});
  cursor: pointer;
`;

export const SearchButtonIconcClose = styled.div`
  width: 26px;
  height: 26px;
  font-size: 24px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justfy-content: center;
`;

export const SearchKomponents = styled.div`
  position: relative;
  display: inline-block;
`;

export const Scret = styled.div`
  display: none;
  @media (max-width: 810px){
    display: inline-block;
    margin-right: 16px;
  }
`;



export const SearchMeadia = styled.div`
  @media (max-width: 810px){
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    text-align: center;
    width: 100%;
    padding: 10px 0;
    background-color: #36394c;
    z-index: 1;
    margin-left: 60px;
    border-top: 1px solid #222736c2;
    border-left: 1px solid #222736c2;
    border-right: 1px solid #222736c2;
  }
  @media (max-width: 680px){
    padding-right: 60px;
  }
`;