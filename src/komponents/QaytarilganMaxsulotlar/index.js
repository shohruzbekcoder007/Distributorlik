import React from 'react'
import { observer } from "mobx-react";
import {
    ProductBuyWrapper,
    ProductBuyContainer,
    CatigProd,
    CatigProdUl,
    CatigProdLi
} from './styles'
import SotuvListAgent from './SotuvListAgent'
import Title from '../Title'
import ReturnedClosedPoduct from './ReturnedClosedPoduct';


const _SotuvBulimi = (props) => {

    const [active, setActive] = React.useState(1);
    const [tasqlanmagani, setTasdiqlanmani] = React.useState(true);
    const activStyle = {
        backgroundColor: "#006D7C",
        color: "#fff"
    }

    return (
        <>
            <Title padding="" text="Sut mahsulotlari bo'limi"/>
            <CatigProd>
                <CatigProdUl style={{paddingTop: "25px"}}>
                    <CatigProdLi
                        onClick={()=>{setTasdiqlanmani(true);setActive(1)}}
                        style={(active == 1)?activStyle:{}}
                    >
                        Maxsulot berish
                    </CatigProdLi>
                    <CatigProdLi
                        onClick={()=>{setTasdiqlanmani(false);setActive(2)}}
                        style={(active == 2)?activStyle:{}}
                    >
                        Qaytarib olish
                    </CatigProdLi>
                </CatigProdUl>
                {
                    (tasqlanmagani==1)?
                        <ProductBuyWrapper>
                            <ProductBuyContainer>
                                <SotuvListAgent/>
                            </ProductBuyContainer>
                        </ProductBuyWrapper>:
                        <ReturnedClosedPoduct/>
                    }
            </CatigProd>      
            
        </>
    )
}

export default observer(_SotuvBulimi);