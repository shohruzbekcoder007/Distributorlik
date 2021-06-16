import styled from 'styled-components';

export const ListUl = styled.ul`
    // width: 100%;
    text-align: center;
    // background-color: #f9f9f9;
    border-radius: 6px;
    display: inline-block;
`;

export const TitleList = styled.p`
    font-family: Segoe UI;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    text-align: left;
    margin-bottom: 10px;
`;

export const ItemLi = styled.li`
    border-top: 1px solid #dfdfdf;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eaeaea;
    background-color: #eaeaea;
    height: 40px;
    cursor: pointer;
    transition: all .3s ease; 
    :last-child{
        border-bottom: 1px solid #dfdfdf;
        background-color: #d7d7d7;

    }
    :first-child{
        background-color: #36394c;
        height: 50px;
        div{
            p{
                color: #fff;
            }
            border: none;
        }
        :hover{
            background-color: #36394c; 
        }
    }
    :nth-child(5){
        background-color: #36394c;
        height: 50px;
        div{
            p{
                color: #fff;
            }
            border: none;
        }
        :hover{
            background-color: #36394c; 
        }
    }
    :hover{
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
`;

export const Message1 = styled.div`
    width: 182px;
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
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

export const LoginInput = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid #004a86;
  border-radius: 4px;
  margin: 6px 0;
  font-size: 18px;
  padding: 5px 10px;
  :focus{
    outline: none;
  }
`;

export const ListWrapper = styled.div`
//   @media (max-width: 840px){
      width: 100%;
      overflow: scroll;
    //   padding: 0 20px;
//   }
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
    background-color: #312e2ed1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10
`;