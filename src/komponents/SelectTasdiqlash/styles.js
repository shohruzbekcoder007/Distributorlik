import styled from 'styled-components';

export const Selects = styled.div`
    width: 185px;
    height: 45px;
    border: 1px solid #e7e7e7;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #004a86;
    ::after{
        content: '';
        width: 9px;
        height: 9px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    :hover ul{
        display: block
    }
`;

export const Selected = styled.p`
    cursor: pointer;
    padding: 0 10px;
    font-size: 12px;
    color: #191a1c;
    font-weight: 400;
    font-family: "Roboto";
    color: #ffffff;
`;

export const SelectList = styled.ul`
    display: none;
    z-index: 30;
    position: absolute;
    background-color: #ffffff;
    top: 100%;
    left: 0;
    // overflow-y: scroll;
    overflow-x: hidden;
    max-height: 200px;
    width: 100%;
    transform: translateY(-4px);
`;

export const SelectItem = styled.li`
    cursor: pointer;
    padding: 10px 20px;
    font-size: 12px;
    color: #191a1c;
    font-weight: 400;
    font-family: "Roboto";
    border: 1px solid #e7e7e7;
    transition: all .5s ease;
    &:hover{
        color: #ffffff;
        background-color: #fcaf17;
    }
`;
