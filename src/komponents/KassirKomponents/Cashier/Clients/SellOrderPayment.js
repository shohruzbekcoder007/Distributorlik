import React, { useState } from 'react';

const SellOrders = ({ sellOrders, paymentOrderAction, pgFunc, count}) => {
    const [localSellOrders, setLocalSellOrders] = useState(sellOrders);
    const [query, setQuery] = useState();
    const [windowDisplay, setWindowDisplay] = useState('none')
    const [sellOrderPayment, setSellOrderPayment] = useState({
        payment_type: '',
        payment: ''
    })
    const [clientNameFullInfo, setClientNameFullInfo] = useState({
        sellOrderId: '',
        clientFName: '',
        clientDebt: ''
    });

    const filterByDebtClients = (debt) =>{
        let elements = sellOrders;
        console.log(elements);
        if (debt === 'debt')
            elements = elements.filter((element) =>  element.debt > 0);
        if (debt === 'notDebt')
            elements = elements.filter((element) =>  element.debt == 0);

        setLocalSellOrders(elements);
        renderTable();
    }

    const filterByDeliveredOrders = (order) => {
        let elements = sellOrders;

        if (order === 'delivered')
            elements = elements.filter((element) => element.status === 'ordered');
        if (order === 'ordered')
            elements = elements.filter((element) => element.status === 'delivered');

        setLocalSellOrders(elements);
        renderTable();
    }

    const filterByClientName = (searchValue) => {
        setQuery(searchValue);
        const elements = sellOrders;
        const results = elements.filter(
                (element) => element.client.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            )
        setLocalSellOrders(results);
        renderTable();
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setSellOrderPayment({...sellOrderPayment, [name]: value});
    }

    const showOrderPaymentDiv = (sellOrderId, clientName, debt) => {
        setSellOrderPayment(() => {
            return (
                {
                    payment_type: '',
                    payment: ''
                }
            )
        })

        setClientNameFullInfo(() => {
            return ({
                clientFName: clientName,
                sellOrderId: sellOrderId,
                clientDebt: debt
            })
        });

        setWindowDisplay('flex');
        renderTable();
    }

    const paymentOrderActionLocal = () => {
        paymentOrderAction(sellOrderPayment, clientNameFullInfo)
        renderTable();
    }

    function  renderTable() {
        return (
            <div className="form-style">
                    <div className='row' style={{display:'flex', flexDirection:'row', padding:'20px'}}>
                        <div className="col-md-6">
                            <div style={{textAlign:'center'}}>
                                <label htmlFor='debts'>Qarzdorlik</label>
                            </div>
                            <select className='form-control' style={{borderRadius: '100px'}}
                                onChange={(e) => filterByDebtClients(e.target.value)} id='debts'>
                                <option value='allOrders'>Barchasi</option>
                                <option value='notDebt'>Qarzdor bo'lmaganlar</option>
                                <option value='debt'>Qarzdorlar</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div style={{textAlign:'center'}}>
                                    <label htmlFor='orders'>Buyurtmalar</label>
                            </div>
                            <select className='form-control' style={{borderRadius: '100px'}}
                                onChange={(e) => filterByDeliveredOrders(e.target.value)}
                                id='orders'>
                                <option value='allOrders'>Barchasi</option>
                                <option value='ordered'>Buyurtma berilganlar</option>
                                <option value='delivered'>Yetkazilganlar </option>
                            </select>
                        </div>
                    </div>

                    <div className ='oynacha' style={{display:`${windowDisplay}`}}>
                        <div className='card' style={{display:'block'}}>
                            <div className='card-header'>
                                <h4 style={{textAlign:'center', color:"black"}}> To'lov oynasi <br/></h4>
                                    <h6 style={{textAlign:'center'}}>
                                        <span style={{fontWeight:'bolder', color:"black"}}> {clientNameFullInfo.clientFName} </span>
                                        <span style={{color:'red'}}>{clientNameFullInfo.clientDebt} so'm</span> qarz
                                    </h6>
                            </div>
                                <div className='card-body'>
                                    <form className='form'>
                                        <div className='form-group'>
                                            <label htmlFor='payment' style={{color:"black"}}>To'lov turi</label>
                                            <select className='form-control' name='payment_type' onChange={handleChange}>
                                                <option value='none'></option>
                                                <option value='cash'>Naqt pul</option>
                                                <option value='credit_card'>Plastik karta</option>
                                                <option value='money_transfer'>Pul o'tkazma</option>
                                            </select>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='payment' style={{color:"black"}}>Pul miqdori</label>
                                            <input
                                                className='form-control'
                                                type='number'
                                                name='payment'
                                                value={sellOrderPayment.payment}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>
                            <div className='card-footer'>
                                <button className='btn btn-success' style={{marginRight:'15px'}}
                                onClick={() => paymentOrderActionLocal()}>To'lov qilish</button>
                                <button className='btn btn-danger' onClick={() => {setWindowDisplay('none')}}>Yopish</button>
                            </div>
                        </div>
                    </div>

                {/* </div> */}
                <div style={{width:'100%', overflow:'scroll'}}>
                    <div className="sellPayment-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">T/R</th>
                                    <th scope="col">Klient Nomi</th>
                                    <th scope="col">Manzili</th>
                                    <th scope="col">Masul Shaxs</th>
                                    <th scope="col">Telefon raqami1</th>
                                    <th scope="col">Telefon raqami2</th>
                                    <th scope="col">Bank kodi</th>
                                    <th scope="col">Bank</th>
                                    <th scope="col">Akkount raqami</th>
                                    <th scope="col">INN</th>
                                    <th scope="col">Agent Nomi</th>
                                    <th scope="col">Maxsulot Nomi</th>
                                    <th scope="col">Kategoriya</th>
                                    <th scope="col">Taminotchi</th>
                                    <th scope="col">Og'irligi</th>
                                    <th scope="col">Narxi</th>
                                    <th scope="col">Qarzi</th>
                                    <th scope="col">Qarz muhiti</th>
                                    <th scope="col">Holati</th>
                                    <th scope="col">Yaratilgan kun</th>
                                    <th scope="col">Jarayon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    localSellOrders.map(({
                                        id,
                                        orderId,
                                        quantity,
                                        price,
                                        debt,
                                        deadline,
                                        created_date,
                                        status,
                                        client:{name:clientName},
                                        client:{address},
                                        client:{phone_number1},
                                        client:{phone_number2},
                                        client:{account_number},
                                        client:{bank},
                                        client:{bank_code},
                                        client:{INN},
                                        client:{responsible_agent},
                                        client:{sale_agent:{first_name}},
                                        client:{sale_agent:{last_name}},
                                        product:{name:productName},
                                        product:{category:{name:categoryName}},
                                        product:{provider:{name:providerName}}
                                    }) => {
                                        created_date = created_date.slice(0, 10);
                                        return (
                                        <>
                                            <tr key={id}>
                                                <th scope="row">{orderId}</th>
                                                <td>{clientName}</td>
                                                <td>{address}</td>
                                                <td>{responsible_agent}</td>
                                                <td>{phone_number1}</td>
                                                <td>{phone_number2}</td>
                                                <td>{bank_code}</td>
                                                <td>{bank}</td>
                                                <td>{account_number}</td>
                                                <td>{INN}</td>
                                                <td>{first_name + " " +last_name}</td>
                                                <td>{productName}</td>
                                                <td>{categoryName}</td>
                                                <td>{providerName}</td>
                                                <td>{quantity}</td>
                                                <td>{price}</td>
                                                <td><span className="debt">{debt}</span></td>
                                                <td>{deadline?deadline.slice(0, 10):<p>Muhlat belgilanmagan</p>}</td>
                                                <td>
                                                    {
                                                        status === 'delivered'?<span className="ordered">Buyurtma berilgan</span>:
                                                            <span className="delivered">Yetkazilgan</span>
                                                    }
                                                </td>
                                                <td>{created_date}</td>
                                                <td>
                                                    <button className="btn btn-info" 
                                                        onClick={() => showOrderPaymentDiv(id, clientName, debt)}>
                                                            To'lov qilish
                                                    </button>
                                                </td>
                                            </tr>
                                    </>
                                    )})
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )
    }

    return (
        <>
            {renderTable()}
        </>
    )
}

export default SellOrders