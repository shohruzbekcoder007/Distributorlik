import React, { useState } from "react";
// import "../../../KassirKomponents/Cashier/Clients/styles/table-style.css";

const SellOrders = ({ providers, paymentOrderAction }) => {
  const [localSellOrders, setLocalSellOrders] = useState(providers);
  const [query, setQuery] = useState();
  const [windowDisplay, setWindowDisplay] = useState("none");
  const [sellOrderPayment, setSellOrderPayment] = useState({
    payment_type: "",
    payment: "",
  });
  const [clientNameFullInfo, setClientNameFullInfo] = useState({
    sellOrderId: "",
    clientFName: "",
    clientDebt: "",
  });

  const filterByDebtClients = (debt) => {
    let elements = providers;

    if (debt === "debt")
      elements = elements.filter((element) => element.debt > 0);
    if (debt === "notDebt")
      elements = elements.filter((element) => element.debt == 0);

    setLocalSellOrders(elements);
    renderTable();
  };

  const filterByTypeProduct = (type) => {
    let elements = providers;

    if (type === "notvip")
      elements = elements.filter(
        (element) => element.product_type === "limited"
      );
    if (type === "notvip")
      elements = elements.filter(
        (element) => element.product_type === "unlimited"
      );

    setLocalSellOrders(elements);
    renderTable();
  };

  const filterByClientName = (searchValue) => {
    setQuery(searchValue);
    const elements = providers;
    const results = elements.filter(
      (element) =>
        element.product.provider.name
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1
    );
    setLocalSellOrders(results);
    renderTable();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setSellOrderPayment({ ...sellOrderPayment, [name]: value });
  };

  const showOrderPaymentDiv = (sellOrderId, clientName, debt) => {
    setSellOrderPayment(() => {
      return {
        payment_type: "",
        payment: "",
      };
    });

    setClientNameFullInfo(() => {
      return {
        clientFName: clientName,
        sellOrderId: sellOrderId,
        clientDebt: debt,
      };
    });

    setWindowDisplay("flex");
    renderTable();
  };

  const paymentOrderActionLocal = () => {
    paymentOrderAction(sellOrderPayment, clientNameFullInfo);
    renderTable();
  };

  function renderTable() {
    return (
      <div className="form-style">
        <div
          className="row"
          style={{ display: "flex", flexDirection: "row", padding: "20px" }}
        >
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <label htmlFor="debts">Qarzdorlik</label>
            </div>
            <select
              className="form-control"
              style={{ borderRadius: "100px" }}
              onChange={(e) => filterByDebtClients(e.target.value)}
              id="debts"
            >
              <option value="allOrders">Barchasi</option>
              <option value="notDebt">Qarzdor bo'lmaganlar</option>
              <option value="debt">Qarzdorlar</option>
            </select>
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "center" }}>
              <label htmlFor="debts">Maxsulot turi</label>
            </div>
            <select
              className="form-control"
              style={{ borderRadius: "100px" }}
              onChange={(e) => filterByTypeProduct(e.target.value)}
              id=""
            >
              <option value="allOrders">Barchasi</option>
              <option value="notvip">Vip emas</option>
              <option value="vip">Vip</option>
            </select>
          </div>
        </div>
        <div className="oynacha" style={{ display: `${windowDisplay}` }}>
          <div className="card" style={{ display: "block" }}>
            <div className="card-header">
              <h4 style={{ textAlign: "center", color:"black" }}>
                To'lov oynasi <br />
              </h4>
              <h6 style={{ textAlign: "center", color:"black" }}>
                <span style={{ fontWeight: "bolder", color:"black" }}>
                  {clientNameFullInfo.clientFName} {" "}
                </span>
                <span style={{ color: "red" }}>
                  {clientNameFullInfo.clientDebt}{" "} so'm {" "}
                </span>
                qarz
              </h6>
            </div>
            <div className="card-body">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="payment" style={{color:"black"}}>To'lov turi</label>
                  <select
                    className="form-control"
                    name="payment_type"
                    onChange={handleChange}
                  >
                    <option value="none"></option>
                    <option value="cash">Naqt pul</option>
                    <option value="credit_card">Plastik karta</option>
                    <option value="money_transfer">Pul o'tkazma</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="payment" style={{color:"black"}}>Pul miqdori</label>
                  <input
                    className="form-control"
                    type="number"
                    name="payment"
                    value={sellOrderPayment.payment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success"
                style={{ marginRight: "15px" }}
                onClick={() => paymentOrderActionLocal()}
              >
                To'lov qilish
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setWindowDisplay("none");
                }}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", overflow: "scroll" }}>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/R</td>
                  <td scope="col">Taminotchi nomi</td>
                  <td scope="col">Manzili</td>
                  <td scope="col">Masul shaxs</td>
                  <td scope="col">Telefon raqami1</td>
                  <td scope="col">Telefon raqami2</td>
                  <td scope="col">Bank kodi</td>
                  <td scope="col">Bank</td>
                  <td scope="col">Akkount nomeri</td>
                  <td scope="col">INN</td>
                  <td scope="col">Kategoriyasi</td>
                  <td scope="col">Maxsulot nomi</td>
                  <td scope="col">Maxsulot turi</td>
                  <td scope="col">Og'irligi</td>
                  <td scope="col">O'lchov birligi</td>
                  <td scope="col">Narxi</td>
                  <td scope="col">Qarz</td>
                  <td scope="col">Belgilangan muhlat</td>
                  <td scope="col">Sotib olingan vaqt</td>
                  <td scope="col">To'lov qilish</td>
                </tr>
              </thead>
              <tbody>
                {localSellOrders.map(
                  ({
                    id,
                    orderId,
                    price,
                    quantity,
                    deadline,
                    debt,
                    created_date,
                    product: { name: productName },
                    product: { unit },
                    product: { product_type },
                    product: {
                      category: { name: categoryName },
                    },
                    product: {
                      provider: { name: providerName },
                    },
                    product: {
                      provider: { address },
                    },
                    product: {
                      provider: { phone_number1 },
                    },
                    product: {
                      provider: { phone_number2 },
                    },
                    product: {
                      provider: { responsible_agent },
                    },
                    product: {
                      provider: { bank_code },
                    },
                    product: {
                      provider: { bank },
                    },
                    product: {
                      provider: { INN },
                    },
                    product: {
                      provider: { account_number },
                    },
                  }) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{orderId}</th>
                        <td>{providerName}</td>
                        <td>{address}</td>
                        <td>{responsible_agent}</td>
                        <td>
                          {phone_number1 ? phone_number1 : "Nomer kiritilmagan"}
                        </td>
                        <td>
                          {phone_number2 ? phone_number2 : "Nomer kiritilmagan"}
                        </td>
                        <td>{bank_code}</td>
                        <td>{bank}</td>
                        <td>{account_number}</td>
                        <td>{INN}</td>
                        <td>{categoryName}</td>
                        <td>{productName}</td>
                        <td>
                          {product_type === "unlimited" ? "Vip emas" : "Vip"}
                        </td>
                        <td>{quantity}</td>
                        <td>{unit}</td>
                        <td>{price}</td>
                        <td>
                          
                          <span className="debt">{debt}</span>
                        </td>
                        <td>
                          {deadline
                            ? deadline.slice(0, 10)
                            : "Muhlat belgilanmagan"}
                        </td>
                        <td>
                          {created_date.slice(0, 10)}
                          {created_date.slice(11, 16)}
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() =>
                              showOrderPaymentDiv(id, providerName, debt)
                            }
                          >
                            To'lov
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <>{renderTable()}</>;
};

export default SellOrders;
