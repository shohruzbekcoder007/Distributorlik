import axiosCommon from "../../../../../baseUrl";
import { useState, useEffect } from "react";
import Loading from "../../Loading";
import axios from "axios";
import ModalImage from "react-modal-image";

import { observer } from "mobx-react";
import { globalState } from "./../../../../../globalState";

const _NewClients = () => {
  const [newClients, setNewClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState("");
  const baseUrl = "http://159.65.233.187:8000";
  const [displayShow, setDisplayShow] = useState({
    deleteButton: "none",
  });

  const fetchNewClients = () => {
    setLoading(true);
    try {
      axiosCommon
        .get("/client/agent-client-report/", {
          params: {
            // term: term
            term: globalState.search,
          },
        })
        .then((response) => {
          let results = response.data.reports;
          for (let i = 0; i < results.length; i++) {
            results[i]["orderId"] = i + 1;
          }
          setNewClients(results);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deletePaymentData = async (id) => {
    await axiosCommon.delete(`client/agent-client-report-detail/${id}/`);
    setDisplayShow({
      deleteButton: "none",
    });
    alert("Malumot o'chirildi");
    fetchNewClients();
    renderTable();
  };

  const showDeleteButton = () => {
    setDisplayShow({
      deleteButton: "block",
    });
    renderTable();
  };

  useEffect(() => {
    fetchNewClients();
  }, [globalState.search]);

  function renderTable() {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <div>
          {/* <div
            style={{ padding: "0, 20px", color: "white", textAlign: "center" }}
          >
            <h3>
              Agentdan kelgan yangi klientlar ro'yxati
            </h3>
          </div> */}
          {/* <div className="row">
            <div style={{ width: "100%", overflow: "scroll" }}>
              <div className="sellPayment-table">
                */}
          <div style={{ padding: "0 20px" }}>
            <h3>Taminotchilar ro'yxati</h3>
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center  mb-0">
                <thead>
                  <tr>
                    <td scope="col">T/R</td>
                    <td scope="col">Agent Nomi</td>
                    <td scope="col">Klient Nomi</td>
                    <td scope="col">Manzili</td>
                    {/* <td scope="col">To'liq manzili </td> */}
                    <td scope="col">Masul Shaxs</td>
                    <td scope="col">Telefon raqami 1</td>
                    <td scope="col">Telefon raqami 2</td>
                    <td scope="col">Taxminiy pul aylanmasi</td>
                    <td scope="col">Rasmi</td>
                    <td scope="col">Kiritilgan vaqt</td>
                    <td scope="col">Jarayon</td>
                  </tr>
                </thead>
                <tbody>
                  {newClients.map(
                    ({
                      id,
                      name,
                      image,
                      address,
                      orderId,
                      latitude,
                      longitude,
                      created_date,
                      phone_number1,
                      phone_number2,
                      assumption_value,
                      responsible_person,
                      sale_agent: { last_name },
                      sale_agent: { first_name },
                    }) => {
                      // try {
                      //   axios
                      //     .get(
                      //       `https://geocode-maps.yandex.ru/1.x/?apikey=cba0604f-814b-4d44-9b9f-06e6ddc1926e&format=json&geocode=${longitude},${latitude}`
                      //     )
                      //     .then((response) => {
                      //       let fullAddress =
                      //         response.data.response.GeoObjectCollection
                      //           .featureMember[4].GeoObject.name +
                      //         " " +
                      //         response.data.response.GeoObjectCollection
                      //           .featureMember[3].GeoObject.name +
                      //         " " +
                      //         response.data.response.GeoObjectCollection
                      //           .featureMember[2].GeoObject.name +
                      //         " " +
                      //         response.data.response.GeoObjectCollection
                      //           .featureMember[0].GeoObject.name;
                      //       setFullAddress(fullAddress);
                      //     });
                      // } catch (error) {
                      //   console.log(error);
                      // }
                      return (
                        <>
                          <tr key={id}>
                            <th scope="row">{orderId}</th>
                            <td>{first_name + " " + last_name}</td>
                            <td>{name}</td>
                            <td>{address}</td>
                            {/* <td>{latitude, longitude}</td> */}
                            <td>{responsible_person}</td>
                            <td>
                              {phone_number1
                                ? phone_number1
                                : "Nomer kiritilmagan"}
                            </td>
                            <td>
                              {phone_number2
                                ? phone_number2
                                : "Nomer kiritilmagan"}
                            </td>
                            <td>{assumption_value}</td>
                            <td className="image-td">
                              <ModalImage
                                small={`${baseUrl + image}`}
                                large={`${baseUrl + image}`}
                                alt="Magazin rasmi"
                              />
                            </td>

                            <td>
                              {created_date.slice(0, 10) +
                                created_date.slice(11, 16)}
                            </td>
                            <td
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
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
        </div>
        //   </div>
        // </div>
      );
    }
  }

  return <>{renderTable()}</>;
};
// export default NewClients;
export default observer(_NewClients);
