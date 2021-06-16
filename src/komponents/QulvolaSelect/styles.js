import styled from 'styled-components';

export const SelectWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
`;

export const SelectInput = styled.input`
    width: 100%;
    outline: none;
    height: 35px;
    border-radius: 6px;
    padding: 0 10px;
`;

export const SelectList = styled.ul`
    width: 100%;
    max-height: 400px;
    background-color: #343b51;
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 100;
`;

export const SelectListItem = styled.li`
    width: 100%;
    height: 35px;
    background-color: #2a3142;
    display: flex;
    align-items: center;
    border: 1px solid #343b51;
    justify-content: center;
    cursor: pointer;
    color: #fff;
`;

export const SelectSearch = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    // z-index: 10;
    background-color: #2a3142;
    pading: 50px;
    height: 35px;
    width: 45px;
    border-radius: 0 6px 6px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;