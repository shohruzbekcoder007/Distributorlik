import styled from 'styled-components';

export const LoginWrapper = styled.div`
  width: 100%;
  height:  100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  widht: 300px;
  min-height: 220px;
  padding: 15px;
  border: 2px solid #eeeeee;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 2px 5px 3px 1px #eee;
`;

export const LoginTitle = styled.h3`
  font-size: 24px;
  text-align: center;
  padding-bottom: 4px;
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

export const SubmitWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: end;
`;

export const SubmitButton = styled.button`
  background-color: #004a86;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const ErrorMessage = styled.span`
  display: block;
  text-align: center;
  font-size: 12px;
  color: red;
`;


