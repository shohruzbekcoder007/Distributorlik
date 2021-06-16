import React, { useEffect } from 'react'
import { LoginInput, HeaderSubmitInfo, SubmitButton } from './styles'
import axios from './../../baseUrl'
import ReactSelectMulti from './../ReactSelectMulti';
import ReactSelect from './../ReactSelect';
import { setBuyArray, getBuyArray, clearBuyArray, oneQuantity, globalState, getSumBuyArray, setClientForBuyProduct } from './../../globalState'
import { observer } from "mobx-react";
import QulvolaSelect from '../QulvolaSelect';

function _SotuvList(props){

    const [products, setProducts] = React.useState([]);
    const [catigoryIds, setCatigoryIds] = React.useState([]);
    const [catigory, setCatigory] = React.useState([]);
    const [filterProducts, setFilterProducts] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [clientsId, setClientsId] = React.useState(0);

    const getClients = () => {
        axios.get(`client/client-list/`,{
            params: {
              term: '',
            },
          })
        .then((res) => {
            const ctg = res.data.clients.map((elem) => 
                {
                    return {
                        label : elem.name,
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

    const getNewClints = () => {
        axios.get(`client/client-list/`,{
            params: {
              term: globalState.clientSearchText,
            },
          })
        .then((res) => {
            console.log(res)
            const ctg = res.data.clients.map((elem) => 
                {
                    return {
                        label : elem.name,
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
    },[catigoryIds,clientsId,globalState.buyArray.length]);

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
                <QulvolaSelect
                    options={clients}
                    placeholder="Xaridorni tanlang"
                    funcValue={
                        (arg) => {
                            console.log(arg)
                            setClientsId(arg);
                            setClientForBuyProduct(arg)
                        }
                        
                    }
                    searchInputUchun = { () => {
                        console.log("ishladi")
                        getNewClints();
                    }
                    }
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
                                <td>Narxi</td>
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
export default observer(_SotuvList);

const ProductBuyItemNew = observer((props) => {

    const [narx, setNarx] = React.useState(0);
    const [narxId, setNarxId] = React.useState(0);
    const [oneNarx, serOneNarx] = React.useState(0);
    const [inputValue, setInputValue] = React.useState(0)
    

    const getNarx = () => {
        axios.get(`product/category-product/${props.product.category.id}/${props.clientId}/`)
        .then((res) => {
            console.log(res.data)
            setNarx(res.data[0].price);
            setNarxId(res.data[0].price_id);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getQiymat = () => {
        setInputValue(oneQuantity(props.product.id))
    }

    React.useEffect(()=>{
        getNarx();
        getQiymat();
    },[globalState.buyArray.length]);
    

    return (
        <>

            <tr>
                <td>{props.tr}</td>
                <td>{props.product.name}</td>
                <td>
                    <LoginInput defaultValue={oneQuantity(props.product.id)} onChange={
                        (event)=>{
                            serOneNarx(+narx*(+event.target.value));
                            setBuyArray(props.product.id,props.clientId,narxId,event.target.value)
                        }
                    }/>
                </td>
                <td>{(+oneNarx)}</td>
            </tr>

        </>
    )
});

const BaySotuvListSubmit = observer(() => {
    const [maxsulot, setMaxsulot] = React.useState(getBuyArray());
    React.useEffect(()=>{
        console.log("ishladi")
        setMaxsulot(getBuyArray())
    },[globalState.buyArray.length]);
    return (
        <div style={{padding: "0 20px", marginTop: "20px"}}>
            <HeaderSubmitInfo>
                <p style={{color: "#fff"}}>Jami {maxsulot.soni} ta maxsulot {maxsulot.summa} ga sotilmoqda</p>
                <SubmitButton
                    onClick={() => {
                        let tekshirishga = getSumBuyArray();
                        console.log(tekshirishga, "tekshirishga");
                        let tbool = true;
                        for(let i=0; i < tekshirishga.length; i++){
                            if(+tekshirishga.price <= 0){
                                tbool = false;
                                console.log("price", i);
                            }
                        }
                        if(tbool){
                            axios.post(`/order/sell-order-list/`, getSumBuyArray() )
                            .then( response => {
                                console.log(response.data);
                                alert("malumotlar tugri kiritildi");
                            })
                            .catch(error => {
                                console.log({ errorMessage: error.toString() });
                                console.error('There was an error!', error);
                                alert("malumotlar tugri kiritilmagan");
                            });
                        } else {
                            alert("malumotlar tugri kiritilmagan");
                        }
                        
                        clearBuyArray();
                    }}
                >
                    Sotilsin
                </SubmitButton>
            </HeaderSubmitInfo>
        </div>
    )
})