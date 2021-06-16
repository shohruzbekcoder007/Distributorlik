import React from 'react'
import QulvolaSelect from '../QulvolaSelect';
import axios from './../../baseUrl'
import { BuyurtmaHeader, LoginInput, SubmitButton } from './styles'
import { setTasdiqlashArray, getTasdiqlashArray, getOneTasdiqlashMiqdori } from './../../globalState';

export default function Buyurtmalar() {

    const [activeItem, setActiveItem] = React.useState(0);
    const [ordered, setOrdered] = React.useState([]);
    const [count, setCount] = React.useState(1);
    const [surovId, setSurovId] = React.useState(0);
    const [surovQuantitiy, setSurovQuantitiy] = React.useState(0);

    const getSellOrder = () => {
        axios.get(`/order/sell-order-list/?offset=0&limit=${count*10}`)
        .then( response => {
            console.log(response.data.sell_order_list);
            setCount(response.data.count);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    const getSellOrderTwo = () => {
        axios.get(`/order/sell-order-list/?offset=0&limit=${count}`)
        .then( response => {
            let order = [];
            response.data.sell_order_list.forEach((elem, index) => {
                if(elem.status === "ordered"){
                    order.push(elem);
                }
            })
            setOrdered(order);
            setSurovId(0);
            console.log(ordered,"<---ordered");
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getSellOrder();
    },[]);

    React.useEffect(() => {
        getSellOrderTwo();
    },[count]);

    return (
        <div>
            <BuyurtmaHeader>
                Buyurtmalar React
                <SubmitButton
                    onClick = {() => {
                        console.log("salom");
                        axios.post(`/order/sell-order-list/`, getTasdiqlashArray() )
                            .then( response => {
                                console.log(response.data);
                                alert("malumotlar tugri kiritildi");
                            })
                            .catch(error => {
                                console.log({ errorMessage: error.toString() });
                                console.error('There was an error!', error);
                                alert("malumotlar tugri kiritilmagan");
                            })
                    }}
                >
                    Tasdiqlash
                </SubmitButton>
            </BuyurtmaHeader>
            
            <div className="row" style={{width: "100%", pading: "0", margin: "0"}}>
                <div className="col-md-3">
                    <Klient
                        clients={ordered}
                        uzgartirSurov={
                            (arg1,arg2) => {setSurovId(arg1); setSurovQuantitiy(getOneTasdiqlashMiqdori(arg1))
                        }}
                    />
                </div>
                <div className="col-md-9">
                    <KlinetZakaz surovId={surovId} quantity={surovQuantitiy}/>
                </div>
            </div>
        </div>
    )
}

const Klient = (props) => {

    return (
        <div className="table-responsive">
            <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Mijoz</td>
                        <td>Maxsulot</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.clients.map((elem, index)=>{
                            return <KlientItem
                                        elemId={elem.id}
                                        uzgartirSurov={props.uzgartirSurov}
                                        tr={index}
                                        clientName={elem.client.name}
                                        productName={elem.client.name}
                                        productQuantitiy={elem.quantity}
                                    />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const KlientItem = (props) => {
    const [active, setActive] = React.useState(false);
    return(
        <tr 
            style={active?{cursor: "pointer", backgroundColor: "#1a1717b5"}:{cursor: "pointer"}}
            onClick={(event) => {
                props.uzgartirSurov(props.elemId,props.productQuantitiy);
            }}
        >
            <td>{props.tr + 1}</td>
            <td>{props.clientName}</td>
            <td>{props.productName}</td>
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
        axios.get(`/order/sell-order-detail/${props.surovId}`)
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