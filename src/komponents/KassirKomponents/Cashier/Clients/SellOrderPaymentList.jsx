import { useEffect, useState } from "react";
import axios from "../../../../baseUrl";
import Loading from "../Loading/index";
import { observer } from "mobx-react";
import { globalState } from "./../../../../globalState";

const _SellOrderPayment = () => {
  const [loading, setLoading] = useState(true);
  const [paymentsList, setPaymentsList] = useState([]);
  const [displayShow, setDisplayShow] = useState({
    deleteButton: "none",
  });
  const [query, setQuery] = useState("");

  const handleSearchValue = (searchValue) => {
    setQuery(searchValue);
    let elements = paymentsList;
    let results = elements.filter(
      (element) =>
        element.sell_order.client.name
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1
    );
    setPaymentsList(results);
    renderTable();
  };

  const fetchPaymentList = async () => {
    setLoading(true);
    try {
      await axios
        .get("/order/sell-order-payment/", {
          params: {
            // term: term
            term: globalState.search,
          },
        })
        .then((response) => {
          let results = response.data.payments;
          for (let i = 0; i < results.length; i++) {
            results[i]["orderId"] = i + 1;
          }
          setLoading(false);
          setPaymentsList([]);
          setPaymentsList(results);
          renderTable();
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const showDeleteButton = () => {
    setDisplayShow({
      deleteButton: "block",
    });
    renderTable();
  };

  const showUndoButton = () => {
    setDisplayShow({
      deleteButton: "none",
    });
    renderTable();
  };

  const deletePaymentData = async (id) => {
    await axios.delete(`/order/sell-order-payment-detail/${id}/`);
    setDisplayShow({
      deleteButton: "none",
    });
    fetchPaymentList();
    renderTable();
  };

  useEffect(() => {
    fetchPaymentList();
  }, [globalState.search]);

  function renderTable() {
    if (loading || paymentsList.length === 0) {
      return (
        <main>
          <Loading />
        </main>
      );
    } else {
      return (
        <div>
          <div className="row" style={{ paddingLeft:"20px", color: "white" }}>
            <div style={{ textAlign: "center" }}>
              <h3>Pul to'lagan mijozlar ro'yxati</h3>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/R</td>
                  <td scope="col">Klient nomi</td>
                  <td scope="col">Manzil</td>
                  <td scope="col">Masul shaxs</td>
                  <td scope="col">Telefon raqami 1</td>
                  <td scope="col">Telefon raqami 2</td>
                  <td scope="col">Maxsulot nomi</td>
                  <td scope="col">Qarzi</td>
                  <td scope="col">To'lov turi</td>
                  <td scope="col">To'lov summasi</td>
                  <td scope="col">Berilgan muhlat</td>
                  <td scope="col">To'langan sana</td>
                  <td scope="col">To'langan vaqt</td>
                  <td scope="col">Jarayon</td>
                </tr>
              </thead>
              <tbody key={100}>
                {paymentsList.map(
                  ({
                    id,
                    orderId,
                    payment_type,
                    payment,
                    created_date,
                    sell_order: { debt },
                    sell_order: { deadline },
                    sell_order: {
                      client: { name: clientName },
                    },
                    sell_order: {
                      client: { address },
                    },
                    sell_order: {
                      client: { responsible_agent },
                    },
                    sell_order: {
                      client: { phone_number1 },
                    },
                    sell_order: {
                      client: { phone_number2 },
                    },
                    sell_order: {
                      product: { name: productName },
                    },
                  }) => {
                    if (payment_type === "credit_card")
                      payment_type = "Plastikdan to'lov";
                    if (payment_type === "cash") payment_type = "Naqt pul";
                    if (payment_type === "money_transfer")
                      payment_type = "Pul o'tkazma";

                    return (
                      <>
                        <tr key={id}>
                          <th scope="row">{orderId}</th>
                          <td>{clientName}</td>
                          <td>{address}</td>
                          <td>{responsible_agent}</td>
                          <td>{phone_number1}</td>
                          <td>{phone_number2}</td>
                          <td>{productName}</td>
                          <td>
                            <span className="debt">{debt}</span>
                          </td>
                          <td>{payment_type}</td>
                          <td>{payment}</td>
                          <td>
                            {deadline
                              ? deadline.slice(0, 10)
                              : "Muhlat belgilanmagan"}
                          </td>
                          <td>{created_date.slice(0, 10)}</td>
                          <td>{created_date.slice(11, 16)}</td>
                          <td style={{ display: "flex", flexDirection: "row" }}>
                            <p
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
                            </p>
                            <p
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
                                onClick={() => deletePaymentData(id)}
                              >
                                O'chirish
                              </button>
                            </p>
                            <p
                              style={{
                                fontSize: "20px",
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Qaytarish"
                              onClick={showUndoButton}
                            >
                              {" "}
                              <i className="fas fa-undo"></i>
                            </p>
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
  return <div>{renderTable()}</div>;
};

// export default SellOrderPayment
export default observer(_SellOrderPayment);
