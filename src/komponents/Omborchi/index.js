import React, { useState } from 'react';
import AgentByOmborchi from '../AgentByOmborchi';
import ProductBuy from '../ProductBuy';
import Header from './../Header';
import QaytganMaxsulotlar from "./../QaytganMaxsulotlar";
import Omborxona from "./../Omborxona";
import QaytarilganMaxsulotlar from '../QaytarilganMaxsulotlar';
import Sidebar from './../Sidebar';
import { OmborchiWrapper } from './styles';
import Buyurtmalar from './../Buyurtmalar';
import SotuvBulimi from './../SotuvBulimi';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import KeyBoard from './../KeyBoard';

export default function Omborchi() {

    // return <KeyBoard/>

    const [openLeftMenu, setLeftMenu] = useState(true);
    const [selectItem, setSelectItem] = useState(4);
    let { path, url } = useRouteMatch();

    const openCloseLeftMenu = (arg) => {
        setLeftMenu(arg);
    }

    return (
        <Router>
            <Switch>
                <Route exact path={`${path}/`}>
                        {(selectItem == 4) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                        {/* {(selectItem == 1) ? <Header hamburgerga={openCloseLeftMenu} search={true} rolName="Omborxonachi" /> : <></>} */}
                        {(selectItem == 2) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                        {(selectItem == 5) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                        {(selectItem == 6) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                        {(selectItem == 7) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                        {(selectItem == 8) ? <Header hamburgerga={openCloseLeftMenu} rolName="Omborxonachi" /> : <></>}
                    <Sidebar
                        getSelectItem={
                            (arg) => {
                                setSelectItem(arg);
                            }}
                    />
                    <OmborchiWrapper>
                        {/* {(selectItem == 1) ? <AgentByOmborchi url={url} /> : <></>} */}
                        {(selectItem == 2) ? <Buyurtmalar/> : <></>}
                        {(selectItem == 4) ? <Omborxona /> : <></>}
                        {(selectItem == 5) ? <ProductBuy/> : <></>}
                        {(selectItem == 6) ? <QaytganMaxsulotlar /> : <></>}
                        {(selectItem == 7) ? <QaytarilganMaxsulotlar /> : <></>}
                        {(selectItem == 8) ? <SotuvBulimi /> : <></>}
                    </OmborchiWrapper>
                </Route>
            </Switch>
        </Router>
    )
}