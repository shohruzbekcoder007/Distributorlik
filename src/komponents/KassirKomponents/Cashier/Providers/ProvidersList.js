import { useEffect, useState } from 'react'
import axios from '../../../../baseUrl'
import Loading from '../Loading'
import SellOrders from './BuyOrderPayment'
import { observer } from "mobx-react";
import { globalState } from "./../../../../globalState";

function _DebtClients() {
    const [debtClients, setDebtClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        setLoading(true);

        try {
            
            await axios.get('/order/buy-order-list/',{
                params: {
                    // term: term
                    term: globalState.search
                }
            }).then(response=>{
                let results = response.data;
                for (let i = 0; i < results['buy_order_list'].length; i++){
                    results['buy_order_list'][i]['orderId'] = i + 1
                }
                results = results['buy_order_list'];
                setLoading(false);
                setDebtClients([]);
                setDebtClients(results)
                renderTable();
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchClients();
    }, [globalState.search]);
    
    const paymentOrderAction = (sellOrderPayment, clientNameFullInfo) =>{
        let {payment_type, payment } = sellOrderPayment;
        const {sellOrderId} = clientNameFullInfo;
        payment = parseFloat(payment);

        if (payment_type !== 'none' && payment){
            axios.post(`/order/buy-order-payment/`, 
                [
                    {
                        "payment_type":  payment_type,
                        "payment": payment,
                        "buy_order": sellOrderId
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
        if (loading || debtClients.length === 0) {
            return (
                <main>
                    <Loading />
                </main> 
            );
        }
            return (
                <div >
                    <SellOrders providers={debtClients} fetchClients={fetchClients} paymentOrderAction={paymentOrderAction}/>
                </div>
            )
        }
    return (
        <>
            {renderTable()}
        </>
    )
    
}

export default observer(_DebtClients);
// export default _DebtClients