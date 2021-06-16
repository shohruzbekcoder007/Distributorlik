import React, { useEffect } from 'react'
import {
    LoginInput,
    SubmitButton,
    HeaderSubmitInfo
} from './styles'
import axios from './../../baseUrl'
import { observer } from "mobx-react";
import ReactSelectMulti from './../ReactSelectMulti';
import KeyBoard from './../KeyBoard';
import { setSotibOlishArray, getSotibOlish, clearSotibOlishArray } from './../../globalState';

export default observer(function ProductBuyList(props){

    const [products, setProducts] = React.useState([]);
    const [catigoryIds, setCatigoryIds] = React.useState([]);
    const [catigory, setCatigory] = React.useState([]);
    const [filterProducts, setFilterProducts] = React.useState([]);

    const getBuyProducts = () => {
        axios.get(`product/product-list/`)
        .then((res) => {
            setProducts(res.data.products);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const getBuyCatigory = () => {
        axios.get(`product/category-list/`)
        .then((res) => {
            const ctg = res.data.map((elem) => 
                {
                    return {
                        label : elem.name,
                        value : elem.id
                    }
                }
            )
            setCatigory(ctg);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const getFilterProducts = () => {
        let productsFilter = [];
        products.forEach(element => {
            catigoryIds.forEach(elem => {
                if(elem.value == element.category.id){
                    productsFilter.push(element);
                }
            })
        });
        setFilterProducts(productsFilter);
    }

    React.useEffect(()=>{
        getBuyProducts();
        getBuyCatigory();
        getFilterProducts();
    },[catigoryIds])

    return (
        <>

            <div style={{padding: "0 20px"}}>
                <ReactSelectMulti
                    options={catigory}
                    func={(arg)=>{
                        setCatigoryIds(arg);
                    }}
                    placeholder="Katigoriyalani tanlang"
                />
            </div>

            <SotinOlishniTasdiqlash/>

            <div style={{padding: "0 20px"}}>
                <div className="table-responsive">
                    <table class="table table-striped table-hover text-center  mb-0">
                        <thead>
                            <tr>
                                <td>T/R</td>
                                <td>Yetkazib beruvchi</td>
                                <td>Maxsulot</td>
                                <td>Hajmi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterProducts.map((elem, item) => {
                                    return (
                                        <ProductBuyItemNew key={elem.id} tr={item+1} product={elem}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>        
    )
})

const ProductBuyItemNew = (props) => {

    const [inputValue, setInputValue] = React.useState("");
    const [keybord,setKeybord] = React.useState(0);

    return (
        <>
            <tr>
                <td>{props.tr}</td>
                <td>{props.product.provider.name}</td>
                <td>{props.product.name}</td>
                <td>
                    <div style={{position: "relative"}}>
                        <LoginInput
                            // placeholder="Nechta yashik"
                            value={inputValue}
                            onFocus={() => {setKeybord(1)}}
                        />
                        {
                            
                            (keybord == 1)?
                            <KeyBoard
                                setInputQiymati={
                                    (arg)=>{
                                        setInputValue(arg);
                                        setSotibOlishArray(props.product.id,arg);
                                        console.log(props.product.id,arg);
                                        console.log(getSotibOlish())
                                }}
                                closeKeyboard={()=>{setKeybord(0)}}
                            />:
                            <></>
                        }
                    </div>
                </td>
            </tr>
        </>
    )
}

const SotinOlishniTasdiqlash = observer(() => {
    return (
        <div style={{padding: "0 20px", marginTop: "20px"}}>
            <HeaderSubmitInfo>
                {/* <div></div> */}
                <p style={{color: "#fff"}}>Jami {getSotibOlish().length} ta maxsulot</p>
                <SubmitButton
                    onClick={() => {
                        axios.post(`order/buy-order-list/`, getSotibOlish() )
                        .then( response => {
                            console.log(response.data);
                            if(response.data.price){
                                alert(response.data.price);
                            } else {
                                alert("malumotlar tugri kiritildi");
                            }
                        })
                        .catch(error => {
                            console.log({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                            alert("malumotlar tugri kiritilmagan");
                        });
                        clearSotibOlishArray()
                    }}
                >
                    Sotib olish
                </SubmitButton>
            </HeaderSubmitInfo>
        </div>
    )
})