import React from 'react'
import { observer } from "mobx-react";
import { globalState, getRoles } from "./../../globalState";
import ErrorLogin from '../ErrorLogin';
import Omborchi from '../Omborchi/'
import KassirKomponents from '../KassirKomponents'
import CEO from '../CEO/CEO';
import DirektorPage from '../DirektorPage/DirektorPage';

const _Roles = () => {

  let role = sessionStorage.getItem("role");

  

    if(globalState.user.role == ''){
        if(role == ''){
            return <ErrorLogin/>
        }else{
            if(role == "accountant") return <div className="scroll-div"><Omborchi/></div>
            if(role == "director") return <DirektorPage/>
            if(role == "CEO") return <CEO/>
            if(role == "cashier") return <div className="scroll-div"><KassirKomponents/></div>
            return <ErrorLogin/>
        }
    }else{
        if(globalState.user.role == "accountant") return <div className="scroll-div"><Omborchi/></div>
        if(globalState.user.role == "director") return <DirektorPage/>
        if(globalState.user.role == "CEO") return <CEO/>
        if(globalState.user.role == "cashier") return <div className="scroll-div"><KassirKomponents/></div>
        return <ErrorLogin/>
    }
}

export default observer(_Roles);
