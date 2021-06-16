import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { globalState, setPlus } from "./../../globalState";
import ProgresBar from "../ProgresBar";
import ReactSelect from "../ReactSelect";
import axios from "./../../baseUrl";
import { getToken } from "./../../globalState";
import ReactModal from 'react-modal';
import {
  ListUl,
  ItemLi,
  Message,
  MessageText,
  AddItemButton,
  LoginInput,
  EditDeleteSave,
  CatigoryEdit,
  CatigoryDelete,
  CatigorySave,
  CatigoryClose,
  ListWrapper,
  AddProductButton,
  InputGroup,
  ModalOyna,
} from "./styles";
import PaginationOutline from "./../PaginationOutline";
import TasdiqlashOynasi from "./../TasdiqlashOynasi";

const _CreateProdList = () => {
  const [products, setProducts] = React.useState([]);
  const [booleanVar, setBooleanVar] = React.useState(false);
  //pagination uchun
  const [offset, setOffset] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const limit = 5;
  let tartibRaqami = 0;

  useEffect(() => {
    axios
      .get(
        `product/product-list/?limit=${limit}&offset=${(offset - 1) * limit}`,
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
        setProducts(res.data.products);
        setCount(Math.floor(res.data.count / limit) + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [booleanVar, offset, globalState.search]);

  return (
    <div style={{ padding: "0 20px" }}>
      {globalState.plus ? (
        <AddItem
          funcBoolean={() => {
            setBooleanVar(!booleanVar);
          }}
        />
      ) : (
        <></>
      )}
      <div className="table-responsive">
        <table class="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td>T/R</td>
              <td>Taminotchi</td>
              <td>Maxsulot sinfi</td>
              <td>Maxsulot nomi</td>
              <td>O'lchov</td>
              <td>Status</td>
              <td>Normativ kuni</td>
              <td>O'zgarishlar</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((elem, itemInd) => {
                return (
                  <OneItem
                    number={itemInd}
                    key={elem.id}
                    item={elem}
                    tartibRaqami={tartibRaqami}
                  />
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <div
          style={{
            textAlign: "center",
            display: "block",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PaginationOutline
            count={count}
            setPage={(arg) => {
              setOffset(arg);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const OneItem = (props) => {
  const [one, setOne] = React.useState(true);
  const [bor, setBor] = React.useState(true);

  const [catigory, setCatigory] = React.useState([]);
  const [provider, setProvider] = React.useState([]);
  const [tartibRaqami, setTartibRaqami] = React.useState(props.tartibRaqami);

  const [oneProduct, setOneProduct] = React.useState(props.item);

  let selectedProvider = "" + oneProduct.provider.name;
  let selectedCategory = "" + oneProduct.category.name;
  let selectedUnit = "" + oneProduct.unit;
  let selectedStatus = "" + oneProduct.product_type;
  let [select_estimated_delivery_days, setDeliveryDays] = React.useState(oneProduct.estimated_delivery_days);
  let [maxsulotName, setMaxsulotName] = React.useState(oneProduct.name);
  const [tasdiq, setTasdiq] = React.useState(false);

  const deleteProduct = (_id) => {
    axios
      .delete(`product/product-detail/${_id}/`)
      .then((res) => {
        if (res.status == 204) {
          setBor(false);
          alert("Maxsulot o'chirildi!");
        }
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  const updateProduct = (_id) => {
    axios
      .put(
        `product/product-detail/${_id}/`,
        {
          name: maxsulotName,
          unit: selectedUnit,
          product_type: selectedStatus,
          category: selectedCategory,
          provider: selectedProvider,
          //shu yerga
          estimated_delivery_days: select_estimated_delivery_days
        },
        {
          // headers: {
          //   'Authorization': `Basic ${getToken()}`
          // }
        }
      )
      .then((response) => {
        setOneProduct(response.data);
        setOne(true);
        // if(response.data.id>0){
        //     props.funcBoolean();
        //     setProgres(false);
        // }
        alert("O'zgarishlar saqlandi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        // setProgres(false);
      });
  };

  const getCatigory = () => {
    axios
      .get("product/category-list/", {
        // headers: {
        //     'Authorization': `token ${getToken()}`
        // }
      })
      .then((res) => {
        setCatigory(
          res.data.map((elem) => {
            return {
              value: elem.id,
              label: elem.name,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProvider = () => {
    axios
      .get("provider/provider-list/", {
        // headers: {
        //     'Authorization': `token ${getToken()}`
        // }
      })
      .then((res) => {
        setProvider(
          res.data.providers.map((elem) => {
            return {
              value: elem.id,
              label: elem.name,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCatigory();
    getProvider();
  }, []);

  if (bor == true) {
    return (
      <tr>
        <td>{props.number + 1}</td>
        <td>
          {one ? (
            <>{oneProduct.provider.name}</>
          ) : (
            <ReactSelect
              options={provider}
              placeholder={oneProduct.provider.name}
              func={(arg) => {
                selectedProvider = arg;
              }}
            />
          )}
        </td>
        <td>
          {one ? (
            <>{oneProduct.category.name}</>
          ) : (
            <ReactSelect
              options={catigory}
              placeholder={oneProduct.category.name}
              func={(arg) => {
                selectedCategory = arg;
              }}
            />
          )}
        </td>
        <td>
          {one ? (
            <>{oneProduct.name}</>
          ) : (
            <LoginInput
              value={maxsulotName}
              onChange={(event) => {
                setMaxsulotName(event.target.value);
              }}
            />
          )}
        </td>
        <td>
          {one ? (
            <>{oneProduct.unit}</>
          ) : (
            <ReactSelect
              options={[
                { value: "kg", label: "kg" },
                { value: "litr", label: "litr" },
                { value: "ta", label: "ta" },
              ]}
              placeholder={oneProduct.unit}
              func={(arg) => {
                selectedUnit = arg;
              }}
            />
          )}
        </td>
        <td>
          {one ? (
            <>
              {oneProduct.product_type == "limited"
                ? "chegaralangan"
                : "chegaralanmagan"}
            </>
          ) : (
            <ReactSelect
              options={[
                { value: "limited", label: "cheklangan" },
                { value: "unlimited", label: "cheklanmagan" },
              ]}
              placeholder={
                oneProduct.product_type == "limited"
                  ? "chegaralangan"
                  : "chegaralanmagan"
              }
              func={(arg) => {
                selectedStatus = arg;
              }}
            />
          )}
        </td>
        <td>
          {one ? (
            <>{oneProduct.estimated_delivery_days}</>
          ) : (
            <LoginInput
              value={select_estimated_delivery_days}
              onChange={(event) => {
                setDeliveryDays(event.target.value);
              }}
            />
          )}
        </td>
        <td>
          <EditDeleteSave>
            {one ? (
              <>
                <CatigoryEdit
                  onClick={() => {
                    setOne(false);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </CatigoryEdit>
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
                      deleteProduct(oneProduct.id);
                    }}
                    buttunBirText="Tasdiqlamayman"
                    buttunIkkiText="Tasdiqlayman"
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <CatigorySave
                  onClick={() => {
                    updateProduct(oneProduct.id);
                  }}
                >
                  <i className="fas fa-save"></i>
                </CatigorySave>
                <CatigoryClose
                  onClick={() => {
                    setOne(true);
                  }}
                >
                  <i className="fas fa-times"></i>
                </CatigoryClose>
              </>
            )}
          </EditDeleteSave>
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
};

const AddItem = (props) => {
  const [catigory, setCatigory] = React.useState([]);
  const [provider, setProvider] = React.useState([]);
  const [progres, setProgres] = React.useState(false);

  let selectedProvider = 0;
  let selectedCategory = 0;
  let selectedUnit = "";
  let selectedStatus = "";
  let maxsulotNome = "";
  let new_estimated_delivery_days = "";

  const getCatigory = () => {
    axios
      .get("product/category-list/", {
        // headers: {
        //     'Authorization': `token ${getToken()}`
        // }
      })
      .then((res) => {
        setCatigory(
          res.data.map((elem) => {
            return {
              value: elem.id,
              label: elem.name,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProvider = () => {
    axios
      .get("provider/provider-list/", {
        // headers: {
        //     'Authorization': `token ${getToken()}`
        // }
      })
      .then((res) => {
        setProvider(
          res.data.providers.map((elem) => {
            return {
              value: elem.id,
              label: elem.name,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createProduct = () => {
    setProgres(true);
    axios
      .post(
        `product/product-list/`,
        {
          name: maxsulotNome,
          unit: selectedUnit,
          product_type: selectedStatus,
          category: selectedCategory,
          provider: selectedProvider,
          estimated_delivery_days: new_estimated_delivery_days,
        },
        {
          // headers: {
          //   'Authorization': `Basic ${getToken()}`
          // }
        }
      )
      .then((response) => {
        if (response.data.id > 0) {
          props.funcBoolean();
          setProgres(false);
          alert("Maxsulot qo'shildi!");
        }
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        setProgres(false);
      });
  };

  useEffect(() => {
    getCatigory();
    getProvider();
  }, []);
  
  if (progres == false) {
    return (
            <ReactModal
              isOpen={true}
              contentLabel="Minimal Modal Example"
            >
              <InputGroup>
              <div className="row " style={{ paddingBottom: "10px" }}>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>Taminotchi</label>
                  <ReactSelect
                    options={provider}
                    func={(arg) => {
                      selectedProvider = arg;
                    }}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>Mahsulot Sinfi</label>
                  <ReactSelect
                    options={catigory}
                    func={(arg) => {
                      selectedCategory = arg;
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ paddingBottom: "10px" }}>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>Mahsulot Nomi</label>
                  <LoginInput
                    placeholder="Maxsulot nomi"
                    onChange={(event) => {
                      maxsulotNome = event.target.value;
                    }}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>O'lchov Birligi</label>
                  <ReactSelect
                    options={[
                      { value: "kg", label: "kg" },
                      { value: "litr", label: "litr" },
                      { value: "ta", label: "ta" },
                    ]}
                    func={(arg) => {
                      selectedUnit = arg;
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ paddingBottom: "10px" }}>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>Status</label>
                  <ReactSelect
                    options={[
                      { value: "limited", label: "cheklangan" },
                      { value: "unlimited", label: "cheklanmagan" },
                    ]}
                    func={(arg) => {
                      selectedStatus = arg;
                    }}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 text-left">
                  <label>Normativ kun</label>
                  <LoginInput
                    placeholder="Normativ kun"
                    onChange={(event) => {
                      new_estimated_delivery_days = event.target.value;
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ paddingBottom: "10px" }}>
                {/* <div className="col-xs-12 text-left"> */}
              <Message style={{ border: "none", height: "auto" }}>
                {
                  <AddItemButton
                    onClick={() => {
                      createProduct();
                      props.funcBoolean();
                      setPlus(false);
                    }}
                  >
                    Qo'shish
                  </AddItemButton>
                }
              </Message>
              {/* </div> */}
            </div>
            </InputGroup>
            </ReactModal>
    );
  } else {
    return (
      <div style={{ padding: "10px 0", textAlign: "center" }}>
        <ProgresBar />
      </div>
    );
  }
};

export default observer(_CreateProdList);