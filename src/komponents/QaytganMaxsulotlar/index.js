import React from 'react'
import { observer } from "mobx-react";
import {
    LoginInput,
    CreateBox,
    SubmitButton,
    CatigProd,
    CatigProdUl,
    CatigProdLi
} from "./styles"
import axios from './../../baseUrl'
import ReactSelect from '../ReactSelect'
import Title from '../Title'
import QulvolaSelect from './../QulvolaSelect'
import DataPicker from "./../DataPicker";
import KeyBoard from './../KeyBoard';


const _QaytganMaxsulotlar = () => {
    
    const [active, setActive] = React.useState(2);
    const [qaysi, setQaysi] = React.useState("agent");
    const [yangilanish, setYangilanish] = React.useState(false);

    const activStyle = {
        backgroundColor: "#006D7C",
        color: "#fff"
    }

    return (
        <>
            <Title padding="" text="Yashiklar boshqaruvi"/>
            <div className="row" style={{width: "100%", pading: "0", margin: "0"}}>
                <div className="col-md">
                    <Title padding="" text="Taminotchi bilan almashish"/>
                    <YashikTaminotchi yangilash={()=>{setYangilanish(!yangilanish)}}/>
                </div>
                <div className="col-md">
                    <Title padding="" text="Agentlar bilan almashish"/>
                    <YashikXaridor yangilash={()=>{setYangilanish(!yangilanish)}}/>
                </div>
            </div>
            <div className="row" style={{width: "100%", pading: "20px 0 0 0", margin: "0"}}>
                <Title padding="" text="Yashiklar buyicha eslatmalar"/>
                <CatigProd>
                    <CatigProdUl>
                        <CatigProdLi
                            onClick={()=>{
                                setActive(1);
                                setQaysi("taminotchi");
                            }}
                            style={(active == 1)?activStyle:{}}
                        >
                            Taminotchilar
                        </CatigProdLi>
                        <CatigProdLi
                            onClick={()=>{
                                setActive(2);
                                setQaysi("agent");
                            }}
                            style={(active == 2)?activStyle:{}}
                        >
                            Agentlar
                        </CatigProdLi>
                    </CatigProdUl>
                </CatigProd>
                
            </div>
            <div className="row" style={{width: "100%", pading: "0", margin: "0"}}>
                <YashiklarQarzdorlik qaysi={qaysi} yangilanish={yangilanish}/>
            </div>
        </>
    )
}

