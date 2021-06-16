import styled from 'styled-components';

export const ListUl = styled.ul`
    // width: 100%;
    text-align: center;
    padding: 15px 5px;
    // background-color: #f9f9f9;
    border-radius: 6px;
    display: inline-block;
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
    transition: all .3s ease; 
    :last-child{
        border-bottom: 1px solid #dfdfdf;
        background-color: #d7d7d7;

    }
    :first-child{
        background-color: #002734;
        height: 50px;
        div{
            p{
                color: #fff;
            }
            border: none;
        }
        :hover{
            background-color: #002734; 
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
  @media (max-width: 840px){
      width: 100%;
      overflow: scroll;
  }
`;

export const CreateBox = styled.div`
  width: 100%;
  margin: 5px;
  background-color: #343b51;
  border-radius: 6px;
  padding: 20px;
`;

export const SubmitButton = styled.button`
  background-color: rgb(0, 109, 124);
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;


export const CatigProd = styled.div`
    display: block;
    width: 100%;
`;

export const CatigProdUl = styled.ul`
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CatigProdLi = styled.li`
    width: 197px;
    height: 47px;
    color: #006D7C;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    border: 1px solid #006D7C;
    @media (max-width: 550px){
        width: 150px;
        margin-left: 5px;
        margin-right: 5px;
        height: 40px;
    }
`;
