import React from "react";
import { Message, LoginInput, InputGroup, ModalOyna } from "./styles";
import ProgresBar from "../ProgresBar";
import ReactSelect from "../ReactSelect";
import axios from "./../../baseUrl";
import { getToken, setPlus } from "./../../globalState";
import DataPicker from "../DataPicker";
import { AddProductButton } from "../CreateProdList/styles";
import TextField from "@material-ui/core/TextField";
import ReactModal from 'react-modal';

export default function ProductBuyCreate(props) {
  const [products, setProducts] = React.useState([]);
  const [selectProducts, setSelectProducts] = React.useState([]);
  const [progres, setProgres] = React.useState(false);
  const [buyId, setBuyId] = React.useState(0);

  let selectProduct = 0;
  let hajm = "";
  let narxi = "";
  let dateDeadline = new Date();

  const getProducts = () => {
    axios
      .get("product/product-list/", {
        // headers: {
        //     'Authorization': `token ${getToken()}`
        // }
      })
      .then((res) => {
        setProducts(res.data.products);
        const prs = res.data.products.map((elem) => {
          return {
            label: elem.name,
            value: elem.id,
          };
        });
        setSelectProducts(prs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createProduct = () => {
    setProgres(true);
    axios
      .post(
        `order/buy-order-list/`,
        {
          price: narxi,
          quantity: hajm,
          deadline: dateDeadline,
          product: selectProduct,
        },
        {
          // headers: {
          //   'Authorization': `Basic ${getToken()}`
          // }
        }
      )
      .then((response) => {
        setBuyId(response.data.id);
        props.func();
        setProgres(false);
        alert("Maxsulot sotib olindi!");
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        console.error("There was an error!", error);
        setProgres(false);
      });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  if (progres) {
    return <ProgresBar />;
  } else {
    return (
      <>
        <ReactModal
          isOpen={true}
          contentLabel="Minimal Modal Example"
        >
          <InputGroup style={{ paddingTop: "25px" }}>
            <div className="row">
              <div className="col-md-12 mb-2 text-left">
                <label>Mahsulot</label>
                <ReactSelect
                  options={selectProducts}
                  func={(arg) => {
                    selectProduct = arg;
                  }}
                  placeholder="Maxsulot"
                />
              </div>
              <div className="col-md-12 mb-2 text-left">
                <label>Hajmi</label>
                <LoginInput
                  type="number"
                  placeholder="Hajmi"
                  onChange={(event) => {
                    hajm = event.target.value;
                  }}
                />
              </div>
              <div className="col-md-12 mb-2 text-left">
                <label>Narxi</label>
                <LoginInput
                  type="number"
                  placeholder="Narxi"
                  onChange={(event) => {
                    narxi = event.target.value;
                  }}
                />
              </div>

              <div
                className="col-md-12  mb-2 text-left d-none"
                style={{ flexDirection: "column" }}
              >
                <label>Harid vaqti</label>
                <div className="form-control">
                  <DataPicker
                    date={new Date()}
                    disabled={true}
                    func={(arg) => {}}
                    className="red-border"
                  />
                </div>
              </div>
              <div className="col-md-12  mb-2 text-left">
                <label>Tugatish vaqti</label>
                <div className="form-control">
                  <DataPicker
                    date={new Date()}
                    func={(arg) => {
                      dateDeadline = arg;
                    }}
                  />
                </div>
              </div>

              <div
                className="col-md-12 mb-2 d-flex text-left"
                style={{ flexDirection: "column" }}
              >
                <label>Mahsulot qo'shish</label>
                <div>
                  <button
                    onClick={() => {
                      createProduct();
                      setPlus(false);
                    }}
                    className="btn btn-success"
                  >
                    Qo'shish
                  </button>
                </div>
              </div>
            </div>
          </InputGroup>
        </ReactModal>
      </>
    );
  }
}