const YashikTaminotchi = (props) => {

    const [provider, setProvider] = React.useState([]);
    const [selectItems, setSelectItems] = React.useState([]);
    const [provideId, setProvideId] = React.useState(0);
    const [returned, setReturned] = React.useState(0);
    const [txtQuantity, setTxtQuantity] = React.useState(0);
    const [keybords, setKeybords] = React.useState([0,0]);

    let options = []

    const getProvider = () => {
        axios.get(`provider/provider-list/`)
        .then((res) => {
            let ctr = []
            setProvider(res.data.providers);
            res.data.providers.forEach(elem=>{ctr.push({label: elem.name, value: elem.id})});
            setSelectItems(ctr);
            options = ctr;
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const setBox = (arg) => {
        axios.post(`warehouse/provider-box-list/`,arg)
        .then((res) => {
            console.log(res.data);
            alert("malumot saqlandi");
        })
        .catch((error) => {
            console.error(error);
            alert("malumot saqlashda xatolik");
        })
    }

    React.useEffect(() => {
        getProvider();
        console.log("ishladi");
    },[]);

    return (
        <CreateBox>
            <QulvolaSelect
             options={selectItems}
             placeholder="Taminotchi"
             funcValue={
                (arg) => {
                    console.log(arg)
                    setProvideId(arg);
                }
            }
            />
            <div style={{position: "relative"}}>
                <LoginInput
                    placeholder="Nechta yashik"
                    value={txtQuantity}
                    onFocus={() => {setKeybords([0,1])}}
                />
                {
                    (keybords[1] == 1)?
                    <KeyBoard
                        setInputQiymati={
                            (arg)=>{setTxtQuantity(arg);
                        }}
                        closeKeyboard={()=>{setKeybords([0,0])}}
                    />:
                    <></>
                }
            </div>
            <ReactSelect
                placeholder="qabul qilish yoki topshirish"
                options={[
                    {label: "qabul qilib oldim", value: false},
                    {label: "topshirdim", value: true}
                ]}
                func={(arg) => {
                    console.log(arg);
                    setReturned(arg);
                }}
            />
            <div style={{textAlign: "right", paddingTop: "10px"}}>
                <SubmitButton
                    onClick={() => {
                        console.log(returned,provideId,txtQuantity);
                        setBox({is_returned: returned, provider: provideId, quantity: txtQuantity});
                        props.yangilash();
                    }}
                >
                    Tasdiqlash
                </SubmitButton>
            </div>
        </CreateBox>
    )
    
}

const YashikXaridor = (props) => {

    const [provider, setProvider] = React.useState([]);
    const [selectItems, setSelectItems] = React.useState([]);
    const [provideId, setProvideId] = React.useState(0);
    const [returned, setReturned] = React.useState(0);
    const [txtQuantity, setTxtQuantity] = React.useState(0);

    const [keybords, setKeybords] = React.useState([0,0]);

    let options = []

    const getProvider = () => {
        axios.get(`user/agent-list/`)
        .then((res) => {
            let ctr = []
            setProvider(res.data.providers);
            res.data.forEach(elem=>{ctr.push({label: elem.first_name + " " + elem.last_name, value: elem.id})});
            setSelectItems(ctr);
            options = ctr;
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const setBox = (arg) => {
        axios.post(`warehouse/agent-box-list/`,arg)
        .then((res) => {
            console.log(res.data);
            alert("malumot saqlandi");
        })
        .catch((error) => {
            console.error(error);
            alert("malumot saqlashda xatolik");
        })
    }

    React.useEffect(() => {
        getProvider(); 
    },[]);

    return (
        <CreateBox>
            <ReactSelect
                options={selectItems}
                placeholder="Agent"
                func={
                   (arg) => {
                       console.log(arg)
                       setProvideId(arg);
                   }
               }
            />
            <div style={{position: "relative"}}>
                <LoginInput
                    placeholder="Nechta yashik"
                    value={txtQuantity}
                    onFocus={() => {setKeybords([0,1])}}
                />
                {
                    (keybords[1] == 1)?
                    <KeyBoard
                        setInputQiymati={
                            (arg)=>{setTxtQuantity(arg);
                        }}
                        closeKeyboard={()=>{setKeybords([0,0])}}
                    />:
                    <></>
                }
            </div>
            <ReactSelect
                placeholder="qabul qilish yoki topshirish"
                options={[
                    {label: "qabul qilib oldim", value: true},
                    {label: "topshirdim", value: false}
                ]}
                func={(arg) => {
                    console.log(arg);
                    setReturned(arg);
                }}
            />
            <div style={{textAlign: "right", paddingTop: "10px"}}>
                <SubmitButton
                    onClick={() => {
                        console.log(returned,provideId,txtQuantity);
                        setBox({is_returned: returned, agent: provideId, quantity: txtQuantity});
                        props.yangilash();
                    }}
                >
                    Tasdiqlash
                </SubmitButton>
            </div>
        </CreateBox>
    )
}

const YashiklarQarzdorlik = (props) => {

    const [box, setBox] = React.useState([]);

    const getAgentBox = () => {
        axios.get(`warehouse/provider-box-warehouse-list`)
        .then((res) => {
            console.log(res.data,"provider");
            setBox(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getProviderBox = () => {
        axios.get(`warehouse/agent-box-warehouse-list/`)
        .then((res) => {
            console.log(res.data, "agent");
            setBox(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    React.useEffect(() => {
        if(props.qaysi == "agent"){
            getProviderBox();
        } else {
            getAgentBox();
        }
        console.log(box)
    },[props.qaysi, props.yangilanish])

    return (
        <div className="table-responsive" style={{margin: "0 20px"}}>
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Maxsulot</td>
                        <td>Sana</td>
                        <td>Soni</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        box.map((elem, item) => {
                            return (
                                <tr>
                                    <td>{item + 1}</td>
                                    {(elem.agent != undefined)?<td>{elem.agent.first_name + " " + elem.agent.last_name}</td>:<></>}
                                    {(elem.provider != undefined)?<td>{elem.provider.name}</td>:<></>}
                                    <td>
                                        <DataPicker disabled="true" date={new Date(elem.updated_date)} />
                                    </td>
                                    <td>{elem.quantity}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default observer(_QaytganMaxsulotlar);

