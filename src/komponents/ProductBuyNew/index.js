import React from 'react'
import { observer } from "mobx-react";
import {
    ProductBuyWrapper,
    ProductBuyContainer,
    CatigProd,
    CatigProdUl,
    CatigProdLi
} from './styles'
import axios from '../../baseUrl'
import ProductBuyCreate from './ProductBuyCreate'
import ProductBuyList from './ProductBuyList'
import { globalState } from "../../globalState"

const _ProductBuyNew = (props) => {

    const [products, setProducts] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const limit = 5;


    const [active, setActive] = React.useState(1);
    const [categoriyOrProd, setCategoriyOrProd] = React.useState(1)
    const activStyle = {
        backgroundColor: "#006D7C",
        color: "#fff"
    }

    let term = "";

    const qaytaYasash = () => {
        getBuyProducts();
    }

    const getBuyProducts = () => {
        axios.get(`order/buy-order-list/?limit=${limit}&offset=${(offset-1)*limit}`,{
            params: {
                term: globalState.search
            }
        })
        .then((res) => {
            setProducts(res.data.buy_order_list);
            setCount(Math.floor(res.data.count/limit) + 1);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    React.useEffect(()=>{
        getBuyProducts();
    },[offset, globalState.search, globalState.plus])

    return (
        <>
            <div style={{paddingTop: "25px"}}>
                <CatigProd>
                    <CatigProdUl>
                        <CatigProdLi
                            onClick={()=>{setCategoriyOrProd(1); setActive(1)}}
                            style={(active == 1)?activStyle:{}}
                        >
                            Kelgan maxsulotlar
                        </CatigProdLi>
                        <CatigProdLi
                            onClick={()=>{setCategoriyOrProd(2); setActive(2)}}
                            style={(active == 2)?activStyle:{}}
                        >
                            Qaytariladigan maxsulotlar
                        </CatigProdLi>
                    </CatigProdUl>
                    {
                        (categoriyOrProd==1)?
                            <ProductBuyWrapper>
                                <ProductBuyContainer>
                                    <div style={{display: "inline-block"}}>
                                        {
                                            (globalState.plus)?
                                            <ProductBuyCreate func = {qaytaYasash}/>:
                                            <></>
                                        }
                                    </div>
                                    <ProductBuyList
                                        products={products}
                                        pgFunc={(arg)=>{setOffset(arg)}}
                                        count = { count }
                                    />
                                </ProductBuyContainer>
                            </ProductBuyWrapper>:
                            <></>
                    }
                </CatigProd>
            </div>
        </>
    )
}

export default observer(_ProductBuyNew);