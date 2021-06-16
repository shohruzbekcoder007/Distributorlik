import styled from "styled-components";

export const CatigoryWrapper = styled.div`
    width: 100%;
    text-align: center;
    @media (max-width: 500px){
        padding: 0 5px;
    }
`;

export const Catigory = styled.div`
    width: 440px;
    height: 480px;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 10px;
    display: inline-block;
    background-color: #ffffff;
    @media (max-width: 500px){
        width: 100%;
    }
`;

export const CatigoryList = styled.div`
    width: 100%;
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
`;

export const CatigoryItem = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CatigoryItemInput = styled.input`
    width: 290px;
    display: inline-block;
    display: flex;
    align-items: center;
    height: 40px;
    border: 2px solid #004a86;
    border-radius: 4px;
    font-size: 18px;
    padding: 5px 10px;
    :focus{
        outline: none;
    }
    @media (max-width: 400px){
        width: 200px;
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

export const Addbutton = styled.button`
    background-color: rgb(0, 109, 124);
    color: #ffffff;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 4px;
`;