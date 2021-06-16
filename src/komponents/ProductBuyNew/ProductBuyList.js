import React, { useEffect } from 'react'
import {
    CatigoryEdit,
    CatigoryDelete,
    CatigorySave,
    CatigoryClose,
    LoginInput,
    Message,
    Qaytarish,
    Oynacha,
    LoginContainer,
    LoginTitle,
    SubmitWrapper,
    SubmitButton,
} from './styles'
import axios from '../../baseUrl'
import { getToken } from '../../globalState'
import DataPicker from "../DataPicker"
import ProgresBar from "../ProgresBar"
import PaginationOutline from "../PaginationOutline"
import ReactSelect from "../ReactSelect"
import TasdiqlashOynasi from '../TasdiqlashOynasi';

export default function ProductBuyList(props){
    let tartibRaqami = 0;
    return (
        <>
            <div style={{padding: "0 20px"}}>
                <div className="table-responsive">
                    <table class="table table-striped table-hover text-center  mb-0">
                        <thead>
                            <tr>
                                <td>T/R</td>
                                <td>Maxsulot</td>
                                <td>Hajmi</td>
                                <td>Tasdiqlash</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (props.products.length>0)?
                                    props.products.map((elem)=>{
                                        tartibRaqami++;
                                        return <ProductBuyItem key={elem.id} buyProduct={elem} tartibRaqami={tartibRaqami}/>
                                    }):
                                <></>
                            }
                        </tbody>
                    </table>
                    <PaginationOutline count={props.count} setPage={arg => props.pgFunc(arg)}/>
                </div>
            </div>
            </>        
    )
}

const ProductBuyItem = (props) => {

    const [one, setOne] = React.useState(true);
    const [oneBuyProduct, setOneBuyProduct] = React.useState(props.buyProduct);
    const [tartibRaqami, setTartibRaqami] = React.useState(props.tartibRaqami);
    const [selectProducts, setSelectProducts] = React.useState([]);
    const [bor, setBor] = React.useState(true)
    let price = "";
    let quantity = "";
    let product = "";

    const [oynacha, setOynacha] = React.useState("none");
    const [tasdiq, setTasdiq] = React.useState(false);
    const [vaqt, setVaqt] = React.useState(oneBuyProduct.deadline)

    let qaytishTuri = "";
    let qachaQaytgan = "";

    const createQaytganMaxsulot = (_id) => {
        axios.post(`order/provider-failed-product-list/`,{
            buy_order: _id,
            failed_status: qaytishTuri,
            returned_quantity: qachaQaytgan
        },{
            // headers: {
            //   'Authorization': `Basic ${getToken()}` 
            // }
        })
        .then( response => {
            alert("Maxsulot qaytarildi!");
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    const getProducts = () => {
        axios.get('product/product-list/', {
            // headers: {
            //     'Authorization': `token ${getToken()}`
            // }
        })
        .then((res) => {
            const prs = res.data.products.map(elem=>{
                return {
                    label: elem.name,
                    value: elem.id
                }
            });
            setSelectProducts(prs);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const updateProduct = (_id) => {
        axios.put(`order/buy-order-detail/${_id}/`,{
            "quantity": quantity,
            "product": product,
        },{
            // headers: {
            //   'Authorization': `Basic ${getToken()}` 
            // }
        })
        .then( response => {
            setOneBuyProduct(response.data);
            setOne(true);
            alert("O'zgarishlar saqlandi!")
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    const deleteProduct = (_id) => {
        axios.delete(`order/buy-order-detail/${_id}/`,{
            // headers: {
            //   'Authorization': `Basic ${getToken()}` 
            // }
        })
        .then( response => {
            if(response.status == 204){
                setBor(false);
            }
            alert("Maxsulot o'chirildi");
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(()=>{
        getProducts();
    },[])

    if(oneBuyProduct!=undefined){
        if(bor){
            return (
                <>
                <tr>
                    <td>{tartibRaqami}</td>
                    <td>
                        {
                            one?
                            <>{oneBuyProduct.product.name}</>
                            :
                            <ReactSelect
                                options={selectProducts}
                                func={(arg)=>{product = arg}}
                                placeholder="Maxsulot"
                            />
                        }
                    </td>
                    <td>
                        {
                            one?
                            <>{oneBuyProduct.quantity}</>
                            :
                            <LoginInput
                                placeholder="Hajmi"
                                defaultValue={oneBuyProduct.quantity}
                                onChange = {(event) => {quantity = event.target.value}}
                            />
                        }
                    </td>
                    <td>
                        <Message style={{border: "none", width: "100%"}}>
                        {
                            one?
                            <>
                                <CatigoryEdit onClick={()=>{setOne(false)}}>
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
                                            deleteProduct(oneBuyProduct.id);
                                        }}
                                        buttunBirText="Tasdiqlamayman"
                                        buttunIkkiText="Tasdiqlayman"
                                    />:<></>
                                }
                            </>:
                            <>
                                <CatigorySave onClick={()=>{
                                    updateProduct(oneBuyProduct.id);
                                }}>
                                    <i className="fas fa-save"></i>
                                </CatigorySave>
                                <CatigoryClose onClick={()=>{setOne(true)}}>
                                    <i className="fas fa-times"></i>
                                </CatigoryClose>
                            </>
                        }
                        <Qaytarish style={{marginLeft: "5px"}} onClick={()=>{setOynacha("flex")}}>Qaytarish</Qaytarish>
                        </Message>
                    </td>
                </tr>
                <Oynacha style={{display: oynacha}}>
                    <LoginContainer style={{width: "300px"}}>
                        <LoginTitle style={{color: "#000", paddingBottom: "5px"}}>Qaytarilgan maxsulot</LoginTitle>
                        <ReactSelect options={[
                                {value: "valid",label: "yaroqli"},
                                {value: "invalid",label: "yaroqsiz"}
                            ]} 
                            placeholder="Qanday qaytarildi"
                            func={(arg)=>{qaytishTuri = arg;}}
                            
                        />
                        <LoginInput onChange={(event) => {qachaQaytgan = event.target.value}} placeholder="miqdori"/>
                        <SubmitWrapper>
                            <SubmitButton style={{backgroundColor: "#ee0808"}} onClick={() => {setOynacha("none")}}>Chiqish</SubmitButton>
                            <SubmitButton onClick={() => {setOynacha("none"); createQaytganMaxsulot(oneBuyProduct.id)}}>Tasdiqlash</SubmitButton>
                        </SubmitWrapper>
                    </LoginContainer>
                </Oynacha>
                </>
            )
    }else{
            return <></>
        }
    }else{
        return <ProgresBar/>
    }
}