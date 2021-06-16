import styled from 'styled-components'

export const KattaOyna = styled.div`
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

export const TasdiqlashCard = styled.div`
    width: 300px;
    height: 200px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 6px;
`;

export const TasdiqlashMesssage = styled.p`
    text-align: center;
    color: #000000;
    font-size: 16px;
`;

export const TasdiqlashButton1 = styled.button`
    background-color: #ee0808;
    color: #ffffff;
    border: none;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 4px;
    height: 40px;
    font-size: 12px;
`;

export const TasdiqlashButton2 = styled.button`
    background-color: #004a86;
    color: #ffffff;
    border: none;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 4px;
    height: 40px;
    font-size: 12px;
`;