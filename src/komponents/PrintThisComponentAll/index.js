import ChekAll from "./../ChekAll";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocation, useHistory } from "react-router-dom";
import styled from 'styled-components';

const PrintButton = styled.button`
  background-color: #004a86;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
`;

const PrintThisComponent = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const maxsulot = useLocation().state;

  const history = useHistory()

  return (
    <div style={{paddingTop: "30px"}}>
      <div style={{textAlign: "right",paddingRight: "20px"}}>
        <PrintButton
          type="button"
          onClick={() => {
            history.goBack();
          }}
        >
          orqaga qaytish
        </PrintButton>
        <PrintButton
          type="button"
          onClick={handlePrint}
        >
          chop qilish
        </PrintButton>
        
      </div>
      <ChekAll maxsulot={maxsulot} ref={componentRef} />
    </div>
  );
};

export default PrintThisComponent;