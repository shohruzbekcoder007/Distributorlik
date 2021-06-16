import React from 'react'
import { observer } from "mobx-react";
import {
    ProductBuyWrapper,
    ProductBuyContainer
} from './styles'
import axios from './../../baseUrl'
import SotuvList from './SotuvList'
import Title from '../Title'


const _SotuvBulimi = (props) => {

    return (
        <>
            <Title padding="" text="Maxsulot sotish"/>        
            <ProductBuyWrapper>
                <ProductBuyContainer>
                    <SotuvList/>
                </ProductBuyContainer>
            </ProductBuyWrapper>
        </>
    )
}

export default observer(_SotuvBulimi);