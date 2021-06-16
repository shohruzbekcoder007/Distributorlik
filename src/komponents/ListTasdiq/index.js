import React from "react";
import { observer } from "mobx-react";
import { globalState } from "./../../globalState";
import {
  EditDeleteSave,
  CatigorySave,
  CatigoryDelete,
  Qaytarish,
  Oynacha,
  LoginContainer,
  LoginTitle,
  ErrorMessage,
  LoginInput,
  SubmitWrapper,
  SubmitButton,
  CatigoryPrint,
} from "./styles";
import axios from "./../../baseUrl";
import { getToken } from "./../../globalState";
import DataPicker from "./../DataPicker";
import ReactSelect from "../ReactSelect";
import TasdiqlashOynasi from "./../TasdiqlashOynasi";
import { Link } from "react-router-dom";
import PaginationOutline from "./../PaginationOutline";

const _ListTasdiq = (props) => {
  const [surovlar, setSurovlar] = React.useState([]);
  const [uzgarish, setUzgarish] = React.useState(false);
  //pagination uchun
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
            // term: term
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
  let tartibRaqami = 0;
  return (
    <div style={{ padding: "0 20px" }}>
      <div className="table-responsive">
        <table class="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td>T/R</td>
              <td>Agent</td>
              <td>Maxsulot</td>
              <td>O'lchami</td>
              <td>Xaridor</td>
              <td>Sana</td>
              <td>Status</td>
              <td>Tasdiqlash</td>
            </tr>
          </thead>
          <tbody>
            {surovlar.map((elem) => {
              tartibRaqami++;
              if (elem.status == "delivered") {
                return (
                  <ListItemOne
                    key={elem.id}
                    surov={elem}
                    func={uzgartirish}
                    tartibRaqami={tartibRaqami}
                    url={props.url}
                  />
                );
              }
            })}
          </tbody>
        </table>
        <PaginationOutline
          count={count}
          setPage={(arg) => {
            setOffset(arg);
          }}
        />
      </div>
      {/* <div style={{paddingTop: "10px", textAlign: "right"}}>
            <Link to={{ pathname: `${props.url}/printAll`, state: surovlar }}>
                <SubmitButton>Barchasini chop qilish</SubmitButton>
            </Link>
        </div> */}
    </div>
  );
};

const ListItemOne = (props) => {
  const [oneSurov, setOneSurov] = React.useState(props.surov);
  const [oynacha, setOynacha] = React.useState("none");
  const [tasdiq, setTasdiq] = React.useState(false);
  const [tartibRaqami, setTartibRaqami] = React.useState(props.tartibRaqami);

  let qaytishTuri = "";
  let qachaQaytgan = "";

  const qaytarilsin = (_id) => {
    let { price, quantity, client, product } = oneSurov;
    axios
      .put(
        `order/sell-order-detail/${_id}/`,
        {
          price: price,
          quantity: quantity,
          status: "ordered",
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
        alert("Maxsulot tasdiqlanganlardan olib quyildi!");
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
        alert("Maxsulot o'chirildi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    props.func();
  };

  const createQaytganMaxsulot = (_id) => {
    axios
      .post(
        `order/client-failed-product-list/`,
        {
          sell_order: _id,
          failed_status: qaytishTuri,
          returned_quantity: qachaQaytgan,
        },
        {
          // headers: {
          //   'Authorization': `Basic ${getToken()}`
          // }
        }
      )
      .then((response) => {
        // console.log(response);
        alert("Maxsulotdan qaytarish amalga oshirildi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <tr>
        <td>{tartibRaqami}</td>
        <td>
          {oneSurov.client.sale_agent.first_name +
            " " +
            oneSurov.client.sale_agent.last_name}
        </td>
        <td>{oneSurov.product.name}</td>
        <td>{oneSurov.quantity + " " + oneSurov.product.unit}</td>
        <td>{oneSurov.client.name}</td>
        <td>
          <DataPicker disabled="true" date={new Date(oneSurov.updated_date)} />
        </td>
        <td>Tasdiqlangan</td>
        <td>
          {/* <Message>

                </Message> */}
          <EditDeleteSave>
            <CatigorySave
              onClick={() => {
                qaytarilsin(oneSurov.id);
              }}
            >
              <i className="fas fa-redo"></i>
            </CatigorySave>
            <CatigoryDelete
              onClick={() => {
                setTasdiq(true);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </CatigoryDelete>
            <CatigoryPrint>
              <Link to={{ pathname: `${props.url}/print`, state: oneSurov }}>
                <i className="fas fa-print"></i>
              </Link>
            </CatigoryPrint>
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
            <Qaytarish
              onClick={() => {
                setOynacha("flex");
              }}
            >
              Qaytarish
            </Qaytarish>
          </EditDeleteSave>
        </td>
      </tr>
      <Oynacha style={{ display: oynacha }}>
        <LoginContainer style={{ width: "300px" }}>
          <LoginTitle>Qaytarilgan maxsulot</LoginTitle>
          <ErrorMessage>Qaytadan tekshirib kiriting</ErrorMessage>
          <ReactSelect
            options={[
              { value: "valid", label: "yaroqli" },
              { value: "invalid", label: "yaroqsiz" },
            ]}
            placeholder="Qanday qaytarildi"
            func={(arg) => {
              qaytishTuri = arg;
            }}
          />
          <LoginInput
            onChange={(event) => {
              qachaQaytgan = event.target.value;
            }}
            placeholder="miqdori"
          />
          <SubmitWrapper>
            <SubmitButton
              onClick={() => {
                setOynacha("none");
              }}
            >
              Chiqish
            </SubmitButton>
            <SubmitButton
              onClick={() => {
                setOynacha("none");
                createQaytganMaxsulot(oneSurov.id);
              }}
            >
              Tasdiqlash
            </SubmitButton>
          </SubmitWrapper>
        </LoginContainer>
      </Oynacha>
    </>
  );
};

export default observer(_ListTasdiq);