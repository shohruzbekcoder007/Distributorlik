import React from 'react'
import KeyBoard from '../KeyBoard';
import axios from './../../baseUrl'
import { BuyurtmaHeader, LoginInput, SubmitButton } from './styles'
import { setTasdiqlashArray, getTasdiqlashArray, getOneTasdiqlashMiqdori, clearTasdiqlashArray } from './../../globalState';

export default function Buyurtmalar() {

    const [orderId, setOrderId] = React.useState(0);
    const [orders, setOrders] = React.useState([]);

    return (
        <div>
            <div className="row align-items-start" style={{width: "100%", pading: "0", margin: "0"}}>
                
                <div className="col-md-3">
                    <Agent getOrderId={(arg) => {setOrderId(arg)}}/>
                </div>
                
                <div className="col-md-6">
                    <BuyurtmaHeader>
                        <p>Tayyorlangan maxsulotlarni</p>
                        <SubmitButton
                            onClick = {() => {
                                clearTasdiqlashArray();
                                axios.put(`order/sell-order-detail/${orderId}/`,getTasdiqlashArray())
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
                    {/* <Agent/> */}
                    <OrderList orders={orders}/>
                </div>
                
                <div className="col-md-3">
                    <Client _id={orderId} setOrdered={setOrders}/>
                </div>

            </div>
        </div>
    )
}

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

const Client = (props) => {

    const [clients, setClients] = React.useState([]);
    
    const getClient = () => {
        axios.get(`/order/get-order/${props._id}`)
        .then( response => {
            console.log(response.data,"<-----");
            setClients(response.data);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getClient();
        console.log(props._id)   
    },[props._id])


    return (
        <div className="table-responsive">
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Mijoz</td>
                        <td>Surovlar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.map((elem, index)=>{
                            return (
                                <ClientItem elem={elem} tr={index} setOrdered={props.setOrdered}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const ClientItem = (props) => {
    return(
        <tr
            style={{cursor: "pointer"}}
            onClick = {()=>{
                console.log(props.elem.sell_orders);
                props.setOrdered(props.elem.sell_orders);
                // console.log(props.elem)
            }}
        >
            <td>{props.tr + 1}</td>
            <td>{props.elem.name}</td>
            <td>{props.elem.count}</td>
        </tr>
    )
}

const OrderList = (props) => {

    return (
        <div className="table-responsive">
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Nomi</td>
                        <td>Suralgan miqdori</td>
                        <td>Berilgan miqdori</td>
                        <td>Narxi</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.orders.map((elem, index)=>{
                            return (
                                <OrderListItem elem={elem} tr={index} getOrderId={(arg) => {props.getOrderId(arg)}}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

const OrderListItem = (props) => {
    const [narx,setNarx] = React.useState(0);
    const [inputValue, setInputValue] = React.useState(0);
    const [keybord, setKeybord] = React.useState(0);
    React.useState(()=>{setInputValue(0);console.log("salom")},[props.elem]);
    return (
        <tr>
            <td>{props.tr + 1}</td>
            <td>{props.elem.product.name}</td>
            <td>{props.elem.product.name}</td>
            <td>
                <div style={{position: "relative"}}>
                    <LoginInput
                        onFocus={(event)=>{setKeybord(1)}}
                        value={inputValue}
                    />
                    {
                        (keybord == 1)?
                        <KeyBoard
                            setInputQiymati={
                                (arg)=>{
                                    setNarx((+arg)*props.elem.price.price);
                                    setInputValue(arg);
                                    let elemId = props.elem.id;
                                    let productId = props.elem.product.id;
                                    let clientId = props.elem.client.id;
                                    let narx = props.elem.price.id;
                                    let quantity = props.elem.quantity;
                                    let _given_quantity = arg;
                                    setTasdiqlashArray(elemId,productId,clientId,narx,quantity,_given_quantity);
                                    console.log(getTasdiqlashArray());
                                }}
                            closeKeyboard={()=>{setKeybord(0)}}
                        />:
                        <></>
                    }
                </div>
            </td>
            <td>{narx}</td>
        </tr>
    )
}













const KlinetZakaz = (props) => {
    return(
        <div className="table-responsive">
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>Mijoz</td>
                        <td>Maxsulot</td>
                        <td>Hajmi(So'ralgan)</td>
                        <td>Narxi</td>
                        <td>Hajmi(Taklif)</td>
                        <td>Umumiy narxi</td>
                    </tr>
                </thead>
                <tbody>
                    <KlinetZakazItem surovId={props.surovId} quantity={props.quantity}/>
                </tbody>
            </table>
        </div>
    )
}

const KlinetZakazItem = (props) => {

    const [surov, setSurov] = React.useState(props.surovId);
    const [surovElem, setSurovElem] = React.useState(null);
    const [valueInput, setValueInput] = React.useState(props.quantity);
    const [valueInputDefault, setValueInputDefault] = React.useState("");

    React.useEffect(() => {
        console.log(props.quantity,"quantity props")
        axios.put(`order/sell-order-detail/{id}/`)
        .then( response => {
            console.log(response.data);
            setSurovElem(response.data);
            setSurov(setSurov(response.data.id));
            // if(surovElem != null){
            //     setValueInputDefault(getOneTasdiqlashMiqdori(surovElem.id));
            //     setValueInput(getOneTasdiqlashMiqdori(surovElem.id));
            // }else{
            //     setValueInputDefault(0)
            // }
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    },[props.surovId]);

    React.useEffect(() => {
        if(surovElem != null){
            setValueInputDefault(getOneTasdiqlashMiqdori(surovElem.id));
            setValueInput(getOneTasdiqlashMiqdori(surovElem.id));
        }
    },[props.quantity])
    

    if(surovElem == null){
        return <></>
    }else{
        return (
            <tr>
                <td>{surovElem.client.name}</td>
                <td>{surovElem.product.name}</td>
                <td>{surovElem.quantity}</td>
                <td>{surovElem.price.price}</td>
                <td>
                    <LoginInput
                        type="number"
                        defaultValue={props.quantity}
                        value={valueInput}
                        onChange={(event) => {
                            setValueInput(event.target.value);
                            let elemId = surovElem.id;
                            let productId = surovElem.product.id;
                            let clientId = surovElem.client.id;
                            let narx = surovElem.price.id;
                            let quantity = surovElem.quantity;
                            let _given_quantity = event.target.value;
                            setTasdiqlashArray(elemId,productId,clientId,narx,quantity,_given_quantity);
                            console.log(getTasdiqlashArray());
                        }}
                    />
                </td>
                <td>{surovElem.price.price * valueInput}</td>
            </tr>
        )
    }
    
}