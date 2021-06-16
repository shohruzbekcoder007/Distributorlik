import React from 'react'
import { observer } from "mobx-react";
import { globalState } from "./../../globalState";
import {
    ListUl,
    ItemLi,
    Message,
    MessageText,
    EditDeleteSave,
    CatigorySave,
    CatigoryEdit,
    CatigoryDelete,
    CatigoryClose,
    LoginInput,
    ListWrapper,
} from "./styles"
import axios from './../../baseUrl'
import { getToken } from './../../globalState'
import ReactSelect from '../ReactSelect'
import Title from '../Title'
import TasdiqlashOynasi from './../TasdiqlashOynasi'
import PaginationOutline from './../PaginationOutline'

const _QaytganMaxsulotlar = () => {

    const [maxsulotlar, setMaxsulotlar] = React.useState([]);

    //pagination uchun
    const [offset, setOffset] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const limit = 5;

    const getQaytganMaxsulotlar = () => {
        axios.get(`order/client-failed-product-list/?limit=${limit}&offset=${(offset-1)*limit}`,{
            params: {
                // term: term
                term: globalState.search
            }
        }, {
            // headers: {
            //     'Authorization': `token ${getToken()}`
            // }
        })
        .then((res) => {
            setMaxsulotlar(res.data.failed_product_list);
            setCount(Math.floor(res.data.count/limit) + 1);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // React.useEffect(() => {
    //     getQaytganMaxsulotlar();
    // },[offset,globalState.search]);

    React.useEffect(() => {
        getQaytganMaxsulotlar();
        // console.log("salom")
    },[globalState.search]);
    let tartibRaqami = 0;

    return (
        <>
            <Title padding="" text="Taminotchilarga qaytarilgan maxsulotlar"/>
            <div style={{padding: "0 20px"}}>
                <div className="table-responsive">
                    <table class="table table-striped table-hover text-center  mb-0">
                        <thead>
                            <tr>
                                <td>T/R</td>
                                <td>Nomi</td>
                                <td>Turi</td>
                                <td>Qayerdan</td>
                                <td>Miqdori</td>
                                <td>O'zgartirish</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                maxsulotlar.map(elem => {
                                    tartibRaqami++;
                                    return <ListItemOne key={elem.id} qaytarilgan = {elem} tartibRaqami={tartibRaqami}/>
                                })
                            }
                        </tbody>
                    </table>
                    <div>
                        <PaginationOutline count={count} setPage={arg => {
                            setOffset(arg);
                        }}/>
                    </div>
                </div>
            </div>
        </>
    )
}



const ListItemOne = (props) => {

    const [one, setOne] = React.useState(true);
    const [qaytgan, setQaytgan] = React.useState(props.qaytarilgan);
    const [tartibRaqami, settartibRaqami] = React.useState(props.tartibRaqami);
    const [bormi, setBormi] = React.useState(true);
    const [sellOrder, setSellOrder] = React.useState(props.qaytarilgan.sell_order)
    const [tasdiq, setTasdiq] = React.useState(false);

    let miqdori = qaytgan.returned_quantity;
    let turi = qaytgan.failed_status;

    
    const updateProduct = (_id) => {
        axios.put(`order/client-failed-product-detail/${_id}/`,{
            sell_order: qaytgan.sell_order.id,
            failed_status: turi,
            returned_quantity: parseFloat(miqdori) 
        },{
            // headers: {
            //   'Authorization': `Basic ${getToken()}` 
            // }
        })
        .then( response => {
            setQaytgan(response.data);
            setOne(true);
            alert("O'zgarishlar saqlandi!")
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            // setProgres(false);
        });
    }

    const deleteProduct = (_id) => {
        axios.delete(`order/client-failed-product-detail/${_id}`).then((res)=>{
            if(res.status == 204){
                setBormi(false);
                alert("Maxsulot o'chirildi!")
            }
        }).catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    
    if(bormi)
    return(
        <tr>
            <td>
                {tartibRaqami}
            </td>
            <td>
                <>
                    {sellOrder.product.name}
                </>
            </td>
            <td>
                {
                    one?
                    <>
                        {qaytgan.failed_status=="valid"?"yaroqli":"yaroqsiz"}
                    </>:
                    <ReactSelect options={[
                                {value: "valid",label: "yaroqli"},
                                {value: "invalid",label: "yaroqsiz"}
                            ]} 
                            placeholder={(qaytgan.failed_status == "valid")?"yaroqli":"yaroqsiz"}
                            func={(arg)=>{turi = arg;}}
                            
                    />
                }
            </td>
            <td>
                <>
                    {sellOrder.client.name}
                </>
            </td>
            <td>
                {
                    one?
                    <>{qaytgan.returned_quantity}</>:
                    <LoginInput
                        defaultValue={miqdori}
                        onChange={(event)=>{miqdori=event.target.value}}
                    />
                }
            </td>
            <td>
                <EditDeleteSave>
                    {
                        one?
                        <>
                            <CatigoryEdit onClick={
                                    ()=>{
                                        setOne(false)
                                    }
                                }
                            >
                                <i className="fas fa-edit"></i>
                            </CatigoryEdit>
                            <CatigoryDelete onClick={()=>{
                                setTasdiq(true);
                            }}>
                                <i className="fas fa-trash-alt"></i>
                            </CatigoryDelete>
                            {
                                tasdiq?
                                <TasdiqlashOynasi
                                    text="O'chirilgan malumotlar qayta tiklanmaydi. O'chirishni tasdiqlaysizmi?"
                                    closeFunc={() => {
                                        setTasdiq(false);
                                    }}
                                    submitFunc={() => {
                                        setTasdiq(false);
                                        deleteProduct(qaytgan.id);
                                    }}
                                    buttunBirText="Tasdiqlamayman"
                                    buttunIkkiText="Tasdiqlayman"
                                />:<></>
                            }
                        </>:
                        <>
                            <CatigorySave onClick={()=>{
                                updateProduct(qaytgan.id)
                            }}>
                                <i className="fas fa-save"></i>
                            </CatigorySave>
                            <CatigoryClose onClick={()=>{setOne(true)}}>
                                <i className="fas fa-times"></i>
                            </CatigoryClose>
                        </>
                    }
                </EditDeleteSave>
            </td>
        </tr>
    )
    else return <></>
                
}

export default observer(_QaytganMaxsulotlar);