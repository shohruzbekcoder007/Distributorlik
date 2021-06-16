import React from 'react'
import List from '../List'
import ListTasdiq from '../ListTasdiq'
import { ListWrapper, CatigProd, CatigProdUl, CatigProdLi } from './styles'

export default function AgentByOmborchi(props) {
    const [active, setActive] = React.useState(1);
    const [tasqlanmagani, setTasdiqlanmani] = React.useState(true);
    const activStyle = {
        backgroundColor: "#006D7C",
        color: "#fff"
    }
    return (
        <ListWrapper>
            <CatigProd>
                <CatigProdUl style={{paddingTop: "25px"}}>
                    <CatigProdLi
                        onClick={()=>{setTasdiqlanmani(true);setActive(1)}}
                        style={(active == 1)?activStyle:{}}
                    >
                        Surovlarni kurish
                    </CatigProdLi>
                    <CatigProdLi
                        onClick={()=>{setTasdiqlanmani(false);setActive(2)}}
                        style={(active == 2)?activStyle:{}}
                    >
                        Tasdiqlangan surovlar
                    </CatigProdLi>
                </CatigProdUl>
                {(tasqlanmagani==1)?<List url={props.url}/>:<ListTasdiq url={props.url}/>}
                {/* <List/> */}
            </CatigProd>
        </ListWrapper>
    )
}
