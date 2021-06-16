import { useEffect, useState } from 'react'
import axios from '../../../../baseUrl'
import Loading from '../Loading'
import SellOrders from './SellOrderPayment'
import { observer } from "mobx-react";
import { globalState } from "./../../../../globalState";

const _DebtClients = () => {
    const [debtClients, setDebtClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);
    const [count, setCount] = useState(1);
    const limit = 5;

    const fetchClients = async () => {
        setLoading(true);

        try {
            
            await axios.get(`/order/sell-order-list/?limit=${limit}&offset=${(offset-1)*limit}`,{
                params: {
                    // term: term
                    term: globalState.search
                }
            }).then(response=>{
                let results = response.data[['sell_order_list']];
                for (let i = 0; i < results.length; i++){
                    results[i]['orderId'] = i + 1
                }
                console.log(results);
                setLoading(false);
                setDebtClients([]);
                setDebtClients(results)
                renderTable();
                setCount(Math.floor(response.data.count/limit) + 1);

            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchClients();
    }, [offset,globalState.search]);
    
    const paymentOrderAction = (sellOrderPayment, clientNameFullInfo) =>{
        let {payment_type, payment } = sellOrderPayment;
        const {sellOrderId} = clientNameFullInfo;
        payment = parseFloat(payment);

        if (payment_type !== 'none' && payment){
            axios.post(`/order/sell-order-payment/`, 
                [
                    {
                        "payment_type":  payment_type,
                        "payment": payment,
                        "sell_order": sellOrderId
                    }
                ]
            ,{
            }).then (response =>{
                  fetchClients();
                  renderTable();
                  alert("Malumotlar saqlandi")
                }).catch(error=>{
                    console.log( {errorMessage: error.toString() });
                })
        }
    }

    function renderTable(){
        if (loading) {
            return (
                <main>
                    <Loading />
                </main> 
            );
        }
            return (
                <div >
                    <SellOrders
                        sellOrders={debtClients}
                        fetchClients={fetchClients}
                        paymentOrderAction={paymentOrderAction}
                        pgFunc={(arg)=>{
                            setOffset(arg);
                            fetchClients();
                        }}
                        count = { count }
                    />
                </div>
            )
        }
    return (
        <>
            {renderTable()}
        </>
    )
    
}

// export default _DebtClients
export default observer(_DebtClients); 