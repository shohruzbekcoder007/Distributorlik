import React from 'react'
import KeyBoard from '../KeyBoard';
import axios from './../../baseUrl';
import ControlledAccordions from './../ControlledAccordions'
import { BuyurtmaHeader, LoginInput, SubmitButton } from './styles'
import { observer } from "mobx-react";
import { globalState, getTasdiqlashArray, clearTasdiqlashArray } from './../../globalState';

const _Buyurtmalar = () => {

    const [orderId, setOrderId] = React.useState(0);
    const [orders, setOrders] = React.useState([]);
    const [tasdiqlanganlar, setTasdiqlanganlar] = React.useState(getTasdiqlashArray());

    React.useEffect(()=>{
        console.log(getTasdiqlashArray(),"<-request");
        setTasdiqlanganlar(getTasdiqlashArray());
    },[globalState.tasdiqlangan]);

    return (
        <div>
            <BuyurtmaHeader>
                <p>Tayyorlangan maxsulotlarni</p>
                <SubmitButton
                    onClick = {() => {
                        clearTasdiqlashArray();
                        axios.put(`order/sell-order-detail/${orderId}/`,tasdiqlanganlar)
                        .then( response => {
                            console.log(response.data);
                            clearTasdiqlashArray();
                        })
                        .catch(error => {
                            console.log({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                        });
                    }}
                >
                    Tasdiqlash
                </SubmitButton>
            </BuyurtmaHeader> 
            <div className="row align-items-start" style={{width: "100%", pading: "0", margin: "0"}}>
                
                <div className="col-md-3">
                    <Agent getOrderId={(arg) => {setOrderId(arg)}}/>
                </div>
                
                <div className="col-md-9">
                    <ControlledAccordions _id={orderId} setOrdered={setOrders} setTasdiqlanganlar={(arg)=>{setTasdiqlanganlar(arg)}}/>
                </div>

            </div>
        </div>
    )
}

export default observer(_Buyurtmalar);

const Agent = (props) => {

    const [agents, setAgents] = React.useState([]);
    
    const getAgent = () => {
        axios.get(`/order/get-agents/`)
        .then( response => {
            console.log(response.data);
            setAgents(response.data);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getAgent();    
    },[])

    return (
        <div className="table-responsive">
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Agent</td>
                        <td>Surovlar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        agents.map((elem, index)=>{
                            return (
                                <AgentItem elem={elem} tr={index} getOrderId={(arg) => {props.getOrderId(arg)}}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const AgentItem = (props) => {
    return(
        <tr
            style={{cursor: "pointer"}}
            onClick={(event)=>{
                props.getOrderId(props.elem.id);
            }}
        >
            <td>{props.tr + 1}</td>
            <td>{props.elem.name}</td>
            <td>{props.elem.count}</td>
        </tr>
    )
}
