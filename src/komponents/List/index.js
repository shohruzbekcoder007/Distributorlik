import React from "react";
import { observer } from "mobx-react";
import { globalState } from "./../../globalState";
import {
  ListUl,
  ItemLi,
  Message,
  MessageText, 
  EditDeleteSave,
  CatigorySave,
  CatigoryDelete,
  ListWrapper,
} from "./styles";
import axios from "./../../baseUrl";
import { getToken } from "./../../globalState";
import DataPicker from "./../DataPicker";
import TasdiqlashOynasi from "./../TasdiqlashOynasi";
import PaginationOutline from "./../PaginationOutline";
import { Link } from "react-router-dom";

const _List = (props) => {
  const [surovlar, setSurovlar] = React.useState([]);
  const [uzgarish, setUzgarish] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const limit = 5;

  const uzgartirish = () => {
    setUzgarish(!uzgarish);
  };

  const getSurovlar = () => {
    axios
      .get(
        `order/sell-order-list/?limit=${limit}&offset=${(offset - 1) * limit}`,
        {
          params: {
            term: globalState.search,
          },
        },
        {
          // headers: {
          //     'Authorization': `token ${getToken()}`
          // }
        }
      )
      .then((res) => {
        setSurovlar(res.data.sell_order_list);
        setCount(Math.floor(res.data.count / limit) + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getSurovlar();
  }, [uzgarish, offset, globalState.search]);
  let tartib_raqami = 0;
  return (
    <div style={{ padding: "0 20px" }}>
      <div className="table-responsive">
        <table class="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td>Mijoz</td>
              <td>T/R</td>
              <td>Agent</td>
              <td>Maxsulot</td>
              {/* <td>O'lchami</td> */}
              <td>Sana</td>
              <td>Status</td>
              <td>Tasdiqlash</td>
            </tr>
          </thead>
          <tbody>
            {
              surovlar.map((elem) => {
                // return (
                tartib_raqami++;

                // )
                if (elem.status == "ordered") {
                  return (
                    <ListItemOne
                      key={elem.id}
                      surov={elem}
                      func={uzgartirish}
                      tartib_raqami={tartib_raqami}
                      url={props.url}
                    />
                  );
                }
              })
            }
          </tbody>
        </table>
        <PaginationOutline
          count={count}
          setPage={(arg) => {
            setOffset(arg);
          }}
        />
      </div>
    </div>
  );
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
        {console.log(`${props.url}/barchasiMaxsulot`)}
        <Link to={{ pathname: `${props.url}/barchasiMaxsulot`, state: {client: oneSurov}}}>
          {oneSurov.client.name}
        </Link>
      </td>
      <td>
        {oneSurov.client.sale_agent.first_name +
          " " +
          oneSurov.client.sale_agent.last_name}
      </td>
      <td>{oneSurov.product.name}</td>
      {/* <td>{oneSurov.quantity + " " + oneSurov.product.unit}</td> */}
      
      <td>
        <DataPicker disabled="true" date={new Date(oneSurov.updated_date)} />
      </td>
      <td>Buyurtma qilingan</td>
      <td>
        <EditDeleteSave>
          <CatigorySave
            onClick={() => {
              tasdiqlansin(oneSurov.id);
            }}
          >
            <i className="fas fa-check"></i>
          </CatigorySave>
          <CatigoryDelete
            onClick={() => {
              setTasdiq(true);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </CatigoryDelete>
          {tasdiq ? (
            <TasdiqlashOynasi
              text="O'chirilgan malumotlar qayta tiklanmaydi. O'chirishni tasdiqlaysizmi?"
              closeFunc={() => {
                setTasdiq(false);
              }}
              submitFunc={() => {
                setTasdiq(false);
                deleteRequest(oneSurov.id);
              }}
              buttunBirText="Tasdiqlamayman"
              buttunIkkiText="Tasdiqlayman"
            />
          ) : (
            <></>
          )}
        </EditDeleteSave>
      </td>
    </tr>
  );
};

export default observer(_List);
