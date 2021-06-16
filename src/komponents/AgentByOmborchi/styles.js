import styled from 'styled-components';

export const ListWrapper = styled.div`
    text-align: center;
    @media (max-width: 1250px){
        padding: 0;
    }
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
