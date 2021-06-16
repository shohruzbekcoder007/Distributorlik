import React from 'react'
import { KattaOyna, TasdiqlashCard, TasdiqlashMesssage, TasdiqlashButton1, TasdiqlashButton2 } from './styles'

export default function TasdiqlashOynasi(props) {
    return (
        <KattaOyna>
            <TasdiqlashCard>
                <TasdiqlashMesssage>{props.text}</TasdiqlashMesssage>
                <div>
                    <TasdiqlashButton1 style={{marginRight: "10px"}} onClick={()=>{
                        props.closeFunc();
                    }}>
                        {props.buttunBirText}
                    </TasdiqlashButton1>
                    <TasdiqlashButton2 onClick={()=>{
                        props.submitFunc();
                    }}>
                        {props.buttunIkkiText}
                    </TasdiqlashButton2>
                </div>
            </TasdiqlashCard>
        </KattaOyna>
    )
}
