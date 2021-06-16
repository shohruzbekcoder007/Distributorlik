import React from 'react'
import NewCatigory from './NewCatigory'
import { CatigProd, CatigProdUl, CatigProdLi } from './styles'
import axios from './../../baseUrl';
import { getToken } from './../../globalState';
import NewProduct from './NewProduct'

export default function OmborchiNewProduct() {
    const [active, setActive] = React.useState(1);
    const [categoriyOrProd, setCategoriyOrProd] = React.useState(1)
    const activStyle = {
        backgroundColor: "#006D7C",
        color: "#fff"
    }

    return (
        <div style={{paddingTop: "25px"}}>
            <CatigProd>
                <CatigProdUl>
                    <CatigProdLi
                        onClick={()=>{setCategoriyOrProd(1); setActive(1)}}
                        style={(active == 1)?activStyle:{}}
                    >
                        Maxsulot qo'shish
                    </CatigProdLi>
                    <CatigProdLi
                        onClick={()=>{setCategoriyOrProd(2); setActive(2)}}
                        style={(active == 2)?activStyle:{}}
                    >
                        Kategoriya qo'shish
                    </CatigProdLi>
                </CatigProdUl>
                {(categoriyOrProd==1)?<NewProduct/>:<NewCatigory/>}
            </CatigProd>
        </div>
    )
}