import React, {useState} from 'react'
import Header from './../Header'
import LeftMenu from './../LeftMenu/'

export default function Direktor() {

    const [openLeftMenu, setLeftMenu] = useState(true);

    const openCloseLeftMenu = (arg) => {
        setLeftMenu(arg);
    }

    return (
        <>
            <Header hamburgerga = {openCloseLeftMenu} rolName="Direktor"/>
            <LeftMenu close={openLeftMenu} functionClose = {openCloseLeftMenu}/>
            {openLeftMenu?(<p>ochildi</p>):(<p>yopildi</p>)}
        </>
    )
}