import React from "react";
import { observer } from "mobx-react";
import { globalState } from "./../../globalState";
import {
  SubmitButton
} from "./styles";
import axios from "./../../baseUrl";
import { getToken } from "./../../globalState";
import DataPicker from "./../DataPicker";
import TasdiqlashOynasi from "./../TasdiqlashOynasi";
import PaginationOutline from "./../PaginationOutline";
import PrintThisComponentAllYangi from "./../PrintThisComponentAllYangi"
import { Link, useLocation, useHistory, useRouteMatch } from "react-router-dom";

const _SuralganMaxsulot = (props) => {
  const [surovlar, setSurovlar] = React.useState([]);
  const [uzgarish, setUzgarish] = React.useState(false);
  const history = useHistory()
  const maxsulot = useLocation().state;
  const [print ,setPrint] = React.useState(false);

  const tasdiqlansinBittalab = (_id,elem) => {
    let { price, quantity, client, product } = elem;
    axios
      .put(
        `order/sell-order-detail/${_id}/`,
        {
          price: price,
          quantity: quantity,
          status: "delivered",
          client: client.id,
          product: product.id,
        }
      )
      .then((response) => {
        console.log("Surov tasdiqlandi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  const uzgartirish = () => {
    setUzgarish(!uzgarish);
  };

  const getSurovlar = () => {
    axios
      .get(
        `order/sell-order-list/`,
        {
          // headers: {
          //     'Authorization': `token ${getToken()}`
          // }
        }
      )
      .then((res) => {
        setSurovlar(res.data.sell_order_list);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getSurovlar();
  }, [uzgarish]);
  let tartib_raqami = 0;
  {
      if(print==false){
        return (
            <div style={{ padding: "0 20px" }}>
                <h4 style={{color: "#fff", textAlign: "center"}}>Mijoz {maxsulot.client.client.name}ga yetkazilishi kerak bulgan maxsulotlar</h4>
              <div className="table-responsive">
                <table class="table table-striped table-hover text-center  mb-0">
                  <thead>
                    <tr>
                      <td>T/R</td>
                      <td>Mijoz</td>
                      <td>Agent</td>
                      <td>Maxsulot</td>
                      <td>O'lchami</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      surovlar.map((elem) => {
                          if (elem.status == "ordered") {
                              if(maxsulot.client.client.id == elem.client.id){
                                tartib_raqami++;
                                return (
                                        <ListItemOne
                                            key={elem.id}
                                            surov={elem}
                                            func={uzgartirish}
                                            tartib_raqami={tartib_raqami}
                                            url={props.url}
                                        />)
                            }
                            else {
                                return( <></>)
                            }
                        }
                      })
                    }
                  </tbody>
                </table>
              </div>
                <div style={{paddingTop: "10px", textAlign: "right"}}>
                    <SubmitButton style={{marginRight: "15px"}} onClick={()=>{
                        history.goBack();
                    }}>Orqaga</SubmitButton>
                    <SubmitButton onClick={()=>{
                      setPrint(true);
                      surovlar.map((elem) => {
                            if(maxsulot.client.client.id == elem.client.id)
                            tasdiqlansinBittalab(elem.id,elem);
                    })
                      }}>Barchasini chop qilish</SubmitButton>
                </div>   
            </div>
          )
      }else{
          return (
            <PrintThisComponentAllYangi maxsulotlar = {surovlar.map((elem) => {
              // if (elem.status == "ordered") {
                  if(maxsulot.client.client.id == elem.client.id && maxsulot.status == 'ordered')
                    return elem
            // }
          })}/>
          )
      }
    }
};

const ListItemOne = (props) => {
  const [oneSurov, setOneSurov] = React.useState(props.surov);
  let [tartib_raqami, settartib_raqami] = React.useState(props.tartib_raqami);
  const [tasdiq, setTasdiq] = React.useState(false);

  const tasdiqlansin = (_id) => {
    let { price, quantity, client, product } = oneSurov;
    axios
      .put(
        `order/sell-order-detail/${_id}/`,
        {
          price: price,
          quantity: quantity,
          status: "delivered",
          client: client.id,
          product: product.id,
        },
        {
          // headers: {
          //   'Authorization': `Basic ${getToken()}`
          // }
        }
      )
      .then((response) => {
        alert("Surov tasdiqlandi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    props.func();
  };

  const deleteRequest = (_id) => {
    axios
      .delete(`order/sell-order-detail/${_id}`)
      .then((res) => {})
      .then(() => {
        alert("surov o'chirildi");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    props.func();
  };

  return (
    <tr>
      <td>{tartib_raqami}</td>
      <td>
          {oneSurov.client.name}
      </td>
      <td>
        {oneSurov.client.sale_agent.first_name +
          " " +
          oneSurov.client.sale_agent.last_name}
      </td>
      <td>{oneSurov.product.name}</td>
      <td>{oneSurov.quantity + " " + oneSurov.product.unit}</td>
    </tr>
  );
};


export default observer(_SuralganMaxsulot);
