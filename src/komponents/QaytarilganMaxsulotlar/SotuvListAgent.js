import React, { useEffect } from 'react'
import { LoginInput, HeaderSubmitInfo, SubmitButton } from './styles'
import axios from './../../baseUrl'
import ReactSelectMulti from './../ReactSelectMulti';
import ReactSelect from './../ReactSelect';
import KeyBoard from './../KeyBoard'
import { setMalochniArray, getMalochniProducts, clearMalochniArray, oneQuantityMalochni, globalState, getSumMalochniArray, setClientForBuyProduct } from './../../globalState'
import { observer } from "mobx-react";

function _SotuvListAgent(props){

    const [products, setProducts] = React.useState([]);
    const [catigoryIds, setCatigoryIds] = React.useState([]);
    const [catigory, setCatigory] = React.useState([]);
    const [filterProducts, setFilterProducts] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [clientsId, setClientsId] = React.useState(0);

    const getClients = () => {
        axios.get(`user/agent-list/`)
        .then((res) => {
            const ctg = res.data.map((elem) => 
                {
                    return {
                        label : elem.first_name + " " + elem.last_name,
                        value : elem.id
                    }
                }
            )
            setClients(ctg);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getBuyProducts = () => {
        axios.get(`product/product-list/`)
        .then((res) => {
            setProducts(res.data.products);
        })
        .catch((error) => {
            console.error(error);
        });
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
        getClients();
    },[catigoryIds]);

    return (
        <>

            <div style={{padding: "0 20px", marginBottom: "15px"}}>
                <ReactSelectMulti
                    options={catigory}
                    func={(arg)=>{
                        setCatigoryIds(arg);
                    }}
                    placeholder="Katigoriyalani tanlang"
                />
            </div>

            <div style={{padding: "0 20px", marginTop: "20px"}}>
                <ReactSelect
                    placeholder="Agentni tanlang"
                    options={clients}
                    func={(arg) => {
                        console.log(arg);
                        setClientsId(arg);
                    }}
                />
            </div>

            <BaySotuvListSubmit/>

            <div style={{padding: "0 20px"}}>
                <div className="table-responsive">
                    <table class="table table-striped table-hover text-center  mb-0">
                        <thead>
                            <tr>
                                <td>T/R</td>
                                <td>Maxsulot</td>
                                <td>Hajmi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterProducts.map((elem, item) => {
                                    return (
                                        <ProductBuyItemNew key={elem.id} tr={item+1} product={elem} clientId={clientsId}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>        
    )
}

const ProductBuyItemNew = observer((props) => {

    const [inputValue, setInputValue] = React.useState(0)
    const [keybord, setKeybord] = React.useState(0)
    

    const getQiymat = () => {
        setInputValue(oneQuantityMalochni(props.product.id))
    }

    React.useEffect(()=>{
        getQiymat();
    },[globalState.malochniArray.length]);
    

    return (
        <>

            <tr>
                <td>{props.tr}</td>
                <td>{props.product.name}</td>
                <td> 
                    <div style={{position: "relative"}}>
                        <LoginInput
                            value={inputValue}
                            onFocus={() => {setKeybord(1)}}
                        />
                        {
                            
                            (keybord == 1)?
                            <KeyBoard
                                setInputQiymati={
                                    (arg)=>{setInputValue(arg);
                                    setMalochniArray(props.product.id,props.clientId,arg)
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
});

const BaySotuvListSubmit = observer(() => {
    const [maxsulot, setMaxsulot] = React.useState(getMalochniProducts());
    React.useEffect(()=>{
        setMaxsulot(getMalochniProducts());
    },[globalState.malochniArray.length]);
    return (
        <div style={{padding: "0 20px", marginTop: "20px"}}>
            <HeaderSubmitInfo>
                <p style={{color: "#fff"}}>Jami {maxsulot.length} ta maxsulot</p>
                <SubmitButton
                    onClick={() => {
                        axios.post(`order/dairy-sell-order-list/`, getMalochniProducts() )
                        .then( response => {
                            console.log(response.data);
                            alert("malumotlar tugri kiritildi");
                        })
                        .catch(error => {
                            console.log({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                            alert("malumotlar tugri kiritilmagan");
                        });
                        console.log(getMalochniProducts())
                        clearMalochniArray();
                    }}
                >
                    Topshirish
                </SubmitButton>
            </HeaderSubmitInfo>
        </div>
    )
})

export default observer(_SotuvListAgent);