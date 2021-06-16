import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { globalState, setPlus } from "./../../globalState";
import axios from "./../../baseUrl";
import Loading from "./../KassirKomponents/Cashier/Loading";
import PaginationOutline from "../PaginationOutline";
import TextField from "@material-ui/core/TextField";
import ReactModal from 'react-modal';

import {
  ListUl,
  ItemLi,
  Message,
  MessageText,
  ListWrapper,
  TitleList,
  Message1,
  InputGroup,
  ModalOyna,
} from "./styles.js";

const _AddProvider = () => {
  const [client, setClient] = useState({
    id: "",
    name: "",
    address: "",
    phone_number1: "",
    phone_number2: "",
    account_number: "",
    bank: "",
    bank_code: "",
    INN: "",
    director: "",
    responsible_agent: "",
  });
  const [listProvider, setListProvider] = useState([]);
  const [reload, setReaload] = useState(0);
  const [displayShow, setDisplayShow] = useState({
    deleteButton: "none",
    editButton: "none",
    submitButton: "block",
  });

  const [offset, setOffset] = React.useState(0);
  const [count, setCount] = useState(1);
  const limit = 5;

  const submitClient = (e) => {
    e.preventDefault();
    let {
      name,
      address,
      phone_number1,
      phone_number2,
      responsible_agent,
      account_number,
      bank,
      bank_code,
      INN,
      director,
    } = client;
    axios
      .post(`/provider/provider-list/`, {
        name: name,
        address: address,
        phone_number1: phone_number1,
        phone_number2: phone_number2,
        responsible_agent: responsible_agent,
        account_number: account_number,
        bank: bank,
        bank_code: bank_code,
        INN: INN,
        director: director,
      })
      .then(async (response) => {
        alert("Alo saqlandi");
        setClient({
          id: "",
          name: "",
          address: "",
          phone_number1: "",
          phone_number2: "",
          account_number: "",
          bank: "",
          bank_code: "",
          INN: "",
          director: "",
          responsible_agent: "",
        });
        renderTable();
        setReaload(2);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
      });
  };

  const deleteClientData = async (id) => {
    await axios.delete(`/provider/provider-detail/${id}/`);
    alert("Malumot o'chirildi");
    setDisplayShow({ deleteButton: "none" });
    setReaload(1);
    renderTable();
  };

  const updateClient = async () => {
    let {
      name,
      address,
      phone_number1,
      phone_number2,
      responsible_agent,
      account_number,
      bank,
      bank_code,
      INN,
      director,
      id,
    } = client;
    await axios.put(`/provider/provider-detail/${id}/`, {
      name: name,
      address: address,
      phone_number1: phone_number1,
      phone_number2: phone_number2,
      responsible_agent: responsible_agent,
      account_number: account_number,
      bank: bank,
      bank_code: bank_code,
      INN: INN,
      director: director,
    });
    setClient({
      id: "",
      name: "",
      address: "",
      phone_number1: "",
      phone_number2: "",
      account_number: "",
      bank: "",
      bank_code: "",
      INN: "",
      director: "",
      responsible_agent: "",
    });
    setDisplayShow({
      deleteButton: "none",
      editButton: "none",
      submitButton: "block",
    });
    setReaload(3);
    renderTable();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setClient({ ...client, [name]: value });
  };

  const showUpdateData = (client) => {
    let {
      name,
      address,
      phone_number1,
      phone_number2,
      responsible_agent,
      account_number,
      bank,
      bank_code,
      INN,
      director,
      id,
    } = client;

    setClient({
      name: name,
      address: address,
      phone_number1: phone_number1,
      phone_number2: phone_number2,
      responsible_agent: responsible_agent,
      account_number: account_number,
      bank: bank,
      bank_code: bank_code,
      INN: INN,
      director: director,
      id: id,
    });
    setDisplayShow({
      editButton: "block",
      submitButton: "none",
    });
  };

  const showDeleteButton = () => {
    setDisplayShow({
      deleteButton: "block",
    });
    renderTable();
  };

  const restartClientData = () => {
    setDisplayShow({
      deleteButton: "none",
      editButton: "none",
      submitButton: "block",
    });
    setClient({
      id: "",
      name: "",
      address: "",
      phone_number1: "",
      phone_number2: "",
      account_number: "",
      bank: "",
      bank_code: "",
      INN: "",
      director: "",
      responsible_agent: "",
    });
    renderTable();
  };

  useEffect(() => {
    axios
      .get(
        `provider/provider-list/?limit=${limit}&offset=${(offset - 1) * limit}`,
        {
          params: {
            // term: term
            term: globalState.search,
          },
        }
      )
      .then((response) => {
        const results = response.data.providers;
        for (let i = 0; i < results.length; i++) {
          results[i]["order_id"] = i + 1;
        }
        setListProvider(results);
        setCount(Math.floor(response.data.count / limit) + 1);
      })
      .catch(() => {
        setListProvider([]);
      });
  }, [reload, offset, globalState.search]);

  function renderTable() {
    if (listProvider.length === 0) {
      <Loading />;
    } else {
      return (
        <div style={{ padding: "0 5px" }}>
          {globalState.plus ? (
            <ReactModal
              isOpen={true}
              contentLabel="Minimal Modal Example"
            >
              <InputGroup>
                <div className="row" style={{ padding: "0" }}>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Nomi"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      value={client.name}
                      onChange={handleChange}
                      required="required"
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Direktor"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="director"
                      name="director"
                      value={client.director}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row" style={{ padding: "0" }}>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Manzil"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="address"
                      name="address"
                      value={client.address}
                      onChange={handleChange}
                      required="required"
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Telefon nomeri1"
                      // value="Default Value"
                      className="form-control"
                      type="number"
                      id="phone_number1"
                      name="phone_number1"
                      value={client.phone_number1}
                      onChange={handleChange}
                      required="required"
                    />
                  </div>
                </div>
                <div className="row" style={{ padding: "0" }}>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Telefon nomeri2"
                      className="form-control"
                      type="number"
                      id="phone_number2"
                      name="phone_number2"
                      value={client.phone_number2}
                      onChange={handleChange}
                      required="required"
                      // value="Default Value"
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="INN"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="INN"
                      name="INN"
                      value={client.INN}
                      onChange={handleChange}
                      required="required"
                    />
                  </div>
                </div>
                <div className="row" style={{ padding: "0" }}>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Masul"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="responsible_agent"
                      name="responsible_agent"
                      value={client.responsible_agent}
                      onChange={handleChange}
                      required="required"
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Hisob raqami"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="account_number"
                      name="account_number"
                      value={client.account_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row" style={{ padding: "0" }}>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Bank nomi"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="bank"
                      name="bank"
                      value={client.bank}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      margin="normal"
                      label="Bank raqami"
                      // value="Default Value"
                      className="form-control"
                      type="text"
                      id="bank_code"
                      name="bank_code"
                      value={client.bank_code}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    paddingTop: "10px",
                    textAlign: "right",
                  }}
                >
                  {/* <Message style={{border: "none", marginRight: "10px" }}> */}
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    style={{ display: `${displayShow.submitButton}` }}
                    onClick={(event) => {setPlus(false); submitClient(event)}}
                  >
                    Malumot qo'shish
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ display: `${displayShow.editButton}` }}
                    onClick={(event) => {setPlus(false); updateClient(event)}}
                  >
                    Malumot o'zgartirish
                  </button>
                  {/* </Message> */}
                </div>
              </InputGroup>
            </ReactModal>
          ) : (
            <></>
          )}

          <div style={{ padding: "0 20px" }}>
            <h3>Taminotchilar ro'yxati</h3>
            <div className="table-responsive">
              <table class="table table-striped table-hover text-center  mb-0">
                <thead>
                  <tr>
                    <td>T/R</td>
                    <td>Nomi</td>
                    <td>Direktor</td>
                    <td>Manzil</td>
                    <td>Tel Nomeri1</td>
                    <td>Tel Nomeri2</td>
                    <td>Masul</td>
                    <td>Hisob raqami</td>
                    <td>Bank nomi</td>
                    <td>Bank raqami</td>
                    <td>INN</td>
                    <td>O'zgartirishlar</td>
                  </tr>
                </thead>
                <tbody>
                  {listProvider.map((client) => (
                    <tr key={client.id}>
                      <td>{client.order_id}</td>
                      <td>{client.name}</td>

                      <td>{client.director}</td>

                      <td>{client.address}</td>

                      <td>
                        {client.phone_number1
                          ? client.phone_number1
                          : "Telefon raqam kiritilmagan"}
                      </td>

                      <td>
                        {client.phone_number2
                          ? client.phone_number2
                          : "Telefon raqam kiritilmagan"}
                      </td>

                      <td>{client.responsible_agent}</td>

                      <td>{client.account_number}</td>

                      <td>{client.bank}</td>

                      <td>{client.bank_code}</td>

                      <td>{client.INN}</td>

                      <td>
                        <span
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="O'zgartirish"
                          onClick={() => {
                            setPlus(true);
                            showUpdateData(client);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </span>
                        <span
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="O'chirish"
                          onClick={showDeleteButton}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </span>
                        <span
                          style={{
                            fontSize: "20px",
                            display: `${displayShow.deleteButton}`,
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="O'chirish"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteClientData(client.id)}
                          >
                            O'chirish
                          </button>
                        </span>
                        <span
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Qaytarish"
                          onClick={restartClientData}
                        >
                          {" "}
                          <i className="fas fa-undo"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
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
        </div>
        // </div>
      );
    }
  }

  return (
    <>
      {renderTable()}
      {/* <ListWrapper>
                <ListUl>
                    <ItemLi>
                        <PaginationOutline count={count} setPage={arg => {
                            setOffset(arg);
                        }}/>
                    </ItemLi>
                </ListUl>
            </ListWrapper> */}
    </>
  );
};

// export default AddProvider;
export default observer(_AddProvider);
