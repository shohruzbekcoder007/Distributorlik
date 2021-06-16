import React from 'react'
import { observer } from "mobx-react";
import {
    LoginInput,
    HeaderSubmitInfo,
    SubmitButton
} from './styles'
import axios from './../../baseUrl'
import ReactSelect from './../ReactSelect';
import { getQaytaribOlish, setQaytaribOlishArray, clearQaytaribOlishArray, globalState } from './../../globalState'


const _ReturnedClosedPoduct = (props) => {

    const [agents, setAgents] = React.useState([]);
    const [agentId, setAgentId] = React.useState(0);

    const getAgents = () => {
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
            setAgents(ctg);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    React.useEffect(() => {
        getAgents();
    }, [])

    return (
        <>
            <div style={{padding: "0 20px", marginTop: "20px"}}>
                <ReactSelect
                    placeholder="Agentni tanlang"
                    options={agents}
                    func={(arg) => {
                        setAgentId(arg);
                        clearQaytaribOlishArray();
                    }}
                />
            </div>
            <QaytaribOlishniTasdiqlash/>
            <BugungiIshniYopish agentId={agentId}/>
            <ListReturned agentId={agentId}/>
        </>
    )
}

const ListReturned = (props) => {

    const [products, setProducts] = React.useState([]);

    const getProducts = (_id) => {
        axios.get(`order/get-dairy-order/${props.agentId}`)
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    React.useEffect(() => {
        getProducts();
    }, [props.agentId])

    return (
        <div style={{padding: "20px"}}>
            <div className="table-responsive">
                <table class="table table-striped table-hover text-center  mb-0">
                    <thead>
                        <tr>
                            <td>T/R</td>
                            <td>Maxsulot</td>
                            <td>Qaygan miqdori</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((elem,index) => {
                                return (
                                        <tr key={elem.id}>
                                            <td>{index + 1}</td>
                                            <td>{elem.product.name}</td>
                                            <td>
                                                {
                                                        <LoginInput
                                                            onChange={(event) => {
                                                                setQaytaribOlishArray(elem.id,event.target.value,props.agentId)
                                                                console.log(elem.id,event.target.value,props.agentId);
                                                                console.log(getQaytaribOlish())
                                                            }}
                                                        />
                                                }
                                                
                                            </td>
                                        </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const QaytaribOlishniTasdiqlash = observer(() => {
    const [maxsulotlar, setMaxsulotlar] = React.useState(getQaytaribOlish());
    React.useEffect(()=>{
        setMaxsulotlar(getQaytaribOlish());
    },[globalState.qaytaribOlish.length]);
    return (
        <div style={{padding: "0 20px", marginTop: "20px"}}>
            <HeaderSubmitInfo>
                <p style={{color: "#fff"}}>Jami {maxsulotlar.length} ta maxsulot</p>
                <SubmitButton
                    onClick={() => {
                        axios.post(`order/returned-product/`, getQaytaribOlish())
                        .then( response => {
                            console.log(response.data);
                            // if(response.data.price){
                            //     alert(response.data.price);
                            // } else {
                            //     alert("malumotlar tugri kiritildi");
                            // }
                        })
                        .catch(error => {
                            console.log({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                            alert("malumotlar tugri kiritilmagan");
                        });
                        // clearSotibOlishArray()
                    }}
                >
                    Qaytarib olish
                </SubmitButton>
            </HeaderSubmitInfo>
        </div>
    )
});

const BugungiIshniYopish = observer((props) => {
    return (
        <div style={{padding: "0 20px", marginTop: "20px"}}>
            <HeaderSubmitInfo>
                <p style={{color: "#fff"}}>Ushbu agentning ishlarini </p>
                <SubmitButton
                    onClick={() => {
                        axios.put(`order/close-the-day/${props.agentId}`, getQaytaribOlish())
                        .then( response => {
                            console.log(response.data);
                            alert("Ushbu agentning ishlari yopiildi")
                        })
                        .catch(error => {
                            console.log({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                            alert("malumotlar tugri kiritilmagan");
                        });
                    }}
                >
                    Yopish
                </SubmitButton>
            </HeaderSubmitInfo>
        </div>
    )
});

export default observer(_ReturnedClosedPoduct);