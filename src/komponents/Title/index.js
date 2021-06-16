import React from 'react'
import { TitleContainer, TitleText } from "./styles"

export default function Title(props) {
    return (
        <TitleContainer style={{padding: props.padding}}>
            <TitleText>
                {props.text}
            </TitleText>
        </TitleContainer>
    )
}
