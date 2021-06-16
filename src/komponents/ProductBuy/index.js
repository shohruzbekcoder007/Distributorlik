import React from 'react'
import { observer } from "mobx-react";
import {
    ProductBuyWrapper,
    ProductBuyContainer
} from './styles'
import axios from './../../baseUrl'
import ProductBuyList from './ProductBuyList'
import Title from '../Title'


const _ProductBuy = (props) => {

    return (
        <>
            <Title padding="" text="Yangi maxsulot harid qilish"/>        
            <ProductBuyWrapper>
                <ProductBuyContainer>
                    <ProductBuyList/>
                </ProductBuyContainer>
            </ProductBuyWrapper>
        </>
    )
}

export default observer(_ProductBuy);